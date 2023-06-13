#include "pessoa.h"

#include <iostream>
using namespace std;

Pessoa::Pessoa() {
    nome[0] = '\0';
    endereco[0] = '\0';
}

void Pessoa::setar() {
   char newline;
   cout << "\n Digite o nome: ";
   cin.get( nome, 30, '\n' );
   cin.get(newline);

   cout << "\n Digite o endereco: ";
   cin.get( endereco, 40, '\n' );
   cin.get(newline);
}

void Pessoa::mostrar() {
    cout << "\n Nome....: " << nome << endl;

    cout << "\n Endereco: " << endereco << endl;
}

Pessoa::~Pessoa () {
    cout << "Destructor::pessoa" << endl;
}

