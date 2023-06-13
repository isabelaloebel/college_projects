#ifndef PESSOA_H
#define PESSOA_H


class Pessoa {
private:
    char nome[31];
    char endereco[40];
public:
    Pessoa();
    void setar();
    void mostrar();
    ~Pessoa();
};

#endif // PESSOA_H
