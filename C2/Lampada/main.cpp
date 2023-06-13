#include <iostream>
#include "lampada.h"

using namespace std;

int main(){
    Lampada *l = new Lampada();  //ele chama o construtor e cria a lampada

    l->setEstado(1);
    l->imprimirEst();
    l->setEstado(0);
    l->imprimirEst();

    return 0;
}

