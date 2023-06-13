#include "lampada.h"
#include <iostream>
using namespace std;

Lampada::Lampada(){
}

Lampada::~Lampada(){
    cout << "\ndestruindo lampada" << endl;
}

int Lampada::getEstado(){
    return this->estado;
}

void Lampada::setEstado(int estado){
    this->estado=estado;
}

void Lampada::imprimirEst(){
     if(getEstado()){
         cout << "Lampada ligada" << endl;
     }
     else{
         cout << "Lampada desligada" << endl;
     }
}
