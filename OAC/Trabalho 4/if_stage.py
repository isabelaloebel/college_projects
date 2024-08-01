class IFStage:
    """ Classe para representar o estágio IF."""

    def __init__(self, program):
        """ Construtor da classe. \n
            Instancia o estágio com a instrução. Inicia o PC."""
        self.program = program
        self.pc = 0
    
    def process(self):
        """ Execução do estágio. \n
            • Input: Nenhum.
            • Output: Objeto contendo PC e a linha de instrução.
        """
        if self.pc < len(self.program):
            instruction = self.program[self.pc]
            print(f"IF: {instruction}")
            current_pc = self.pc
            self.pc += 1
            print(f"obs: Carregando instrução.\n")

            return {"pc": current_pc, "instruction": instruction}
        else:
            return {"pc": self.pc, "instruction": None}
