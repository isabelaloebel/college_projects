var responseBody; // Variável que será salvo o retorno da API
var sm; // Variável que tratará a instância da mensagem SOAP

for (var loop = 0; loop < 10; loop++) {
    // Mapeia o tempo e cada execução do loop
    var startTime = Date.now();
    gs.info('VetorH - coleta: ' + loop + ' - Tempo inicial = ' + startTime);

    try {
        // Cria uma instância da mensagem SOAP
        sm = new sn_ws.SOAPMessageV2('isabela-teste-vetor', 'ObterInfos');
        sm.setEndpoint(
            'https://vetorhprd/g5-senior-services/cs_Syncbr_itaipu_contrato?wsdl'
        );

        // Define os parâmetros necessários
        // sm.setStringParameterNoEscape('nr_contrato', '4500072355'); //tem 209 registros
        // sm.setStringParameterNoEscape('qtd_registro', '10');
        sm.setStringParameterNoEscape('nr_matricula', '33732');

        // Define o Mid Server
        sm.setMIDServer('midserverint');

        // Executa a chamada SOAP
        var response = sm.execute();

        // Verifica se houve erro na resposta SOAP
        if (response && response.getStatusCode() === 200) {
            // Obtém o corpo da resposta
            responseBody = response.getBody();

            try {
                var xmlDoc = new XMLDocument2();
                xmlDoc.parseXML(responseBody);
                var rootNode = xmlDoc.getDocumentElement();

                // Remover o número no início da string
                var startIndex = rootNode.getTextContent().indexOf('{'); // Encontrar o início do primeiro objeto
                var jsonString = rootNode.getTextContent().slice(startIndex); // Extrair a parte da string a partir do primeiro objeto

                // Encontrar e corrigir a posição da vírgula na propriedade "nome_pessoa"
                var correctedString = jsonString.replace(
                    /("nome_pessoa":\s*")([^",]+),(\s*")/g,
                    '$1$2$3,'
                );

                // Ajustar a formatação de "Inicio" e "Fim" na string JSON
                correctedString = correctedString.replace(
                    /"Inicio "\s*:\s*\+([^,]+),/g,
                    '"Inicio": "+$1",'
                );
                correctedString = correctedString.replace(
                    /"Fim :"\s*:\s*\+([^,]+),/g,
                    '"Fim": "+$1",'
                );

                // Substituir a sequência "} {" por "},{"
                var objectsArray = correctedString.replace(/\} \{/g, '},{');

                // Dividir a string em objetos JSON individuais
                var jsonObjects = objectsArray.split('},{');

                // Tratar o primeiro e último objeto JSON
                if (jsonObjects.length > 0) {
                    jsonObjects[0] = jsonObjects[0].replace('{', '');
                    jsonObjects[jsonObjects.length - 1] = jsonObjects[
                        jsonObjects.length - 1
                    ].replace('}', '');
                }

                // Percorre o array para converter para objeto JSON
                var jsonArray = jsonObjects.map(function (objString) {
                    try {
                        return JSON.parse('{' + objString + '}');
                    } catch (error) {
                        gs.error(
                            'VetorH - Erro ao converter para JSON:' + error
                        );
                        return null;
                    }
                });

                // Inserir cada objeto JSON em uma nova linha da tabela
                var tableName = 'u_vetorh_temp';
                var table = new GlideRecord(tableName);

                jsonArray.forEach(function (jsonObject) {
                    if (jsonObject) {
                        // Inicializa um novo registro na tabela
                        table.initialize();

                        // Mapear propriedades do objeto JSON para os campos da tabela
                        table.setValue('u_inicio', jsonObject.Inicio);
                        table.setValue('u_fim', jsonObject.Fim);
                        table.setValue('u_cod_empresa', jsonObject.cod_empresa);
                        table.setValue(
                            'u_cod_empresa_pessoa',
                            jsonObject.cod_empresa_pessoa
                        );
                        table.setValue(
                            'u_nome_empresa',
                            jsonObject.nome_empresa
                        );
                        table.setValue('u_mat_pessoa', jsonObject.mat_pessoa);
                        table.setValue('u_nome_pessoa', jsonObject.nome_pessoa);
                        table.setValue(
                            'u_num_rg_pessoa',
                            jsonObject.num_rg_pessoa
                        );
                        table.setValue('u_nr_contrato', jsonObject.nr_contrato);
                        table.setValue('u_sequencia', jsonObject.sequencia);
                        table.setValue('u_loop', loop);

                        if (jsonObject.fim_cont_emp != '00/00/0000') {
                            // Divide a string data em partes (dia, mês, ano)
                            var partesData = jsonObject.fim_cont_emp.split('/');

                            // Formato MM/DD/YYYY
                            var dataFormatada =
                                partesData[1] +
                                '/' +
                                partesData[0] +
                                '/' +
                                partesData[2];

                            // Cria nova novo objeto Date com a data original formatada
                            var dateObject = new Date(dataFormatada);

                            // Converte e obtém a data
                            var formattedDate = dateObject
                                .toISOString()
                                .slice(0, 10);

                            table.setValue('u_fim_cont_emp', formattedDate);
                        } else {
                            gs.info(
                                'VetorH - dado com data 00/00/0000: ' +
                                    jsonObject.sequencia
                            );
                        }

                        // Insere o novo registro na tabela
                        table.insert();
                    }
                });
            } catch (ex) {
                gs.error('VetorH - Erro ao processar resposta XML: ' + ex);
            }
        } else {
            gs.error(
                'VetorH - Erro na chamada SOAP. Status: ' +
                    response.getStatusCode()
            );
        }
    } catch (ex) {
        gs.error('VetorH - Erro ao executar chamada SOAP: ' + ex);
    }

    // Registrar o tempo de término
    var endTime = Date.now();
    gs.info('VetorH - coleta: ' + loop + ' - Tempo final : ' + endTime);

    // Calcula o tempo decorrido
    var elapsedTime = endTime - startTime;
    gs.info(
        'VetorH - coleta: ' +
            loop +
            ' - Tempo total de execução: ' +
            elapsedTime +
            ' ms'
    );
}
