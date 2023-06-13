//trapezio normal
//int isnan(double x)	é numero=0, n é numero!=0

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include "runExpr.h"

int isPar(int x)
{
	return (x%2);
}

double conta(double* fx, int inicial , int final, int n, double* x)
{
	double  par = 0 , impar = 0;
	printf("inicial: %d final:%d\n",inicial,final );
		for (int i = inicial+1; i < final; ++i)
		{
			printf("fx[%d] = %lf\n", i,fx[i]);
			
			if (isPar(i)){
				par += 2*fx[i];
			}
			else{
				impar += 4* fx[i];
			}
	}		
	
		

	printf("n:       %d\n", n);
	printf("par:     %lf\n",par );
	printf("impar:   %lf\n",impar );
	printf("aaa:%lf  \n",x[final-1] - x[inicial-1]);
	double h = (x[final-1] - x[inicial-1]) / n;
	printf("h:       %lf\n", h);
	double a = (h/3) * (par + impar + fx[inicial] + fx[final]);
	printf("resiult: %lf\n", a);
	return a;
		
}

void entrarDados(){
	int i=0, escolha=0; 
	double aux=0, integral=0, t=0, f=0, final, h=0, aux1, aux2;
	char funcao[256], op;
	int quantidade;
	double X[250];
	double fx[250];


	 //tem q saber como pegar o x da funcao 3x-1, por ex
	system("cls");
	printf("================================================================\n");		
	printf("|                                                              |\n");
	printf("| Digite os valores e a funcao, utilizando x como a incognita  |\n");
	printf("|                                                              |\n");
	printf("================================================================\n");	
	printf("Digite o valor de x0 (x inicial): ");
	scanf("%lf%*c", &t);
	printf("Digite o valor de xf (x final): ");
	scanf("%lf%*c", &final);
	printf("Digite o  valor de n: ");
	int n;
	scanf("%d%*c", &n);

	printf("\nDigite a F(x): ");
	scanf("%[^\n]", &funcao);
	i=0;
	
	h = (final - t) / n;
	
	double iteracao = t+h ;
	double par = 0 , impar = 0;

	for (int i = 0; i < n - 1; ++i)
	{
		if (isPar(i)){
			par += runExpr(funcao, iteracao);
		}
		else{
			impar += runExpr(funcao, iteracao);		}
		
		iteracao+= h;
	}

	par*=2;
	impar*=4;
	double resultado = runExpr(funcao,t) + runExpr(funcao,final) + par + impar;
	resultado*= (h/3);
					
	printf("\n*-----*-----*-----*-----*-----*-----*\n");		
	printf(" 	    Xo = %.1lf    Xf = %.1lf\n", t, final);
	//printf("	  F(Xo) = %.1lf   F(Xf) = %.1lf  \n\n", aux1, aux2);
	printf("	RESULTADO =  %.4lf \n", resultado);
	printf("*-----*-----*-----*-----*-----*-----*\n\n");
	system("pause");

	
/*	while(1){
		system("cls");
		printf("=====================================================\n");		
		printf("|                                                   |\n");
		printf("|         INTEGRACAO NUMERICA - SIMPSON R.          |\n");	
		printf("|                (para n valores de x)              |\n");
		printf("=====================================================\n");	
		printf("|                    Menu Inicial                   |\n");
		printf("|                                                   |\n");
		printf("|       (1) - ENTRAR COM UM CONJUNTO DE DADOS       |\n");
		printf("|       (2) - ENTRAR COM UMA FUNCAO F(X)            |\n");     
		printf("|      	[0] - Encerrar programa                     |\n");  
		printf("|                                                   |\n");
		printf("=====================================================\n");
	    fflush(stdin);
	    printf(">");
	    scanf("%d", &escolha);
	    system("cls");
		
		switch (escolha){
			case :	1
				system("cls");
				printf("================================================================\n");		
				printf("|                                                              |\n");
				printf("|               Digite os valores de x e de F(x)               |\n");
				printf("|                                                              |\n");
				printf("================================================================\n");	
				printf("Digite a quantidade de valores:\n");
				scanf("%d%*c",&quantidade);
				
				printf("\n");
				printf("Digite os valores de x:\n");
				for (int i = 0; i < quantidade; ++i)
				{
					scanf("%lf%*c",&X[i]);
				}

				printf("\n");
				printf("Digite os valores de fx:\n");
				for (int i = 0; i < quantidade; ++i)
				{
					scanf("%lf%*c",&fx[i]);
				}

				double ini = 1;
				int counter = 1;
				double aux = X[1] - X[0];
				double result = 0;
				int i = 2;		       	
				while ( i < quantidade - 1){ // WHILE ATÉ TODOS OS Y E X;
				       if (aux  == (X[i] - X[i-1] )){
				       		counter++; // auxiliar para saber quantos x tem o mesmo pulo;
				 			i++;
				       } //VERIFICA SE O PULO AINDA TA IGUAL{
				        else {
				       		result += conta(fx,ini,i,counter,X); // dai aqui vc chamaria a função pra calcular a parte com os pulos iguais
				       						  // em aux ta quantos x tem de pulo igual, e em i, onde parou 
				       						  // dai vc começa a calular de i - aux ate i; 
				       		ini = i-1;
				       		aux = 0;	
				       		i++;
				       		aux = (X[i] - X[i-1] ); // proximo pulo
				       		counter = 0;
				       		
				       		//recomeça o calculo
				       	}
				}

				printf("***-----*-----*-----*-----*-----*-----***\n");		
				printf("          RESULTADO: %.4lf         \n", result);
				printf("***-----*-----*-----*-----*-----*-----***\n\n");	
				system("pause");
				break;		
			
			case 2: //tem q saber como pegar o x da funcao 3x-1, por ex
				system("cls");
				printf("================================================================\n");		
				printf("|                                                              |\n");
				printf("| Digite os valores e a funcao, utilizando x como a incognita  |\n");
				printf("|                                                              |\n");
				printf("================================================================\n");	
				printf("Digite o valor de x0 (x inicial): ");
				scanf("%lf%*c", &t);
				printf("Digite o valor de xf (x final): ");
				scanf("%lf%*c", &final);
				printf("Digite o  valor de n: ");
				int n;
				scanf("%d%*c", &n);

				printf("\nDigite a F(x): ");
				scanf("%[^\n]", &funcao);
				i=0;
				
				h = (final - t) / n;

				double iteracao = t+h , par = 0 , impar = 0;

				for (int i = 0; i < n - 1; ++i)
				{
					if (isPar(i)){
						par += runExpr(funcao, iteracao);
						//printf("[%d]: %lf\n", i, runExpr(funcao, iteracao));
					}
					else{
						impar += runExpr(funcao, iteracao);
						//printf("[%d]: %lf\n", i, runExpr(funcao, iteracao));
					}
					
					iteracao+= h;
				}

				par*=2;
				impar*=4;
				double resultado = runExpr(funcao,t) + runExpr(funcao,final) + par + impar;
				resultado*= (h/3);
								
				printf("\n*-----*-----*-----*-----*-----*-----*\n");		
				printf(" 	    Xo = %.1lf    Xf = %.1lf\n", t, final);
				//printf("	  F(Xo) = %.1lf   F(Xf) = %.1lf  \n\n", aux1, aux2);
				printf("	RESULTADO =  %.4lf \n", resultado);
				printf("*-----*-----*-----*-----*-----*-----*\n\n");
				system("pause");			
				break;
				
			case 0:
				exit(1);
				
			default:
				printf("-----------------------\n");		
				printf("|  Opcao nao valida.  |\n");
				printf("-----------------------\n");
				system("PAUSE");
		}
	}*/
	
}
int main(){
	printf("blalba\n");
	
	entrarDados();
	
	return 0;
}
