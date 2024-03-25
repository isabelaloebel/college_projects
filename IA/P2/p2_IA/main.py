import os
from grafo import Graph
from dfs import DFS
from a_star import AStar
from dijkstra import Dijkstra
from bfs import BFS

# Autores: Nickolas Crema e Isabela Pimentel Loebel

def read_file(filepath, directed):
    """
    Lê os dados do arquivo texto e carrega todos os dados.
    @Params:
        - filepath: Caminho do arquivo texto com a extensão.
        - directed: Booleano que indica se o grafo é orientado ou não.  \n
    @Return:
        - Tuple(ponto_inicial, ponto_final, graph)
            - ponto_inicial: Nó inicial da execução do algoritmo.
            - ponto_final: Nó alvo da execução do algoritmo.
            - graph: Estrutura de grafo carregada.
    """
    import re
    
    with open(filepath) as f:
        archive_data = f.read()
        
    archive_lines = archive_data.split('\n')
    splited_lines = [re.split("[( ,).]", line) for line in archive_lines]
    
    graph = Graph(directed=directed)
    
    ponto_inicial = ''
    ponto_final = ''
    
    for line in splited_lines:
        if line[0] == 'ponto_inicial':
            ponto_inicial = line[1]
        elif line[0] == 'ponto_final':
            ponto_final = line[1]
        elif line[0] == 'pode_ir':
            graph.add_edge(line[1], line[2], int(line[3]))
        elif line[0] == 'h':
            graph.add_heuristic(line[1], line[2], int(line[3]))
            
    return ponto_inicial, ponto_final, graph
    

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def menu_call_read_file():
    """Executa a chamada da leitura de arquivo"""
    clear_screen()
    directed = input('O grafo é orientado? (Y/N)')
    
    if directed == 'Y' or directed == 'y':
        directed = True
    elif directed == 'N' or directed == 'n':
        directed = False
    else:
        input('Opção inválida, pressione ENTER para continuar.')
        return
    
    clear_screen()
    file_path = input('Insira o caminho do arquivo com a extensão:')
    clear_screen()
    ponto_inicial, ponto_final, graph = read_file(file_path, directed)
    input('Grafo lido com sucesso! Pressione ENTER para continuar.')
    return ponto_inicial, ponto_final, graph
    
    
def menu_call_a_star(graph, start, goal):
    """Executa a chamada do algoritmo A*"""
    clear_screen()
    
    if graph is None or start == '' or goal == '':
        input("ERRO - Grafo não foi carregado. Pressione ENTER para continuar.")
        return
    
    a_star = AStar()
    path, edges, n_nodes = a_star.a_star_search(graph, start, goal)
    if path is not None and edges is not None:
        print(f"Menor caminho encontrado: [{' -> '.join(path)}]")
        print(f'Tamanho do caminho encontrado: {len(path)}')
        print(f'Número de nós percorridos: {n_nodes}\n')
        draw_graph = input("Deseja desenhar o grafo? (Y/N)")
        if draw_graph == 'Y' or draw_graph == 'y':
            filename = input('Escreva o caminho do arquivo com extensão:')
            graph.plotGraph(edges, filename)
            input("Fim da execução. Pressione ENTER para continuar.")
        else:
            input("Fim da execução. Pressione ENTER para continuar.")
    else:
        print("Não foi encontrado um caminho entre os dois nós!")
        input("Pressione ENTER para continuar.")


def menu_call_dijkstra(graph, start, goal):
    """Executa a chamada do algoritmo de Dijkstra."""
    clear_screen()

    if graph is None or start == '' or goal == '':
        input("ERRO - Grafo não foi carregado. Pressione ENTER para continuar.")
        return
    
    dijkstra = Dijkstra()
    cost, path, edges, n_nodes = dijkstra.dijkstra(graph, start, goal)
    if cost is not None and path is not None and edges is not None:
        print("\nDestino encontrado! Custo total:", cost)
        print(f"Menor caminho encontrado: [{' -> '.join(path)}]")
        print(f'Tamanho do caminho encontrado: {len(path)}')
        print(f'Número de nós percorridos: {n_nodes}\n')

        draw_graph = input("Deseja desenhar o grafo? (Y/N)]")
        if draw_graph == 'Y' or draw_graph == 'y':
            filename = input('Escreva o caminho do arquivo com extensão:')
            graph.plotGraph(edges, filename)
            input("Fim da execução. Pressione ENTER para continuar.")
        else:
            input("Fim da execução. Pressione ENTER para continuar.")
    else:
        print("Não foi encontrado um caminho entre os dois nós!")
        input("Pressione ENTER para continuar.")
    

def menu_call_dfs(graph, start, goal):
    """Executa a chamada do algoritmo DFS."""
    clear_screen()

    if graph is None or start == '' or goal == '':
        input("ERRO - Grafo não foi carregado. Pressione ENTER para continuar.")
        return
    
    dfs = DFS()
    cost, path, edges, n_nodes = dfs.dfs_search(graph, start, goal)
    if cost is not None and path is not None and edges is not None:
        print("Destino encontrado! Custo total:", cost)
        print(f"Caminho encontrado: [{' -> '.join(path)}]")
        print(f'Tamanho do caminho encontrado: {len(path)}')
        print(f'Número de nós percorridos: {n_nodes}\n')
        
        draw_graph = input("Deseja desenhar o grafo? (Y/N)")
        if draw_graph == 'Y' or draw_graph == 'y':
            filename = input('Escreva o caminho do arquivo com extensão:')
            graph.plotGraph(edges, filename)
            input("Fim da execução. Pressione ENTER para continuar.")
        else:
            input("Fim da execução. Pressione ENTER para continuar.")
    else:
        print("Não foi encontrado um caminho entre os dois nós!")
        input("Pressione ENTER para continuar.")
    
    
def menu_call_bfs(graph, start, goal):
    """Executa a chamada do algoritmo BFS."""
    clear_screen()
    
    if graph is None or start == '' or goal == '':
        input("ERRO - Grafo não foi carregado. Pressione ENTER para continuar.")
        return
    bfs = BFS()
    cost, path, edges, n_nodes = bfs.bfs_search(graph, start, goal)
    if cost is not None and path is not None and edges is not None:
        print("\nDestino encontrado! Custo total:", sum(cost))
        print(f"Caminho encontrado: [{' -> '.join(path)}]")
        print(f'Tamanho do caminho encontrado: {len(path)}')
        print(f'Número de nós percorridos: {n_nodes}\n')
        draw_graph = input("Deseja desenhar o grafo? (Y/N)")
        if draw_graph == 'Y' or draw_graph == 'y':
            filename = input('Escreva o caminho do arquivo com extensão:')
            graph.plotGraph(edges, filename)
            input("Fim da execução. Pressione ENTER para continuar.")
        else:
            input("Fim da execução. Pressione ENTER para continuar.")
    else:
        print("Não foi encontrado um caminho entre os dois nós!")
        input("Pressione ENTER para continuar.")
    

def menu():
    """Main menu do programa"""
    graph = None
    start = ''
    goal = ''
    
    while True:
        clear_screen()
        print("\nMenu:")
        print("1. Carregar grafo")
        print("2. Algoritmo A-Estrela\t -- \tMelhor solução")
        print("3. Algoritmo Dijkstra\t -- \tSegunda melhor solução")
        print("4. Algoritmo DFS\t -- \tPior solução")
        print("5. Algoritmo BFS\t -- \tSegunda pior solução")
        print("6. Sair")

        escolha = input("Escolha uma opção: ")

        if escolha == "1":
            start, goal, graph = menu_call_read_file()
        elif escolha == "2":
            menu_call_a_star(graph, start, goal)
        elif escolha == "3":
            menu_call_dijkstra(graph, start, goal)
        elif escolha == "4":
            menu_call_dfs(graph, start, goal)
        elif escolha == "5":
            menu_call_bfs(graph, start, goal)
        elif escolha == "6":
            clear_screen()
            print("Saindo do programa...")
            break
        else:
            input("Opção inválida. Pressione ENTER para continuar.")

def main():
    menu()

if __name__ == "__main__":
    main()
