#ifndef PONTO_H
#define PONTO_H


class Ponto {
private:
    double x;
    double y;
public:
    Ponto( double x, double y );
    void setx ( double x );
    void sety ( double y );
    double getx ( );
    double gety ( );

    void show ();

    ~Ponto();
};

#endif // PONTO_H
