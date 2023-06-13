#include <iostream>
#include "conversaodeunidadesdetemp.h"

using namespace std;

int main(){
    ConversaoDeUnidadesDeTemp *t = new ConversaoDeUnidadesDeTemp;

    t->setTemp(35);
    t->getTemp();

    t->CtoF();
    t->imprimir();
    t->CtoK();
    t->imprimir();
    t->FtoC();
    t->imprimir();
    t->KtoC();
    t->imprimir();
    t->KtoR();
    t->imprimir();
    t->RetoC();
    t->imprimir();
    t->Rtok();
    t->imprimir();

    return 0;
}

