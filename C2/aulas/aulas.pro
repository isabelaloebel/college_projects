TEMPLATE = app
CONFIG += console
CONFIG -= app_bundle
CONFIG -= qt

SOURCES += main.cpp \
    pessoa.cpp \
    ponto.cpp \
    veiculo.cpp \
    carro.cpp

include(deployment.pri)
qtcAddDeployment()

HEADERS += \
    pessoa.h \
    ponto.h \
    veiculo.h \
    carro.h

