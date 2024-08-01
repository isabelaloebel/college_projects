class EXStage:
    """ Classe para representar o estágio EX."""
    def __init__(self, reg_file):
        """ Construtor da classe. \n
            Instancia o estágio com banco de registradores."""
        self.reg_file = reg_file

    def process(self, id_ex):
        """ Execução do estágio. \n
            • Input: Objeto contendo PC e a instrução decodificada.
            • Output: Objeto contendo PC, a instrução decodificada e o resultado da operação realizada.
        """
        if not id_ex:
            return {}
        
        opcode = id_ex["opcode"]
        rd = id_ex["rd"]
        rs1 = id_ex["rs1"]
        rs2 = id_ex["rs2"]
        imm = id_ex["imm"]
        pc = id_ex["pc"]
        WB_register = id_ex["WB_register"]
        M_register = id_ex["M_register"]
        EX_register = id_ex["EX_register"]

        if opcode == "add":
            print(f"EX: {opcode} x{rd},x{rs1},x{rs2}")
            result = self.reg_file.read(rs1) + self.reg_file.read(rs2)
            print(f"obs: Calculando adição rs1: {self.reg_file.read(rs1)}, rs2: {self.reg_file.read(rs2)} → {result}  \n")
        
        elif opcode == "sub":
            print(f"EX: {opcode} x{rd},x{rs1},x{rs2}")
            result = self.reg_file.read(rs1) - self.reg_file.read(rs2)
            print(f"obs: Calculando subtração rs1: {self.reg_file.read(rs1)}, rs2: {self.reg_file.read(rs2)} → {result}")

        elif opcode == "and":
            print(f"EX: {opcode} x{rd},x{rs1},x{rs2}")
            result = self.reg_file.read(rs1) & self.reg_file.read(rs2)
            print(f"obs: Calculando operação lógica AND rs1: {self.reg_file.read(rs1)}, rs2: {self.reg_file.read(rs2)} → {result}")

        elif opcode == "or":
            print(f"EX: {opcode} x{rd},x{rs1},x{rs2}")
            result = self.reg_file.read(rs1) | self.reg_file.read(rs2)
            print(f"obs: Calculando operação lógica OR rs1: {self.reg_file.read(rs1)}, rs2: {self.reg_file.read(rs2)} → {result}")

        elif opcode == "addi":
            print(f"EX: {opcode} x{rd},x{rs1},{imm}")
            result = self.reg_file.read(rs1) + imm
            print(f"obs: Calculando adição rs1: {self.reg_file.read(rs1)}, imm: {imm} → {result}")

        elif opcode == "lw" or opcode == "sw":
            if(opcode == "lw"): print(f"EX: {opcode} x{rd},{imm}(x{rs1})")

            if(opcode == "sw"): print(f"EX: {opcode} x{rs2},{imm}(x{rs1})")

            result = self.reg_file.read(rs1) + imm
            print(f"obs: Calculando endereço rs1: {self.reg_file.read(rs1)}, imm: {imm} → {result}")

        else:
            result = 0
        
        print(f"Zero → 0")
        print(f"Regitrador WB → {WB_register}")
        print(f"Regitrador M → {M_register}\n")
        return {"WB_register": WB_register, "M_register": M_register, "pc": pc, "opcode": opcode, "rd": rd, "rs2": rs2, "rs1": rs1, "imm": imm, "result": result, "zero": 0} if opcode == "sw" else {"WB_register": WB_register, "M_register": M_register, "pc": pc, "opcode": opcode, "rd": rd, "rs2": rs2, "rs1": rs1, "imm": imm, "result": result, "zero": 0}
