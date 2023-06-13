#ifndef CARRO_H
#define CARRO_H
#include "veiculo.h"
#include <iostream>

class Carro : public Veiculo{
public:
    Carro(){

    }
    void Mostrar(){
        std::cout << "A!" << std::endl;
    }
    ~Carro(){

    }
};

#endif // CARRO_H
