//runge kutta

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "runExpr.h"

void entrarDados(double fx[], double x[]){
	char funcao[256];	double aux, h=0, c=0, e=0;
	double k1,k2,K;
	int i, a, d, b;
	//4*exp(0.8 * x) - 0.5 * y
	while(1){	
		printf("=====================================================\n");		
		printf("|                                                   |\n");
		printf("|     INTEGRACAO NUMERICA - METODO DE RUNGE KUTTA   |\n");
		printf("|                       POR HEUN                    |\n");	
		printf("|                                                   |\n");
		printf("=====================================================\n");	
		printf("|                    Menu Inicial                   |\n");
		printf("|                                                   |\n");
		printf("|         (1) - ENTRAR COM UMA FUNCAO F(X)          |\n");     
		printf("|      	  [0] - Encerrar programa                   |\n");  
		printf("|                                                   |\n");
		printf("=====================================================\n");
	    fflush(stdin);
	    printf(">");
	    scanf("%d%*c", &a);
	    system("cls");
	    
	    switch(a){
	    	case 1:
	    		printf("Digite a funcao de y': ");
	    		scanf("%[^\n]", &funcao);
	    		printf("Digite o h: ");
	    		scanf("%lf", &h);
	    		printf("Digite o x inicial: ");
	    		scanf("%lf", &x[0]);
	    		printf("Digite o y(x) inicial: ");
	    		scanf("%lf", &fx[0]);
	    		system("cls");
	    		
	    		printf("=====================================================\n");		
				printf("|                                                   |\n");
				printf("|            Criterio de parada informado:          |\n");	
				printf("|                (1) x          (2) y               |\n");
				printf("|                                                   |\n");
				printf("=====================================================\n");	
				scanf("%d", &b);
				system("cls");
	    		printf("=====================================================\n");		
				printf("|                                                   |\n");
				printf("|                   Tipo de erro:                   |\n");	
				printf("|         (1) absoluto          (2) relativo        |\n");
				printf("|                                                   |\n");
				printf("=====================================================\n");
	    		scanf("%d", &d);
	    		int iteracoes;
	    		system("cls");
	    		printf("Digite a quantidade de iteracoes:\n");
	    		scanf("%d",&iteracoes); 
				if(b==1){
					printf("Digite o X final: ");
					scanf("%lf%*c", &c);
					system("cls");

					for(i=1;i<256;i++){
						x[i]=0;
					}
					double auquis;
					for(i=1;x[i-1]<c;i++){
						x[i] = x[i-1] + h;
						aux = runExpr(funcao, x[i-1], fx[i-1]);
						k1 = aux;
						auquis = fx[i - 1] + k1 * h;
						for (int j = 0; j < iteracoes; ++j)
						{
							k2 = runExpr(funcao, x[i], auquis);
							auquis=fx[i - 1] + (k1 + k2) * 0.5 * h;
						}
						fx[i] = auquis;
					}


					system("pause");
					printf("\n*-----*-----*-----*-----*-----*-----*\n		X\n");
								
					for(i=0;x[i-1]<c;i++){	
						printf(" 	    X[%d] = %.2lf \n", i, x[i]);
					}
					printf("\n*-----*-----*-----*-----*-----*-----*\n		Y(X)\n");
					
					for(i=0;x[i-1]<c;i++){	
						printf(" 	    Y(X[%d]) = %.4lf \n", i, fx[i]);
					}
					printf("*-----*-----*-----*-----*-----*-----*\n	    	ERRO:\n");
					
					if(d==1){
						for(i=1;x[i-1]<c;i++){
							e=fx[i]-fx[i-1];
							if(e < 0) e*=-1;
							printf("         E(FX[%d]) = %.6lf\n", i, e);
						}
						printf("*-----*-----*-----*-----*-----*-----*\n\n");
					}
					else if(d==2){
						for(i=1;x[i-1]<c;i++){
							e=(fx[i]-fx[i-1])/fx[i];
							if(e < 0) e*=-1;
							printf("         E(X[%d]) = %.6lf\n", i, e);
						}
						printf("*-----*-----*-----*-----*-----*-----*\n\n");
					}
					system("pause");
					// system("cls");
					
				}
				else if(b==2){
					printf("Digite o Y final: ");
					scanf("%lf%*c", &c);

					
					double auquis;
					//mudar
					for(i=1; fx[i-1] < c;i++){
						x[i] = x[i-1] + h;
						k1 = runExpr(funcao, x[i-1], fx[i-1]);
						
						auquis = fx[i - 1] + k1 * h;
						for (int j = 0;j < 15; ++j)
						{
							k2 = runExpr(funcao, x[j], auquis);
							auquis=fx[j - 1] + (k1 + k2) * 0.5 * h;
						}
						fx[i] = auquis;
					}
					system("cls");
					printf("\n*-----*-----*-----*-----*-----*-----*\n		X\n");
								
					for(i=0;fx[i-1]<c;i++){	
						printf(" 	    X[%d] = %.2lf \n", i, x[i]);
					}
					printf("\n*-----*-----*-----*-----*-----*-----*\n		Y(X)\n");
					
					for(i=0;fx[i-1]<c;i++){	
						printf(" 	    Y(X[%d]) = %.4lf \n", i, fx[i]);
					}
					printf("*-----*-----*-----*-----*-----*-----*\n\n");

					if(d==1){
						for(i=1;fx[i-1]<c;i++){
							e=fx[i]-fx[i-1];
							if(e < 0) e*=-1;
							printf("         E(FX[%d]) = %.6lf\n", i, e);
						}
						printf("*-----*-----*-----*-----*-----*-----*\n\n");
					}
					else if(d==2){
						for(i=1;fx[i-1]<c;i++){
							e=(fx[i]-fx[i-1])/fx[i];
							if(e < 0) e*=-1;
							printf("         E(X[%d]) = %.6lf\n", i, e);
						}
						printf("*-----*-----*-----*-----*-----*-----*\n\n");
					}

					system("pause");
					system("cls");
				}
				else{
					system("cls");
					printf("-----------------------\n");		
					printf("|  Opcao nao valida.  |\n");
					printf("-----------------------\n");
				}
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

int main(){
	double fx[256], x[256];
	
	// system("cls");
	entrarDados(fx, x);
	
	return 0;
}
