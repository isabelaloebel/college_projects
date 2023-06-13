#include <iostream>

using namespace std;

//#include "pessoa.h"

//#include "ponto.h"
#include "veiculo.h"
#include "carro.h"

int main() {
    Veiculo *v;

    v = new Carro();
    v->Mostrar();

}
