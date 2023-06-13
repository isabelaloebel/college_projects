#include <iostream>
#include "conversaodeunidadesdetemp.h"
using namespace std;

ConversaoDeUnidadesDeTemp::ConversaoDeUnidadesDeTemp(){
}

double ConversaoDeUnidadesDeTemp::getTemp(){
    return this->temp;
}

void ConversaoDeUnidadesDeTemp::setTemp(double temp){
    this->temp=temp;
}

void ConversaoDeUnidadesDeTemp::CtoF(){
    double temp, resul=0;

    temp=getTemp();

    resul=(9*(temp/5)+32);

    setTemp(resul);
}

void ConversaoDeUnidadesDeTemp::CtoK(){
    double temp, resul;

    temp=getTemp();

    resul=temp+273.15;

    setTemp(resul);
}

void ConversaoDeUnidadesDeTemp::FtoC(){
    double temp, resul;

    temp=getTemp();

    resul=(temp-32)+(5/9);

    setTemp(resul);
}

void ConversaoDeUnidadesDeTemp::KtoC(){
    double temp, resul;

    temp=getTemp();

    resul=temp-273.15;

    setTemp(resul);
}

void ConversaoDeUnidadesDeTemp::KtoR(){
    double temp, resul;

    temp=getTemp();

    resul=temp*1.8;

    setTemp(resul);
}

void ConversaoDeUnidadesDeTemp::RetoC(){
    double temp, resul;

    temp=getTemp();

    resul=temp*(5/4);

    setTemp(resul);
}

void ConversaoDeUnidadesDeTemp::Rtok(){
    double temp, resul;

    temp=getTemp();

    resul=temp/1.8;

    setTemp(resul);
}

void ConversaoDeUnidadesDeTemp::imprimir(){
    double temp;

    temp=getTemp();

    cout << "temp = " << temp << endl;
}

ConversaoDeUnidadesDeTemp::~ConversaoDeUnidadesDeTemp(){
}
