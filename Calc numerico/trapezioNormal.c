//trapezio normal
//int isnan(double x)	é numero=0, n é numero!=0

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include "runExpr.h"

void entrarDados(double fx[], double x[]){
	int i=0, escolha=0; 
	double aux=0, integral=0, t=0, f=0, final, h=0, aux1, aux2;
	char funcao[256], op;
	
	while(1){
		printf("=====================================================\n");		
		printf("|                                                   |\n");
		printf("|           INTEGRACAO NUMERICA - TRAPEZIO          |\n");	
		printf("|              (apenas dois valores de x)           |\n");
		printf("=====================================================\n");	
		printf("|                    Menu Inicial                   |\n");
		printf("|                                                   |\n");
		printf("|       (1) - ENTRAR COM OS DADOS DE UMA TABELA     |\n");
		printf("|       (2) - ENTRAR COM UMA FUNCAO F(X)            |\n");     
		printf("|      	[0] - Encerrar programa                     |\n");  
		printf("|                                                   |\n");
		printf("=====================================================\n");
	    fflush(stdin);
	    printf(">");
	    scanf("%d", &escolha);
	    system("cls");
		
		switch (escolha){
			case 1:	
				while(i<2){
					printf("Digite os dados dos x's: ");
					scanf("%lf", &x[i]);
					i++;
				}
				i=0;
				while(i<2){
					printf("Digite os dados dos F(x's): ");
					scanf("%lf", &fx[i]);
					i++;
				}
				
				aux=x[1]-x[0];			
				aux=aux/2;
				f=fx[0]+fx[1];
				
				integral=aux*f;
				system("cls");
				printf("***-----*-----*-----*-----*-----*-----***\n");		
				printf("          RESULTADO: %.4lf         \n", integral);
				printf("***-----*-----*-----*-----*-----*-----***\n\n");	
								
				break;
			
			case 2: 
				system("cls");
				printf("====================================================================\n");		
				printf("|                                                                  |\n");
				printf("|      Digite o x0, xf e a F(x), utilizando x como a incognita:    |\n");
				printf("|                                                                  |\n");
				printf("====================================================================\n");	
				printf("Digite o valor de x0 (x inicial): ");
				scanf("%lf%*c", &t);
				printf("Digite o valor de xf (x final): ");
				scanf("%lf%*c", &final);
			
				printf("\nDigite a F(x): ");
				scanf("%[^\n]", &funcao);
				i=0;
				
				h=final-t;
				
				aux1=runExpr(funcao, t, 0);
				aux2=runExpr(funcao, final, 0);
								
				integral=(h/2)*(aux1+aux2);
				system("cls");
				
				printf("\n*-----*-----*-----*-----*-----*-----*\n");		
				printf(" 	    Xo = %.1lf    Xf = %.1lf\n", t, final);
				printf("	  F(Xo) = %.1lf   F(Xf) = %.1lf  \n\n", aux1, aux2);
				printf("	RESULTADO =  %.4lf \n", integral);
				printf("*-----*-----*-----*-----*-----*-----*\n\n");
								
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
	
	entrarDados(fx, x);
	
	return 0;
}
