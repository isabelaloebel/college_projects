from if_stage import IFStage
from id_stage import IDStage
from ex_stage import EXStage
from mem_stage import MEMStage
from wb_stage import WBStage
from registers import Registers
from memory import Memory

def main():

    # Declaração das intruções em ASSEMBLY
    program = [
        "addi x1,x0,5",
        "addi x2,x0,10",
        "addi x3,x0,15",
        "addi x4,x0,20",
        "sw x1,0(x1)",
        "sw x2,4(x2)",
        "lw x5,0(x3)",
        "lw x6,4(x4)",
        "add x7,x2,x1",
        "sub x8,x1,x5",
        "and x9,x3,x6",
        "or x10,x4,x2"
    ]

    #Inicializa todos os componentes
    registers = Registers()
    memory = Memory()
    if_stage = IFStage(program)
    id_stage = IDStage(registers)
    ex_stage = EXStage(registers)
    mem_stage = MEMStage(memory)
    wb_stage = WBStage(registers)
    
    #Calcula quantos clocks o bloco de instruções levará para finalizar todas
    clock_cycles = len(program) + 4
    
    #Inicializa os registradores do Pipeline
    if_id = {}
    id_ex = {}
    ex_mem = {}
    mem_wb = {}

    #Lista para controle de execução
    if_stage_output = []
    id_stage_output = []
    ex_stage_output = []
    mem_stage_output = []

    print("-------------------------------------------------------------------------------------------------------------------")
    print("-----------------------------------                INÍCIO              --------------------------------------------")
    print("-------------------------------------------------------------------------------------------------------------------")


    #Início da execução das diferentes etapas do Pipeline
    for cycle in range(clock_cycles):
        print(f"                                              Ciclo de clock: {cycle +1}\n")

        # Estágio IF
        if_id = if_stage.process()
        if_stage_output.append(if_id)

        # Estágio ID
        if cycle > 0:
            id_ex = id_stage.process(if_stage_output.pop(0))
            id_stage_output.append(id_ex)

        # Estágio EX
        if cycle > 1:
            ex_mem = ex_stage.process(id_stage_output.pop(0))
            ex_stage_output.append(ex_mem)

        # Estágio MEM
        if cycle > 2:
            mem_wb = mem_stage.process(ex_stage_output.pop(0))
            mem_stage_output.append(mem_wb)

        # Estágio WB
        if cycle > 3:
            wb_stage.process(mem_stage_output.pop(0))
        
        print(f"PC: {(if_stage.pc-1)*4}\n")
        print(f"Registers → {registers.registers}\n")
        print(f"Memory → {memory.memory}\n")
        input('APERTE [ENTER] PARA PRÓXIMA INSTRUÇÃO')
        print("-------------------------------------------------------------------------------------------------------------------")
    print("-----------------------------------                 FIM              ----------------------------------------------")
    print("-------------------------------------------------------------------------------------------------------------------")


if __name__ == "__main__":
    main()
