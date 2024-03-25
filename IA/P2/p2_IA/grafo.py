from math import isqrt
import networkx as nx
import matplotlib.pyplot as plt

class Edge:
    def __init__(self, id, source, dest, length):
        self.id = id
        self.source = source
        self.dest = dest
        self.length = length

    def __repr__(self):
        return f"- Id: {self.id}, Caminho: {self.source} -> {self.dest}, Custo: {self.length}"
    
class Vertex:
    def __init__(self, id):
        self.id = id
        self.edges = []
    
    def set_edges(self, edges):
        """
        Atribui as arestas ao nó.
        @Params:
            - edges: Lista com o id das arestas.    \n
        @Return: void
        """
        for edge in edges:
            self.edges.append(edge)

    def __repr__(self):
        aux = ", ".join(str(i) for i in self.edges)
        return f"({self.id}, [{aux}])"

class Graph:
        
    def __init__(self, directed):
        self.vertex = {}
        self.edges = {}
        self.heuristic = {}
        self.directed = directed
         
            
    def add_vertex(self, id):
        """
        Instância e adiciona um nó ao grafo.
        @Params:
            - id: Id do nó.     \n
        @Return: void
        """
        if id not in self.vertex:
            self.vertex[id] = Vertex(id)
    
    
    def add_edge(self, source, dest, length):
        """
        Instância e adiciona as arestas e nós ao grafo, criando a ligação entre eles.
        @Params:
            - source: Id do nó de origem.
            - dest: Id do nó de destino.
            - length: Valor que será atribuido ao peso da aresta.   \n
        @Return: void.
        """
        self.add_vertex(source)
        self.add_vertex(dest)
        if id not in self.edges:
            curr_size = len(self.edges)
            self.edges[curr_size] = Edge(curr_size, source, dest, length)
            self.vertex[source].set_edges([curr_size])
            if self.directed == False:
                curr_size = len(self.edges)
                self.edges[curr_size] = Edge(curr_size, dest, source, length)
                self.vertex[dest].set_edges([curr_size])
                
    
    def add_heuristic(self, source, dest, value):
        """
        Atribui o valor à heuristica entre dois nós.
        @Params:
            - source: Id do nó de origem.
            - dest: Id do nó de destino.            \n
        @Return: void
        """
        self.heuristic[(source, dest)] = value


    def calculate_heuristic(self, source, dest):
        """
        Retorna a heuristica entre dois nós
        @Params:
            - source: Id do nó de origem.
            - dest: Id do nó de destino.            \n
        @Return:
            - Retorna o valor atribuido a heurística entre os dois nós.
        """
        return self.heuristic.get((source, dest), 0)
    
    
    def plotGraph(self, algorithm_edges, output_filename):
        """
        Desenha o grafo carregado na memória com as arestas retornadas de um algoritmo pintadas em vermelho
        @Params:
            - algorithm_edges: Lista contendo os Id das arestas à serem pintadas de vermelho.
            - output_filename: Nome do arquivo de output contendo extensão.                     \n
        @Return: void. 
        """
        
        # Inicialização do objeto de grafo a ser desenhado
        G = nx.Graph()

        # Adicionando nós ao grafo
        nodes = [self.vertex[node].id for node in self.vertex]
        G.add_nodes_from(nodes)

        # Adicionando as arestas que não são output de um algoritmo ao grafo
        for edge in self.edges:
            if edge not in algorithm_edges:
                G.add_edge(self.edges[edge].source, self.edges[edge].dest, color='black', weight= self.edges[edge].length)
        
        # Adiciona as arestas que são output de um algoritmo ao grafo
        for edge in algorithm_edges:
            G.add_edge(self.edges[edge].source, self.edges[edge].dest, color='r', weight= self.edges[edge].length)
        
        # Define o tamanho da figura
        fig = plt.figure(figsize=(isqrt(len(nodes))*3.5, isqrt(len(nodes))*3.5)) 
    
        
        edges = G.edges()
        # Posicionamento dos nós
        pos = nx.kamada_kawai_layout(G)
        # Coleta a propriedade de cor das arestas
        colors = [G[u][v]['color'] for u,v in edges]
        # Desenha o grafo
        nx.draw(G, pos, with_labels=True, node_size=100, node_color="skyblue", font_size=10, edge_color=colors)
        # Coleta a propriedade de pesos das arestas
        labels = nx.get_edge_attributes(G,'weight')
        # Desenha os labels das arestas
        nx.draw_networkx_edge_labels(G,pos,edge_labels=labels, font_size=12)

        # Salva a figura
        fig.savefig(output_filename)
        # Plota o grafo
        plt.show() 
    
    
    def __repr__(self):
        return f"{self.edges}\n{self.vertex}"
