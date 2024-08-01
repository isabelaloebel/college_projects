class WBStage:
    """ Classe para representar o estágio WB."""

    def __init__(self, registers):
        """ Construtor da classe. \n
            Instancia o estágio com banco de registradores."""
        self.registers = registers

    def process(self, mem_wb):
        """ Execução do estágio. Atualizações no banco de registradores se necessário. \n
            • Input: Objeto contendo PC, a instrução decodificada e o resultado da operação realizada ou dado lido da memória.
            • Output: Nenhum.
        """
        if not mem_wb:
            return
        
        opcode = mem_wb["opcode"]
        rd = mem_wb.get("rd")
        rs2 = mem_wb.get("rs2")
        rs1 = mem_wb.get("rs1")
        imm = mem_wb.get("imm")
        pc = mem_wb["pc"]
        rd = mem_wb["rd"]
        WB_register = mem_wb["WB_register"]


        if opcode == "lw":
            data = mem_wb.get("data")
            print(f"WB: {opcode} x{rd},{imm}(x{rs1})")
            self.registers.write(rd, data)
            print(f"obs: Escrevendo dado da memória {data} no registrador x{rd}")

        elif opcode in ["addi", "add", "sub", "and", "or", "sw"]:
            if(opcode == "addi"): 
                print(f"WB: {opcode} x{rd},x{rs1},{imm}")
                result = mem_wb["result"]
                self.registers.write(rd, result)
                print(f"obs: Escrevendo o resultado {result} no registrador x{rd}.")

            elif(opcode == "sw"): 
                print(f"WB: {opcode} x{rs2},{imm}(x{rs1})")
                print(f"obs: Operação {opcode} não tem ação neste estágio.")

            else: 
                print(f"WB: {opcode} x{rd},x{rs1},x{rs2}")
                result = mem_wb["result"]
                self.registers.write(rd, result)
                print(f"obs: Escrevendo o resultado {result} no registrador x{rd}.")

           
        print("WB: Operação finalizada.\n")