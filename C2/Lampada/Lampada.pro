TEMPLATE = app
CONFIG += console
CONFIG -= app_bundle
CONFIG -= qt

SOURCES += main.cpp \
    lampada.cpp

include(deployment.pri)
qtcAddDeployment()

HEADERS += \
    lampada.h

