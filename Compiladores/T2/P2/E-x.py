import os
import tkinter as tk
import subprocess
from tkinter import filedialog
from colorama import init
from colorama import Fore, Back, Style
from contextlib import redirect_stdout

exit_code = 0

# Função main em Python para chamar o compilador
if __name__ == '__main__':
    root = tk.Tk()
    root.withdraw()
    file_path = filedialog.askopenfilename()
    file_name = os.path.basename(file_path)

    compiler_output = subprocess.getoutput("java Ex " + file_path)

    if (compiler_output.find("ParseException: Encountered") != -1):
        exit_code = 1
        print(Fore.RED + compiler_output)
    else:
        # Redirecionando o buffer do STDOUT para escrever diretamente no arquivo texto
        with open('arvore_' + file_name, 'w') as f:
            with redirect_stdout(f):
                print(compiler_output)
    os.system('pause')