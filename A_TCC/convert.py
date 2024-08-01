import json
import csv

# Função para ler dados JSON de um arquivo
def read_json_file(json_file):
    with open(json_file, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data

# Função para extrair os dados desejados e escrever em um arquivo CSV
def convert_json_to_csv(input_file, output_file):
    # Ler dados JSON do arquivo
    data = read_json_file(input_file)

    # Extrair os campos desejados para cada objeto JSON
    rows = []
    for item in data:
        row = {
            'Sequencia': item['sequencia'],
            'Inicio': item['Inicio'],
            'Fim': item['Fim'],
            'Cod_empresa': item['cod_empresa'],
            'Nome_empresa': item['nome_empresa'],
            'Mat_pessoa': item['mat_pessoa'],
            'Nome_pessoa': item['nome_pessoa'],
            'Cod_empresa_pessoa': item['cod_empresa_pessoa'],
            'Num_rg_pessoa': item['num_rg_pessoa'],
            'Fim_cont_emp': item['fim_cont_emp'],
            'Nr_contrato': item['nr_contrato']
        }
        rows.append(row)

    # Escrever dados em um arquivo CSV
    fieldnames = ['Sequencia', 'Inicio', 'Fim', 'Cod_empresa', 'Nome_empresa', 
                  'Mat_pessoa', 'Nome_pessoa', 'Cod_empresa_pessoa', 'Num_rg_pessoa', 
                  'Fim_cont_emp', 'Nr_contrato']

    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f'Dados convertidos para CSV: {output_file}')

# Exemplo de uso
input_json_file = 'all-output.json'
output_csv_file = 'all-output.csv'

convert_json_to_csv(input_json_file, output_csv_file)
