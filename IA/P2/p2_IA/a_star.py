import heapq

class AStar:
    
    def reconstruct_path(self, cameFrom, current, start):
        """
        Função auxiliar para reconstruir o caminho percorrido a partir do nó de destino até o nó inicial
        @Params:
            - cameFrom: List[Tuple(node_id, edge_id)] que compõem o caminho percorrido.
                - node_id: Id dos nós percorridos.
                - edge_id: Id das arestas percorridas.
            - current: Id do ultimo nó visitado.
            - start: Id do nó inicial da execução do algoritmo A*       \n
        @Return:
            - Tuple(total_path_vertex, total_path_edge)
                - total_path_vertex: Lista com o Id dos nós percorridos em ordem de execução.
                - total_path_edge: Lista com o Id das arestas percorridas em ordem de execução.
        """
        total_path_vertex = [current]
        total_path_edge = []
        while current in cameFrom:
            current, edge = cameFrom[current]
            total_path_vertex.insert(0, current)
            total_path_edge.insert(0, edge)
            if current == start:
                break
        return total_path_vertex, total_path_edge


    def a_star_search(self, graph, start, goal):
        """Executa o algoritmo de busca A*
        @Params:
            - graph: Estrutura de grafo.
            - start: Id do nó inicial.
            - goal: Id do nó alvo.          \n
        @Return:
            - Tuple(path, edges, visiteds)
                - path: Id de todos os nós que compõem o menor caminho.
                - edges: Id de todas as arestas que compõem o menor caminho.      
                - visiteds: Número de nós percorridos.
            - Retorna None caso não encontre caminho para o nó alvo.        \n
        """

        def h(node):
            """Retorna a heuristica do nó para o nó alvo.
            @Params:
                - node: Id do nó que se deseja obter a heurística.      \n
            @Return:
                - Inteiro que representa a estimativa de custo do nó para o nó alvo.   
                - Caso não exista heurística salva para o nó, retorna 0.        \n
            """
            return graph.calculate_heuristic(node, goal)

        # Lista para manter a fila de prioridade
        openSet = []  
        heapq.heappush(openSet, (0, start))
        # Dicionário para armazenar o caminho reconstruído
        cameFrom = {}
        # Dicionário para armazenar o custo real do caminho até cada nó
        gScore = {start: 0}
        iteration = 0
        visited = set()

        while openSet:
            iteration += 1
            print(f"\nIteração #{iteration}")

            # Obtendo o nó atual da fila de prioridade
            _, current = heapq.heappop(openSet)
            visited.add(current)
            
            print("Nó atual:", current)
            print('Custo atual:', gScore[current])
            print(f'h: {h(current)}')
            print(f'Número de nós explorados: {len(visited)}')

            if current == goal:
                print()
                # Chegou ao nó alvo, reconstrói o caminho percorrido
                path, edges = self.reconstruct_path(cameFrom, current, start)
                print("Destino encontrado! Custo total:", gScore[current])
                return path, edges, len(visited)
            
            print("Caminhos possíveis:")
            # Itera sobre todas as arestas conectadas ao nó atual para encontrar os vizinhos.
            for neighborPath in graph.vertex[current].edges:
                edge = graph.edges[neighborPath]
                
                nextVert = edge.dest
                
                # Calcula o custo para chegar ao vizinho através do nó atual. 
                tentative_gScore = gScore[current] + edge.length
                try:
                    if edge.dest != cameFrom.get(current)[0] and edge.dest not in visited:
                        print(edge)
                        print(f'\t- Custo acumulado previsto = {tentative_gScore}')
                except TypeError:
                    pass
                
                # Verifica se o vizinho ainda não foi visitado ou se o custo tentativo 
                # é menor do que o custo atualmente armazenado para o vizinho.
                if nextVert not in gScore or tentative_gScore < gScore[nextVert]:
                    # Atualiza o registro do caminho percorrido até o vizinho, indicando que 
                    # o nó atual é o pai do vizinho e qual aresta foi usada para alcançá-lo.
                    cameFrom[nextVert] = (current, neighborPath)
                    # Atualiza o custo real do caminho até o vizinho com o custo tentativo calculado.
                    gScore[nextVert] = tentative_gScore
                    # Atualiza o custo estimado total do caminho para o próximo nó.
                    fScore = tentative_gScore + h(nextVert)
                    print(f'\t- fScore: {fScore}')
                    # Adiciona o vizinho à fila de prioridade openSet com uma prioridade baseada no custo estimado.
                    heapq.heappush(openSet, (fScore, nextVert))

        return None, None, None