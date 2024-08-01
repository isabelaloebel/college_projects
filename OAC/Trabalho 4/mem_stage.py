class MEMStage:
    """ Classe para representar o estágio MEM."""
    def __init__(self, memory):
        """ Construtor da classe. \n
            Instancia o estágio com a memória de dados."""
        self.memory = memory

    def process(self, ex_mem):
        """ Execução do estágio. Atualizações na memória se necessário ou leitura na mesma. \n
            • Input: Objeto contendo PC, a instrução decodificada e o resultado da operação realizada.
            • Output:\n
                se "lw"→ Objeto contendo PC, instrução decodificada e dado lido da memória.
                outros → Objeto contendo PC, instrução decodificada e o resultado da operação realizada na etapa anterior.
        """
        if not ex_mem:
            return {}
        
        opcode = ex_mem["opcode"]
        result = ex_mem.get("result")
        rs2 = ex_mem.get("rs2")
        rs1 = ex_mem.get("rs1")
        rd = ex_mem.get("rd")
        imm = ex_mem.get("imm")
        pc = ex_mem["pc"]
        zero = ex_mem["zero"]
        WB_register = ex_mem["WB_register"]
        M_register = ex_mem["M_register"]
        
        if opcode == "lw":
            print(f"MEM: {opcode} x{rd},{imm}(x{rs1})")
            data = self.memory.read_word(result)
            print(f"obs: Carregando dado do endereço de memória {result} -> dado={data}")
            print(f"Regitrador WB → {WB_register}\n")
            return {"WB_register": WB_register, "pc": pc, "opcode": opcode, "rd": rd, "rs1": rs1, "rs2": rs2, "imm": imm, "data": data}
        
        elif opcode == "sw":
            if rs2 is not None:
                print(f"MEM: {opcode} x{rs2},{imm}(x{rs1})")
                self.memory.write_word(result, rs2)
                print(f"obs: Salvando dado {rs2} no endereço de memória {result}")
                print(f"Regitrador WB → {WB_register}\n")
            return {"WB_register": WB_register,"pc": pc, "opcode": opcode, "rd": rd, "rs1": rs1, "rs2": rs2, "imm": imm}
        
        else:
            if(opcode == "addi"): print(f"MEM: {opcode} x{rd},x{rs1},{imm}")
            else: print(f"MEM: {opcode} x{rd},x{rs1},x{rs2}")
            print(f"obs: Operação {opcode} não tem ação neste estágio.")
            print(f"Regitrador WB → {WB_register}\n")
            return {"WB_register": WB_register, "pc": pc, "opcode": opcode, "rd": rd, "rs1": rs1, "rs2": rs2, "imm": imm,"result": result}
