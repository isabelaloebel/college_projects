#ifndef DATA_H
#define DATA_H

class Data{

private:
    int dia;
    int mes;
    int ano;

public:
    Data();
    void setDia(int dia);
    void setMes(int mes);
    void setAno(int ano);
    void setData(int dia, int mes, int ano);

    int getDia();
    int getMes();
    int getAno();
    void getData(int *dia, int *mes, int *ano);

    void imprimirData();

    void avancar();
    void retornar();

    ~Data();

};

#endif // DATA_H
