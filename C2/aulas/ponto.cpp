#include "ponto.h"

#include <iostream>
using namespace std;

Ponto::Ponto( double x, double y ) {
    this->x = x;
    this->y = y;
}

void Ponto::setx ( double x ) {
    this->x = x;
}

void Ponto::sety ( double y ) {
    this->y = y;
}

double Ponto::getx ( ) {
    return this->x;
}

double Ponto::gety ( ) {
    return this->y;
}

void Ponto::show () {
    cout << "(" << x << "," <<
            y << ")" << endl;
}

Ponto::~Ponto() {
    cout<< "Destructor::Ponto" << endl;
}
