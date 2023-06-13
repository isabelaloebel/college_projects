#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "runExpr.h"


void valoresGaussiana(double* x, double* w, int pontos) {
	switch (pontos) {
		case 2:
			x[0] = -0.5773502691896257;
			x[1] = 0.5773502691896257;

			w[0] = 1;
			w[1] = 1;
			break;
		case 3:
			x[0] = -0.7745966692414834;
			x[1] = 0;
			x[2] = 0.7745966692414834;

			w[0] = 0.5555555555555556;
			w[1] = 0.8888888888888889;
			w[2] = 0.5555555555555556;
			break;
		case 4:
			x[0] = -0.3399810435848563;
			x[1] = 0.3399810435848563;
            x[2] = -0.8611363115940526;
            x[3] = 0.8611363115940526;

			w[0] = 0.6521451548625461;
			w[1] = 0.6521451548625461;
			w[2] = 0.3478548451374538;
			w[3] = 0.3478548451374538;
			break;
		case 5:
			x[0] = 0;
			x[1] = -0.5384693101056831;
            x[2] = 0.5384693101056831;
            x[3] = -0.9061798459386640;
            x[4] = 0.9061798459386640;

			w[0] = 0.5688888888888889;
			w[1] = 0.4786286704993665;
			w[2] = 0.4786286704993665;
			w[3] = 0.2369268850561891;
			w[4] = 0.2369268850561891;
			break;
		case 6:
			x[0] = 0.6612093864662645;
			x[1] = -0.6612093864662645;
            x[2] = -0.2386191860831969;
            x[3] = 0.2386191860831969;
            x[4] = -0.9324695142031521;
            x[5] = 0.9324695142031521;

			w[0] = 0.3607615730481386;
			w[1] = 0.3607615730481386;
			w[2] = 0.4679139345726910;
			w[3] = 0.4679139345726910;
			w[4] = 0.1713244923791704;
			w[5] = 0.1713244923791704;
            break;
        default: break;
	}
}

void calcGaussiana(char* expr, double x0, double x1, int pontos){
    int n = pontos;
    double valorX[n], valorW[n], x, w, a, b, y, resultado;

	valoresGaussiana(valorX, valorW, n);
	a = (x1 - x0) / 2;
    b = (x1 + x0) / 2;
	resultado = 0;


	printf("\n\n");
	printf("+-------------------------------------------------------------------+\n");
    printf("|       X       |       W       |       Y       |     Resultado     |\n");
    printf("+-------------------------------------------------------------------+\n");

	for (int i=0; i<n; ++i) {
        x = valorX[i];
		w = valorW[i];
		y = w * runExpr(expr, (x*a) + b, 0);
		resultado += y;
		printf("|%15.8lf|%15.8lf|%15.8lf|%19.8lf| \n", x, w, y, resultado);
	}
	printf("+-------------------------------------------------------------------+\n");

	printf("\n\nResultado final: %.8lf\n\n", resultado);
}

void runGaussiana(){
	char funcao[256];
    int pontos, escolha;
    double x0, x1;

    while(1){
        system("cls");
        printf("+---------------------------------------------------+\n");
        printf("|                                                   |\n");
        printf("|    INTEGRACAO NUMERICA - QUADRATURA GAUSSIANA     |\n");
        printf("|                                                   |\n");
        printf("+---------------------------------------------------+\n");
        printf("|                                                   |\n");
        printf("|                       MENU                        |\n");
        printf("|                                                   |\n");
        printf("|       (1) - ENTRAR COM UMA FUNCAO F(X)            |\n");
        printf("|      	[0] - Encerrar programa                     |\n");
        printf("|                                                   |\n");
        printf("+---------------------------------------------------+\n");
        fflush(stdin);
        printf(">");
        scanf("%d", &escolha);
        system("cls");


        switch (escolha){

                case 1:
                    fflush(stdin);
                    printf("\nDigite a F(x): ");
                    scanf("%[^\n]", &funcao);
                    printf("\nDigite o valor de 'x0': ");
                    scanf("%lf", &x0);
                    printf("\nDigite o valor de 'x1': ");
                    scanf("%lf", &x1);
                    printf("\nDigite o valor de pontos: ");
                    scanf("%d", &pontos);

                    calcGaussiana(funcao, x0, x1, pontos);
                    system("pause");
                break;

                case 0:
                    exit(1);

                default:
                    printf("-----------------------\n");
                    printf("|  Opcao nao valida.  |\n");
                    printf("-----------------------\n");

        }
    }
}


int main() {

    runGaussiana();

	return 0;
}
