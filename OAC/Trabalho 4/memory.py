class Memory:
    """ Classe para representar a memória de dados."""
    
    def __init__(self):
        """ Construtor da classe. \n
            Inicia a memória com 30 espaços, todos contendo 0 de valor. """
        self.memory = [0] * 30
    
    def read_word(self, address):
        """ Leitura da memória. 
            @Adress → Posição da memória que será buscado o valor.
        """
        if address < 0 or address >= len(self.memory):
            raise ValueError("Endereço de memória inválido.")
        return self.memory[address]
    
    def write_word(self, address, value):
        """ Escrita na memória. 
            @Adress → Posição da memória que será escrito o valor.
            @Value → Valor a ser escrito.
        """
        if address < 0 or address >= len(self.memory):
            raise ValueError("Endereço de memória inválido.")
        self.memory[address] = value
