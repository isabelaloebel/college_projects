#include "data.h"
#include <iostream>

using namespace std;

Data::Data(){
}

void Data::setDia(int dia){
   this->dia=dia;
}

void Data::setMes(int mes){
    this->mes=mes;
}

void Data::setAno(int ano){
    this->ano=ano;
}

void Data::setData(int dia, int mes, int ano){
    setDia(dia);
    setMes(mes);
    setAno(ano);
}

int Data::getDia(){
    return this->dia;
}

int Data::getMes(){
    return this->mes;
}

int Data::getAno(){
    return this->ano;
}

void Data::getData(int *dia, int *mes, int *ano){
    *dia=getDia();
    *mes=getMes();
    *ano=getAno();
}

void Data::imprimirData(){
    cout << this->dia << "/" << this->mes << "/" << this->ano << endl;

}

void Data::avancar(){
    int d, m, a;

    d=getDia();
    m=getMes();
    a=getAno();

    if(m==2){
        if(d>0 && d<28){
            d++;
        }
        else if(d==28){
            d=1;
            m++;

        }
       else{
            cout << "Data invalida." << endl;
        }
    }
    else if(m==1 || m==3 || m==5 || m==7 || m==8 || m==10 || m== 12){

        if(d>0 && d<31){
            d++;
        }
        else if(d==31){
            d=1;
            m++;
            if(m==13){
                m=1;
                a++;
            }
        }
        else{
            cout << "Data invalida." << endl;
        }
    }
    else if(m<0 || m>12){
            cout << "Data invalida." << endl;
    }
    else{

        if(d>0 && d<30){
            d=d+1;

        }
        else if(d==30){
            d=1;
            m++;

            if(m<0 || m>12){
                cout << "Data invalida." << endl;
            }

        }
        else{
            cout << "Data invalida." << endl;
        }

    }
    setDia(d);
    setMes(m);
    setAno(a);
}

void Data::retornar(){
    int d, m, a;

    d=getDia();
    m=getMes();
    a=getAno();

    if(m==2){
        if(d>1 && d<=28){
            d--;
        }
        else if(d==1){
            d=31;
            m--;

        }
       else{
            cout << "Data invalida." << endl;
        }
    }
    else if(m==1 || m==3 || m==5 || m==7 || m==8 || m==10 || m== 12){

        if(d>1 && d<=31){
            d--;
        }
        else if(m==3 && d==1){
            d=28;
            m--;
        }
        else if(d==1){
            d=30;
            m--;
            if(m<1){
                d=31;
                m=12;
                a--;
            }
            else if(m==7){
                d=31;
            }
        }
        else{
            cout << "Data invalida." << endl;
        }
    }
    else if(m<0 || m>12){
            cout << "Data invalida." << endl;
    }
    else{

        if(d>1 && d<=30){
            d--;
        }
        else if(d==1){
            d=31;
            m--;

            if(m<0 || m>12){
                cout << "Data invalida." << endl;
            }

        }
        else{
            cout << "Data invalida." << endl;
        }

    }
    setDia(d);
    setMes(m);
    setAno(a);

}
