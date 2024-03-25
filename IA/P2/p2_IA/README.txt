README
Este é um programa para executar algoritmos de busca em grafos. Ele oferece uma interface de menu simples para carregar um grafo a partir de um arquivo de texto e executar diferentes algoritmos de busca nele. Os algoritmos implementados incluem A-Estrela, Dijkstra, DFS (Depth First Search) e BFS (Breadth First Search).

Problema Proposto
O problema proposto para o trabalho tem como objetivo geral levantar uma melhor e uma pior solução para encontrar o caminho mais curto de um ponto A até um ponto B.

Soluções Propostas
Algoritmo A*          - Melhor solução
Algoritmo de Dijkstra - Segunda melhor solução
Algoritmo DFS         - Pior solução
Algoritmo BFS         - Segunda pior solução

Definido como "segunda melhor solução" o segundo lugar para melhor solução, ou seja, não tão boa quanto a melhor solução proposta. E "segunda pior solução" o segundo lugar para pior solução, ou seja, não tão danoso quanto a pior solução proposta.

Pré-requisitos
Certifique-se de possuir Python instalado em sua máquina. O programa foi desenvolvido e testado no Python 3.
Certifique-se de possuir todos os módulos necessários para execução instalados, vide arquivo "requirements.txt", ou simplesmente a partir da execução do comando "pip install -r requirements.txt" via terminal.

Instalação
Certifique-se de ter os arquivos "grafo.py", "dfs.py", "a_star.py", "dijkstra.py" e "bfs.py" no mesmo diretório que o arquivo principal "main.py".
Execute o programa através do terminal com o comando "python main.py".

Utilização
Ao executar o programa, você será apresentado com um menu de opções:
    *Carregar grafo: Permite carregar um grafo a partir de um arquivo de texto.
    *Algoritmo A-Estrela: Executa o algoritmo A-Estrela para encontrar o melhor caminho entre dois nós do grafo.
    *Algoritmo Dijkstra: Executa o algoritmo de Dijkstra para encontrar o segundo melhor caminho entre dois nós do grafo.
    *Algoritmo DFS: Executa o algoritmo de DFS para encontrar um caminho entre dois nós do grafo.
    *Algoritmo BFS: Executa o algoritmo de BFS para encontrar um caminho entre dois nós do grafo.
    *Sair: Encerra o programa.

Ao selecionar a opção para carregar o grafo, você será solicitado a inserir o caminho do arquivo de texto que contém a definição do grafo. Você também será solicitado a indicar se o grafo é orientado ou não.

Após carregar o grafo, você pode escolher qualquer um dos algoritmos de busca disponíveis para encontrar caminhos entre os nós do grafo.

Ao selecionar algum dos algoritmos, o programa executará o mesmo e imprimirá no terminal os outputs referente a cada etapa da execução do algoritmo, e solicitará se você deseja desenhar o grafo resultante ou não.

O desenho do grafo resultante consiste em uma representação gráfica do grafo lido, em conjunto com as arestas percorridas pelo algoritmo, que estarão identificadas na cor vermelha. Caso seja solicitado o desenho do grafo o programa irá requisitar um caminho para que seja salvo o arquivo, caso deseje salvar no mesmo diretório do programa principal, basta adicionar o nome do arquivo desejado com sua extensão (preferencialmente .svg).

Após gerar o desenho do grafo, o programa irá salvar o arquivo no diretório escolhido e irá abrir uma cópia da representação gráfica construída.