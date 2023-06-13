#include <iostream>
#include "data.h"

using namespace std;

int main(){
    Data *d = new Data();

    int dia, mes, ano, i;

    d->setData(1,1,2020);
    d->getData(&dia, &mes, &ano);

    for(i=0;i<365;i++){
        d->retornar();
        d->imprimirData();

    }

    return 0;
}

