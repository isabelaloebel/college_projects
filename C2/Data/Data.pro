TEMPLATE = app
CONFIG += console
CONFIG -= app_bundle
CONFIG -= qt

SOURCES += main.cpp \
    data.cpp

include(deployment.pri)
qtcAddDeployment()

HEADERS += \
    data.h

