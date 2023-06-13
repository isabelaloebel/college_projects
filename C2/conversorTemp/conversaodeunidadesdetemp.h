#ifndef CONVERSAODEUNIDADESDETEMP_H
#define CONVERSAODEUNIDADESDETEMP_H


class ConversaoDeUnidadesDeTemp{
private:
    double temp;

public:
    ConversaoDeUnidadesDeTemp();
    double getTemp();
    void setTemp(double temp);
    void CtoF();
    void CtoK();
    void FtoC();
    void KtoC();
    void KtoR();
    void RetoC();
    void Rtok();
    void imprimir();
    ~ConversaoDeUnidadesDeTemp();
};

#endif // CONVERSAODEUNIDADESDETEMP_H
