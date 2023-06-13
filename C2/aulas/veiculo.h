#ifndef VEICULO_H
#define VEICULO_H

#include <iostream>
#include <string>

class Veiculo{
protected:
    char placa;
    double aro;
    int numRodas;

public:
    Veiculo(){

    };
    virtual void Mostrar();
    ~Veiculo(){};
};

#endif // VEICULO_H
