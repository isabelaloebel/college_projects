class IDStage:
    """ Classe para representar o estágio ID."""

    def __init__(self, reg_file):
        """ Construtor da classe. \n
            Instancia o estágio com banco de registradores."""
        self.reg_file = reg_file
    
    def process(self, if_id):
        """ Execução do estágio. \n
            • Input: Objeto contendo PC e a linha de instrução.
            • Output: Objeto contendo PC e a instrução decodificada.
        """
        if "instruction" not in if_id:
            return {}
        
        instruction = if_id["instruction"]
        if(instruction is not None): 
            print(f"ID: {instruction}")
            print(f"obs: Decodificando instrução.")

        if instruction is None:
            return {}
        
        parts = instruction.replace(',', ' ').replace('(', ' ').replace(')', ' ').split()
        opcode = parts[0]
        rd = None
        rs1 = None
        rs2 = None
        imm = None

        if opcode in ["add", "sub", "and", "or"]:
            rd = int(parts[1][1:]) if len(parts) > 1 and parts[1][0] == 'x' else 0
            rs1 = int(parts[2][1:]) if len(parts) > 2 and parts[2][0] == 'x' else 0
            rs2 = int(parts[3][1:]) if len(parts) > 3 and parts[3][0] == 'x' else 0        
            WB_register = {"PCSrc": 0, "MemToReg": 0, "RegWrite": 1}
            M_register = {"Branch": 0, "MemRead": 0, "MemWrite": 0}
            EX_register = {"ALUSrc": 0, "ALUOp": "10"}

        elif opcode == "addi":
            rd = int(parts[1][1:]) if len(parts) > 1 and parts[1][0] == 'x' else 0
            rs1 = int(parts[2][1:]) if len(parts) > 2 and parts[2][0] == 'x' else 0
            imm = int(parts[3]) if len(parts) > 3 else 0
            WB_register = {"PCSrc": 0, "MemToReg": 0, "RegWrite": 1}
            M_register = {"Branch": 0, "MemRead": 0, "MemWrite": 0}
            EX_register = {"ALUSrc": 1, "ALUOp": "00"}
        
        elif opcode == "lw":
            rd = int(parts[1][1:]) if len(parts) > 1 and parts[1][0] == 'x' else 0
            imm = int(parts[2]) if len(parts) > 2 else 0
            rs1 = int(parts[3][1:]) if len(parts) > 3 and parts[3][0] == 'x' else 0
            WB_register = {"PCSrc": 0, "MemToReg": 1, "RegWrite": 1}
            M_register = {"Branch": 0, "MemRead": 1, "MemWrite": 0}
            EX_register = {"ALUSrc": 1, "ALUOp": "00"}
        
        elif opcode == "sw":
            rs1 = int(parts[1][1:]) if len(parts) > 1 and parts[1][0] == 'x' else 0
            imm = int(parts[2]) if len(parts) > 2 else 0
            rs2 = int(parts[3][1:]) if len(parts) > 3 and parts[3][0] == 'x' else 0
            WB_register = {"PCSrc": 0, "MemToReg": "-", "RegWrite": 0}
            M_register = {"Branch": 0, "MemRead": 0, "MemWrite": 1}
            EX_register = {"ALUSrc": 1, "ALUOp": "00"}

        else:
            pass
        
        print(f"rs1: {rs1}, rs2:{rs2}, imm:{imm}, rd:{rd}")
        print(f"Regitrador WB → {WB_register}")
        print(f"Regitrador M → {M_register}")
        print(f"Regitrador EX → {EX_register}\n")
        return {"WB_register": WB_register, "M_register": M_register, "EX_register": EX_register, "pc": if_id["pc"], "opcode": opcode, "rd": rd, "rs1": rs1, "rs2": rs2, "imm": imm}