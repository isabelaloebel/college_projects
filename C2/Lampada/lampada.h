#ifndef LAMPADA_H
#define LAMPADA_H

class Lampada{

private:
    int estado;

public:
    Lampada();
    int getEstado();
    void setEstado(int estado);
    void imprimirEst();
    ~Lampada();
};

#endif // LAMPADA_H
