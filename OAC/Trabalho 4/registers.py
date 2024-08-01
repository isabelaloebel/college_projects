class Registers:
    """ Classe para representar o banco de registradores."""

    def __init__(self):
        """ Construtor da classe. \n
            Inicia o banco de registradores com 32 espaços, todos contendo 0 de valor. """
        self.registers = [0] * 32
    
    def read(self, reg_num):
        """ Leitura de registrador. 
            @Reg_num → Posição do registrador que será buscado o valor.
        """
        return self.registers[reg_num]
    
    def write(self, reg_num, data):
        """ Escrita em registrador. 
            @Reg_num → Posição do registrador que será escrito o valor.
            @Data → Valor a ser escrito.
        """
        if reg_num != 0:
            self.registers[reg_num] = data
