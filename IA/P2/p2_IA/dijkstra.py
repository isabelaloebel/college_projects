import heapq
class Dijkstra:

    def dijkstra(self, graph, start, goal):
        """
        Executa o algoritmo de busca A*
        @Params:
            - graph: Estrutura de grafo.
            - start: Id do nó inicial.
            - goal: Id do nó alvo.          \n
        @Return:
            - Tuple(distances, path, edges, visiteds)
                - distances: Custo acumulado do menor caminho encontrado.
                - nodes: Id de todos os nós que compõem o menor caminho.
                - path: Id de todas as arestas que compõem o menor caminho.    
                - visiteds: Número de nós visitados para encontrar a solução
            - Retorna None caso não encontre caminho para o nó alvo.        \n
        """
        
        # Inicializa os custos de todos os vértices como infinito.
        distances = {vertex: float('infinity') for vertex in graph.vertex}
        distances[start] = 0
        
        # Lista para manter a fila de prioridade
        openSet = []  
        heapq.heappush(openSet, (0, start))
        # Dicionário para armazenar o caminho percorrido até cada vértice
        path = {vertex: [] for vertex in graph.vertex}
        nodes = {vertex: [] for vertex in graph.vertex}
        
        iteration = 0
        visited = set()
        # visited.add(start)
        
        while openSet:
            iteration += 1
            # Retira o vértice com menor custo da fila de prioridade
            current_distance, current_vertex = heapq.heappop(openSet)
            # Obtém os vértices vizinhos do vértice atual para impressão
            possible_nodes = [graph.edges[edge_id] for edge_id in graph.vertex[current_vertex].edges]
            print(f"\nIteração #{iteration}")
            print(f"Nó atual: {current_vertex}")
            print(f"Custo total percorrido: {current_distance}")
            print(f'Número de nós explorados: {len(visited)}')
            print(f"Caminhos possíveis:")
            [print(caminho) for caminho in possible_nodes]
            
            if current_vertex not in visited:
                visited.add(current_vertex)
            # Se o custo atual para chegar ao nó atual for maior do que o custo armazenado
                if current_distance > distances[current_vertex]:
                    continue
                
                # Encontrou o nó alvo
                if current_vertex == goal:
                    return distances[goal], nodes[goal] + [goal], path[goal], len(visited)

                # Itera sobre as arestas conectadas ao nó atual
                for edge_id in graph.vertex[current_vertex].edges:
                    edge = graph.edges[edge_id]
                    neighbor = edge.dest
                    distance = current_distance + edge.length
                    # Se a nova distância até o vizinho for menor do que a distância atual
                    if distance < distances[neighbor]: #and neighbor not in visited:
                        # visited.add(neighbor)
                        distances[neighbor] = distance
                        path[neighbor] = path[current_vertex] + [edge_id]
                        nodes[neighbor] += nodes[current_vertex] + [current_vertex]
                        heapq.heappush(openSet, (distance, neighbor))

        return None, None, None, None