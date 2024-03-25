from collections import deque

class BFS:


    def bfs_search(self, graph, start, goal):
        """
        Executa o algoritmo BFS para encontrar o caminho mais curto em número de arestas
        @Params:
            - graph: Estrutura de grafo.
            - start: Id do nó inicial.
            - goal: Id do nó alvo.     \n
        @Return:
            - Tuple(cost, nodes_path, edges_path, visiteds)
                - cost: Custo acumulado das arestas no menor caminho.
                - nodes_path: Lista com Id dos nós percorridos no menor caminho.
                - edges_path: Lista com o Id das arestas percorridas no menor caminho.
                - visiteds: Número de nós visitados.
        """
        if start == goal:
            return 0, 0, 0, 0

        visited = set()
        visited.add(start)
        # Inicia a fila de execução
        queue = deque([(start, [start], [], [])])
        count_visited = 0
        iteration = 0
        while queue:
            iteration+=1
            node, nodes_path, edges_path, cost = queue.popleft()
            if node == goal:
                return cost, nodes_path, edges_path, len(visited)
            count_visited+=1
            print(f'\nIteração #{iteration}')
            print(f'Nó atual: {node}')
            print(f'Custo acumulado: {sum(cost)}')
            print(f'Número de nós explorados: {count_visited}')
            print('Caminhos possíveis:')
            # Itera sobre os nós vizinhos do nó atual
            for edge in graph.vertex[node].edges:
                # Exibe os caminhos possíveis
                if graph.edges[edge].dest not in visited or graph.edges[edge].source not in visited:
                    print(graph.edges[edge])
                    
                # Se vizinho não estiver no set de nós já visitados é inserido na fila
                neighbor = graph.edges[edge].dest
                if neighbor not in visited:
                    visited.add(neighbor)
                    new_cost = cost + [graph.edges[edge].length]
                    new_nodes_path = nodes_path + [neighbor]
                    new_edges = edges_path + [edge]
                    queue.append((neighbor, new_nodes_path, new_edges, new_cost))

        return None, None, None, None, None