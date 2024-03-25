class DFS:
    
    def dfs_search(self, graph, start, goal):
        """
        Executa o algoritmo de busca DFS
        @Params:
            - graph: Estrutura de grafo.
            - start: Id do nó inicial.
            - goal: Id do nó alvo.          \n
        @Return:
            - Tuple(cost, node_path, edge_path, visiteds)
                - cost: Custo acumulado para achar a solução.
                - node_path: Lista com o Id dos nós percorridos.
                - edge_path: Lista com o Id das arestas percorridas.
                - visiteds: Número de nós percorridos. 
            - Retorna None caso não encontre caminho para o nó alvo.
        """
        visited = set()
        edge_path = []
        node_path = [start]
        # Lista para manter o estado, a aresta anterior e o custo acumulado
        s = [(start, None, 0)]
        iteration = 0
        
        while s:
            
            iteration+=1
            # Desempilha o nó, a aresta percorrida e o custo acumulado
            current, prev_edge, cost = s.pop()
            print(f"Iteração #{iteration}")
            print(f"Nó atual: {current}")
            print(f"Custo atual: {cost}")
            print(f'Número de nós explorados: {len(visited)}\n')
            
            # Verifica se o nó atual já foi visitado
            if current in visited:
                continue
            
            # Marca o nó como visitado
            visited.add(current)
            
            # Adiciona a aresta percorrida à lista de arestas
            if prev_edge:
                node_path.append(current)
                edge_path.append(prev_edge.id)
            
            # Se for o nó objetivo, retorna o custo e o caminho percorrido
            if current == goal:
                return cost, node_path , edge_path, len(visited)
            
            
            # Explora os nós vizinhos
            for edge_id in graph.vertex[current].edges:
                edge = graph.edges[edge_id]
                # Verifica se o próximo nó já foi visitado
                if edge.dest not in visited:
                    # Atualiza a pilha com o próximo nó, a aresta e o custo acumulado
                    s.append((edge.dest, edge, cost + edge.length))
            
        return None, None, None, None