/* Generated By:JJTree&JavaCC: Do not edit this line. LP.java */
import java.io.*;
 import java.util.*;
 import java.util.ArrayList;

public class LP/*@bgen(jjtree)*/implements LPTreeConstants, LPConstants {/*@bgen(jjtree)*/
  protected static JJTLPState jjtree = new JJTLPState();public static void main(String[] args) throws ParseException, IOException{
     System.out.println("Digite o nome do arquivo:");
     Scanner scan = new Scanner(System.in);
     String path = System.getProperty("user.dir");
     path = path + "\\" + scan.next();

    LP lp = new LP(new FileInputStream(path));
    try{
        SimpleNode node = lp.LP();
        node.dump("");
      } catch (Exception e){
          e.printStackTrace();
      }
    }

/*
    Regra inicial da gramática.
*/
  static final public SimpleNode LP() throws ParseException {
 /*@bgen(jjtree) MAIN */
 SimpleNode jjtn000 = new SimpleNode(JJTMAIN);
 boolean jjtc000 = true;
 jjtree.openNodeScope(jjtn000);Token t;
    try {
      jj_consume_token(INT);
      jj_consume_token(MAIN);
      jj_consume_token(APARENTESES);
      jj_consume_token(FPARENTESES);
      jj_consume_token(ACHAVES);
      Comandos();
      Return();
      jj_consume_token(FCHAVES);
      jj_consume_token(0);
      jjtree.closeNodeScope(jjtn000, true);
      jjtc000 = false;
     {if (true) return jjtn000;}
    } catch (Throwable jjte000) {
      if (jjtc000) {
        jjtree.clearNodeScope(jjtn000);
        jjtc000 = false;
      } else {
        jjtree.popNode();
      }
      if (jjte000 instanceof RuntimeException) {
        {if (true) throw (RuntimeException)jjte000;}
      }
      if (jjte000 instanceof ParseException) {
        {if (true) throw (ParseException)jjte000;}
      }
      {if (true) throw (Error)jjte000;}
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
    throw new Error("Missing return statement in function");
  }

/*
    Regra que verifica um token de comparacao 
*/
  static final public void Compare() throws ParseException {
 /*@bgen(jjtree) TOKENCOMPARADOR */
  SimpleNode jjtn000 = new SimpleNode(JJTTOKENCOMPARADOR);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      switch ((jj_ntk==-1)?jj_ntk():jj_ntk) {
      case IGUALDADE:
        jj_consume_token(IGUALDADE);
        break;
      case DIFERENTE:
        jj_consume_token(DIFERENTE);
        break;
      case MAIOR:
        jj_consume_token(MAIOR);
        break;
      case MENOR:
        jj_consume_token(MENOR);
        break;
      case MAIORIGUAL:
        jj_consume_token(MAIORIGUAL);
        break;
      case MENORIGUAL:
        jj_consume_token(MENORIGUAL);
        break;
      default:
        jj_la1[0] = jj_gen;
        jj_consume_token(-1);
        throw new ParseException();
      }
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra que verifica o token de tipo da variavel
*/
  static final public void Type() throws ParseException {
 /*@bgen(jjtree) TYPE */
  SimpleNode jjtn000 = new SimpleNode(JJTTYPE);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      switch ((jj_ntk==-1)?jj_ntk():jj_ntk) {
      case INT:
        jj_consume_token(INT);
        break;
      case CHAR:
        jj_consume_token(CHAR);
        break;
      case FLOAT:
        jj_consume_token(FLOAT);
        break;
      default:
        jj_la1[1] = jj_gen;
        jj_consume_token(-1);
        throw new ParseException();
      }
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra que verifica todos os comandos validos ou nenhum
*/
  static final public void Comandos() throws ParseException {
 /*@bgen(jjtree) COMANDOS */
  SimpleNode jjtn000 = new SimpleNode(JJTCOMANDOS);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      switch ((jj_ntk==-1)?jj_ntk():jj_ntk) {
      case INT:
      case FLOAT:
      case CHAR:
      case PRINT:
      case FOR:
      case WHILE:
      case IF:
      case ID:
        switch ((jj_ntk==-1)?jj_ntk():jj_ntk) {
        case INT:
        case FLOAT:
        case CHAR:
          DeclaraVariavel();
          Comandos();
          break;
        case FOR:
          For();
          Comandos();
          break;
        case WHILE:
          While();
          Comandos();
          break;
        case IF:
          If();
          Comandos();
          break;
        case PRINT:
          Print();
          Comandos();
          break;
        case ID:
          Operacao();
          Comandos();
          break;
        default:
          jj_la1[2] = jj_gen;
          jj_consume_token(-1);
          throw new ParseException();
        }
        break;
      default:
        jj_la1[3] = jj_gen;
        ;
      }
    } catch (Throwable jjte000) {
      if (jjtc000) {
        jjtree.clearNodeScope(jjtn000);
        jjtc000 = false;
      } else {
        jjtree.popNode();
      }
      if (jjte000 instanceof RuntimeException) {
        {if (true) throw (RuntimeException)jjte000;}
      }
      if (jjte000 instanceof ParseException) {
        {if (true) throw (ParseException)jjte000;}
      }
      {if (true) throw (Error)jjte000;}
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra que verifica uma declaracao de variavel
*/
  static final public void DeclaraVariavel() throws ParseException {
 /*@bgen(jjtree) VAR */
  SimpleNode jjtn000 = new SimpleNode(JJTVAR);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      Type();
      Id();
      Atribuicao();
      IdOrValue();
      jj_consume_token(PVIRGULA);
    } catch (Throwable jjte000) {
      if (jjtc000) {
        jjtree.clearNodeScope(jjtn000);
        jjtc000 = false;
      } else {
        jjtree.popNode();
      }
      if (jjte000 instanceof RuntimeException) {
        {if (true) throw (RuntimeException)jjte000;}
      }
      if (jjte000 instanceof ParseException) {
        {if (true) throw (ParseException)jjte000;}
      }
      {if (true) throw (Error)jjte000;}
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra que verifica um identificador ou numero imediato
*/
  static final public void IdOrValue() throws ParseException {
 /*@bgen(jjtree) IDORVALUE */
  SimpleNode jjtn000 = new SimpleNode(JJTIDORVALUE);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      switch ((jj_ntk==-1)?jj_ntk():jj_ntk) {
      case ID:
        jj_consume_token(ID);
        break;
      case NUM:
        jj_consume_token(NUM);
        break;
      default:
        jj_la1[4] = jj_gen;
        jj_consume_token(-1);
        throw new ParseException();
      }
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra que verifica uma funcao for
*/
  static final public void For() throws ParseException {
 /*@bgen(jjtree) FOR */
  SimpleNode jjtn000 = new SimpleNode(JJTFOR);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      jj_consume_token(FOR);
      jj_consume_token(APARENTESES);
      InputFor();
      jj_consume_token(FPARENTESES);
      jj_consume_token(ACHAVES);
      Comandos();
      jj_consume_token(FCHAVES);
    } catch (Throwable jjte000) {
      if (jjtc000) {
        jjtree.clearNodeScope(jjtn000);
        jjtc000 = false;
      } else {
        jjtree.popNode();
      }
      if (jjte000 instanceof RuntimeException) {
        {if (true) throw (RuntimeException)jjte000;}
      }
      if (jjte000 instanceof ParseException) {
        {if (true) throw (ParseException)jjte000;}
      }
      {if (true) throw (Error)jjte000;}
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra que verifica a estrutura de parametros de um for
*/
  static final public void InputFor() throws ParseException {
 /*@bgen(jjtree) PARAMETERSFOR */
  SimpleNode jjtn000 = new SimpleNode(JJTPARAMETERSFOR);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      InitiateFor();
      jj_consume_token(PVIRGULA);
      EndFor();
      jj_consume_token(PVIRGULA);
      Id();
      IterateFor();
    } catch (Throwable jjte000) {
      if (jjtc000) {
        jjtree.clearNodeScope(jjtn000);
        jjtc000 = false;
      } else {
        jjtree.popNode();
      }
      if (jjte000 instanceof RuntimeException) {
        {if (true) throw (RuntimeException)jjte000;}
      }
      if (jjte000 instanceof ParseException) {
        {if (true) throw (ParseException)jjte000;}
      }
      {if (true) throw (Error)jjte000;}
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra que verifica os parametros de iniciacao de um for
*/
  static final public void InitiateFor() throws ParseException {
 /*@bgen(jjtree) INITIATEFOR */
  SimpleNode jjtn000 = new SimpleNode(JJTINITIATEFOR);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      switch ((jj_ntk==-1)?jj_ntk():jj_ntk) {
      case INT:
      case FLOAT:
      case CHAR:
        Type();
        Id();
        Atribuicao();
        IdOrValue();
        break;
      default:
        jj_la1[5] = jj_gen;
        ;
      }
    } catch (Throwable jjte000) {
      if (jjtc000) {
        jjtree.clearNodeScope(jjtn000);
        jjtc000 = false;
      } else {
        jjtree.popNode();
      }
      if (jjte000 instanceof RuntimeException) {
        {if (true) throw (RuntimeException)jjte000;}
      }
      if (jjte000 instanceof ParseException) {
        {if (true) throw (ParseException)jjte000;}
      }
      {if (true) throw (Error)jjte000;}
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra que verifica os parametros de finalizacao de um for
*/
  static final public void EndFor() throws ParseException {
 /*@bgen(jjtree) ENDFOR */
  SimpleNode jjtn000 = new SimpleNode(JJTENDFOR);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      switch ((jj_ntk==-1)?jj_ntk():jj_ntk) {
      case ID:
        Id();
        Compare();
        IdOrValue();
        break;
      default:
        jj_la1[6] = jj_gen;
        ;
      }
    } catch (Throwable jjte000) {
      if (jjtc000) {
        jjtree.clearNodeScope(jjtn000);
        jjtc000 = false;
      } else {
        jjtree.popNode();
      }
      if (jjte000 instanceof RuntimeException) {
        {if (true) throw (RuntimeException)jjte000;}
      }
      if (jjte000 instanceof ParseException) {
        {if (true) throw (ParseException)jjte000;}
      }
      {if (true) throw (Error)jjte000;}
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra que verifica os parametros de iteracao de um for
*/
  static final public void IterateFor() throws ParseException {
 /*@bgen(jjtree) ITERATEFOR */
  SimpleNode jjtn000 = new SimpleNode(JJTITERATEFOR);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      switch ((jj_ntk==-1)?jj_ntk():jj_ntk) {
      case ATRIBUICAOSOMA:
      case ATRIBUICAOSUBTRACAO:
      case INC:
      case DEC:
        switch ((jj_ntk==-1)?jj_ntk():jj_ntk) {
        case ATRIBUICAOSOMA:
          jj_consume_token(ATRIBUICAOSOMA);
          IdOrValue();
          break;
        case ATRIBUICAOSUBTRACAO:
          jj_consume_token(ATRIBUICAOSUBTRACAO);
          IdOrValue();
          break;
        case INC:
          jj_consume_token(INC);
          break;
        case DEC:
          jj_consume_token(DEC);
          break;
        default:
          jj_la1[7] = jj_gen;
          jj_consume_token(-1);
          throw new ParseException();
        }
        break;
      default:
        jj_la1[8] = jj_gen;
        ;
      }
    } catch (Throwable jjte000) {
      if (jjtc000) {
        jjtree.clearNodeScope(jjtn000);
        jjtc000 = false;
      } else {
        jjtree.popNode();
      }
      if (jjte000 instanceof RuntimeException) {
        {if (true) throw (RuntimeException)jjte000;}
      }
      if (jjte000 instanceof ParseException) {
        {if (true) throw (ParseException)jjte000;}
      }
      {if (true) throw (Error)jjte000;}
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra que verifica a comparacao de dois numeros e/ou identificadores
*/
  static final public void CompareValue() throws ParseException {
 /*@bgen(jjtree) COMPAREVALUE */
  SimpleNode jjtn000 = new SimpleNode(JJTCOMPAREVALUE);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      IdOrValue();
      Compare();
      IdOrValue();
    } catch (Throwable jjte000) {
      if (jjtc000) {
        jjtree.clearNodeScope(jjtn000);
        jjtc000 = false;
      } else {
        jjtree.popNode();
      }
      if (jjte000 instanceof RuntimeException) {
        {if (true) throw (RuntimeException)jjte000;}
      }
      if (jjte000 instanceof ParseException) {
        {if (true) throw (ParseException)jjte000;}
      }
      {if (true) throw (Error)jjte000;}
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra que verifica a estrutura de um while
*/
  static final public void While() throws ParseException {
 /*@bgen(jjtree) WHILE */
  SimpleNode jjtn000 = new SimpleNode(JJTWHILE);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      jj_consume_token(WHILE);
      jj_consume_token(APARENTESES);
      CompareValue();
      jj_consume_token(FPARENTESES);
      jj_consume_token(ACHAVES);
      Comandos();
      jj_consume_token(FCHAVES);
    } catch (Throwable jjte000) {
      if (jjtc000) {
        jjtree.clearNodeScope(jjtn000);
        jjtc000 = false;
      } else {
        jjtree.popNode();
      }
      if (jjte000 instanceof RuntimeException) {
        {if (true) throw (RuntimeException)jjte000;}
      }
      if (jjte000 instanceof ParseException) {
        {if (true) throw (ParseException)jjte000;}
      }
      {if (true) throw (Error)jjte000;}
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra que verifica a estrutura de um if
 */
  static final public void If() throws ParseException {
 /*@bgen(jjtree) IF */
  SimpleNode jjtn000 = new SimpleNode(JJTIF);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      jj_consume_token(IF);
      jj_consume_token(APARENTESES);
      CompareValue();
      jj_consume_token(FPARENTESES);
      jj_consume_token(ACHAVES);
      Comandos();
      jj_consume_token(FCHAVES);
      Else();
    } catch (Throwable jjte000) {
      if (jjtc000) {
        jjtree.clearNodeScope(jjtn000);
        jjtc000 = false;
      } else {
        jjtree.popNode();
      }
      if (jjte000 instanceof RuntimeException) {
        {if (true) throw (RuntimeException)jjte000;}
      }
      if (jjte000 instanceof ParseException) {
        {if (true) throw (ParseException)jjte000;}
      }
      {if (true) throw (Error)jjte000;}
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra que verifica a estrutura de um else, podendo ou nao ser ausente em um if
*/
  static final public void Else() throws ParseException {
 /*@bgen(jjtree) ELSE */
  SimpleNode jjtn000 = new SimpleNode(JJTELSE);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      switch ((jj_ntk==-1)?jj_ntk():jj_ntk) {
      case ELSE:
        jj_consume_token(ELSE);
        jj_consume_token(ACHAVES);
        Comandos();
        jj_consume_token(FCHAVES);
        break;
      default:
        jj_la1[9] = jj_gen;
        ;
      }
    } catch (Throwable jjte000) {
      if (jjtc000) {
        jjtree.clearNodeScope(jjtn000);
        jjtc000 = false;
      } else {
        jjtree.popNode();
      }
      if (jjte000 instanceof RuntimeException) {
        {if (true) throw (RuntimeException)jjte000;}
      }
      if (jjte000 instanceof ParseException) {
        {if (true) throw (ParseException)jjte000;}
      }
      {if (true) throw (Error)jjte000;}
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra que verifica a estrutura de um print
 */
  static final public void Print() throws ParseException {
 /*@bgen(jjtree) PRINT */
  SimpleNode jjtn000 = new SimpleNode(JJTPRINT);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      jj_consume_token(PRINT);
      jj_consume_token(APARENTESES);
      Id();
      jj_consume_token(FPARENTESES);
      jj_consume_token(PVIRGULA);
    } catch (Throwable jjte000) {
      if (jjtc000) {
        jjtree.clearNodeScope(jjtn000);
        jjtc000 = false;
      } else {
        jjtree.popNode();
      }
      if (jjte000 instanceof RuntimeException) {
        {if (true) throw (RuntimeException)jjte000;}
      }
      if (jjte000 instanceof ParseException) {
        {if (true) throw (ParseException)jjte000;}
      }
      {if (true) throw (Error)jjte000;}
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra que verifica a estrutura de um return
*/
  static final public void Return() throws ParseException {
 /*@bgen(jjtree) RETURN */
  SimpleNode jjtn000 = new SimpleNode(JJTRETURN);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      jj_consume_token(RETURN);
      IdOrValue();
      jj_consume_token(PVIRGULA);
    } catch (Throwable jjte000) {
      if (jjtc000) {
        jjtree.clearNodeScope(jjtn000);
        jjtc000 = false;
      } else {
        jjtree.popNode();
      }
      if (jjte000 instanceof RuntimeException) {
        {if (true) throw (RuntimeException)jjte000;}
      }
      if (jjte000 instanceof ParseException) {
        {if (true) throw (ParseException)jjte000;}
      }
      {if (true) throw (Error)jjte000;}
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra que verifica uma operacao de soma
*/
  static final public void Soma() throws ParseException {
 /*@bgen(jjtree) SOMA */
  SimpleNode jjtn000 = new SimpleNode(JJTSOMA);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      jj_consume_token(SOMA);
      IdOrValue();
      OperacaoRecursiva();
    } catch (Throwable jjte000) {
      if (jjtc000) {
        jjtree.clearNodeScope(jjtn000);
        jjtc000 = false;
      } else {
        jjtree.popNode();
      }
      if (jjte000 instanceof RuntimeException) {
        {if (true) throw (RuntimeException)jjte000;}
      }
      if (jjte000 instanceof ParseException) {
        {if (true) throw (ParseException)jjte000;}
      }
      {if (true) throw (Error)jjte000;}
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra que verifica uma operacao de subtracao
*/
  static final public void Subtracao() throws ParseException {
 /*@bgen(jjtree) SUBTRACAO */
  SimpleNode jjtn000 = new SimpleNode(JJTSUBTRACAO);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      jj_consume_token(SUBTRACAO);
      IdOrValue();
      OperacaoRecursiva();
    } catch (Throwable jjte000) {
      if (jjtc000) {
        jjtree.clearNodeScope(jjtn000);
        jjtc000 = false;
      } else {
        jjtree.popNode();
      }
      if (jjte000 instanceof RuntimeException) {
        {if (true) throw (RuntimeException)jjte000;}
      }
      if (jjte000 instanceof ParseException) {
        {if (true) throw (ParseException)jjte000;}
      }
      {if (true) throw (Error)jjte000;}
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra que verifica uma operacao de multiplicacao
*/
  static final public void Multiplicacao() throws ParseException {
 /*@bgen(jjtree) MULTIPLICACAO */
  SimpleNode jjtn000 = new SimpleNode(JJTMULTIPLICACAO);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      jj_consume_token(MULTIPLICACAO);
      IdOrValue();
      OperacaoRecursiva();
    } catch (Throwable jjte000) {
      if (jjtc000) {
        jjtree.clearNodeScope(jjtn000);
        jjtc000 = false;
      } else {
        jjtree.popNode();
      }
      if (jjte000 instanceof RuntimeException) {
        {if (true) throw (RuntimeException)jjte000;}
      }
      if (jjte000 instanceof ParseException) {
        {if (true) throw (ParseException)jjte000;}
      }
      {if (true) throw (Error)jjte000;}
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra que verifica uma operacao de divisao
*/
  static final public void Divisao() throws ParseException {
 /*@bgen(jjtree) DIVISAO */
  SimpleNode jjtn000 = new SimpleNode(JJTDIVISAO);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      jj_consume_token(DIVISAO);
      IdOrValue();
      OperacaoRecursiva();
    } catch (Throwable jjte000) {
      if (jjtc000) {
        jjtree.clearNodeScope(jjtn000);
        jjtc000 = false;
      } else {
        jjtree.popNode();
      }
      if (jjte000 instanceof RuntimeException) {
        {if (true) throw (RuntimeException)jjte000;}
      }
      if (jjte000 instanceof ParseException) {
        {if (true) throw (ParseException)jjte000;}
      }
      {if (true) throw (Error)jjte000;}
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra para verificar operacoes recursivamente
*/
  static final public void OperacaoRecursiva() throws ParseException {
 /*@bgen(jjtree) OPERACAORECURSIVA */
  SimpleNode jjtn000 = new SimpleNode(JJTOPERACAORECURSIVA);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      switch ((jj_ntk==-1)?jj_ntk():jj_ntk) {
      case SOMA:
      case SUBTRACAO:
      case DIVISAO:
      case MULTIPLICACAO:
        switch ((jj_ntk==-1)?jj_ntk():jj_ntk) {
        case DIVISAO:
          Divisao();
          break;
        case SOMA:
          Soma();
          break;
        case SUBTRACAO:
          Subtracao();
          break;
        case MULTIPLICACAO:
          Multiplicacao();
          break;
        default:
          jj_la1[10] = jj_gen;
          jj_consume_token(-1);
          throw new ParseException();
        }
        break;
      default:
        jj_la1[11] = jj_gen;
        ;
      }
    } catch (Throwable jjte000) {
      if (jjtc000) {
        jjtree.clearNodeScope(jjtn000);
        jjtc000 = false;
      } else {
        jjtree.popNode();
      }
      if (jjte000 instanceof RuntimeException) {
        {if (true) throw (RuntimeException)jjte000;}
      }
      if (jjte000 instanceof ParseException) {
        {if (true) throw (ParseException)jjte000;}
      }
      {if (true) throw (Error)jjte000;}
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra que verifica a estrutura de uma operacao
*/
  static final public void Operacao() throws ParseException {
 /*@bgen(jjtree) OPERACAO */
  SimpleNode jjtn000 = new SimpleNode(JJTOPERACAO);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      Id();
      Atribuicao();
      IdOrValue();
      switch ((jj_ntk==-1)?jj_ntk():jj_ntk) {
      case SOMA:
      case SUBTRACAO:
      case DIVISAO:
      case MULTIPLICACAO:
        switch ((jj_ntk==-1)?jj_ntk():jj_ntk) {
        case SOMA:
          Soma();
          break;
        case SUBTRACAO:
          Subtracao();
          break;
        case DIVISAO:
          Divisao();
          break;
        case MULTIPLICACAO:
          Multiplicacao();
          break;
        default:
          jj_la1[12] = jj_gen;
          jj_consume_token(-1);
          throw new ParseException();
        }
        break;
      default:
        jj_la1[13] = jj_gen;
        ;
      }
      jj_consume_token(PVIRGULA);
    } catch (Throwable jjte000) {
      if (jjtc000) {
        jjtree.clearNodeScope(jjtn000);
        jjtc000 = false;
      } else {
        jjtree.popNode();
      }
      if (jjte000 instanceof RuntimeException) {
        {if (true) throw (RuntimeException)jjte000;}
      }
      if (jjte000 instanceof ParseException) {
        {if (true) throw (ParseException)jjte000;}
      }
      {if (true) throw (Error)jjte000;}
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra auxiliar para verificar um ID *Somente para efeito de visualizacao na arvore sintatica*
*/
  static final public void Id() throws ParseException {
 /*@bgen(jjtree) ID */
  SimpleNode jjtn000 = new SimpleNode(JJTID);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      jj_consume_token(ID);
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

/*
    Regra auxiliar para verificar uma atribuicao *Somente para efeito de visualizacao na arvore sintatica*
*/
  static final public void Atribuicao() throws ParseException {
 /*@bgen(jjtree) TOKENATRIBUICAO */
  SimpleNode jjtn000 = new SimpleNode(JJTTOKENATRIBUICAO);
  boolean jjtc000 = true;
  jjtree.openNodeScope(jjtn000);
    try {
      jj_consume_token(ATRIBUICAO);
    } finally {
      if (jjtc000) {
        jjtree.closeNodeScope(jjtn000, true);
      }
    }
  }

  static private boolean jj_initialized_once = false;
  /** Generated Token Manager. */
  static public LPTokenManager token_source;
  static SimpleCharStream jj_input_stream;
  /** Current token. */
  static public Token token;
  /** Next token. */
  static public Token jj_nt;
  static private int jj_ntk;
  static private int jj_gen;
  static final private int[] jj_la1 = new int[14];
  static private int[] jj_la1_0;
  static private int[] jj_la1_1;
  static {
      jj_la1_init_0();
      jj_la1_init_1();
   }
   private static void jj_la1_init_0() {
      jj_la1_0 = new int[] {0xf8000000,0x3800,0x1e03800,0x1e03800,0x0,0x3800,0x0,0x0,0x0,0x2000000,0xf0000,0xf0000,0xf0000,0xf0000,};
   }
   private static void jj_la1_init_1() {
      jj_la1_1 = new int[] {0x1,0x0,0x40,0x40,0xc0,0x0,0x40,0x3c,0x3c,0x0,0x0,0x0,0x0,0x0,};
   }

  /** Constructor with InputStream. */
  public LP(java.io.InputStream stream) {
     this(stream, null);
  }
  /** Constructor with InputStream and supplied encoding */
  public LP(java.io.InputStream stream, String encoding) {
    if (jj_initialized_once) {
      System.out.println("ERROR: Second call to constructor of static parser.  ");
      System.out.println("       You must either use ReInit() or set the JavaCC option STATIC to false");
      System.out.println("       during parser generation.");
      throw new Error();
    }
    jj_initialized_once = true;
    try { jj_input_stream = new SimpleCharStream(stream, encoding, 1, 1); } catch(java.io.UnsupportedEncodingException e) { throw new RuntimeException(e); }
    token_source = new LPTokenManager(jj_input_stream);
    token = new Token();
    jj_ntk = -1;
    jj_gen = 0;
    for (int i = 0; i < 14; i++) jj_la1[i] = -1;
  }

  /** Reinitialise. */
  static public void ReInit(java.io.InputStream stream) {
     ReInit(stream, null);
  }
  /** Reinitialise. */
  static public void ReInit(java.io.InputStream stream, String encoding) {
    try { jj_input_stream.ReInit(stream, encoding, 1, 1); } catch(java.io.UnsupportedEncodingException e) { throw new RuntimeException(e); }
    token_source.ReInit(jj_input_stream);
    token = new Token();
    jj_ntk = -1;
    jjtree.reset();
    jj_gen = 0;
    for (int i = 0; i < 14; i++) jj_la1[i] = -1;
  }

  /** Constructor. */
  public LP(java.io.Reader stream) {
    if (jj_initialized_once) {
      System.out.println("ERROR: Second call to constructor of static parser. ");
      System.out.println("       You must either use ReInit() or set the JavaCC option STATIC to false");
      System.out.println("       during parser generation.");
      throw new Error();
    }
    jj_initialized_once = true;
    jj_input_stream = new SimpleCharStream(stream, 1, 1);
    token_source = new LPTokenManager(jj_input_stream);
    token = new Token();
    jj_ntk = -1;
    jj_gen = 0;
    for (int i = 0; i < 14; i++) jj_la1[i] = -1;
  }

  /** Reinitialise. */
  static public void ReInit(java.io.Reader stream) {
    jj_input_stream.ReInit(stream, 1, 1);
    token_source.ReInit(jj_input_stream);
    token = new Token();
    jj_ntk = -1;
    jjtree.reset();
    jj_gen = 0;
    for (int i = 0; i < 14; i++) jj_la1[i] = -1;
  }

  /** Constructor with generated Token Manager. */
  public LP(LPTokenManager tm) {
    if (jj_initialized_once) {
      System.out.println("ERROR: Second call to constructor of static parser. ");
      System.out.println("       You must either use ReInit() or set the JavaCC option STATIC to false");
      System.out.println("       during parser generation.");
      throw new Error();
    }
    jj_initialized_once = true;
    token_source = tm;
    token = new Token();
    jj_ntk = -1;
    jj_gen = 0;
    for (int i = 0; i < 14; i++) jj_la1[i] = -1;
  }

  /** Reinitialise. */
  public void ReInit(LPTokenManager tm) {
    token_source = tm;
    token = new Token();
    jj_ntk = -1;
    jjtree.reset();
    jj_gen = 0;
    for (int i = 0; i < 14; i++) jj_la1[i] = -1;
  }

  static private Token jj_consume_token(int kind) throws ParseException {
    Token oldToken;
    if ((oldToken = token).next != null) token = token.next;
    else token = token.next = token_source.getNextToken();
    jj_ntk = -1;
    if (token.kind == kind) {
      jj_gen++;
      return token;
    }
    token = oldToken;
    jj_kind = kind;
    throw generateParseException();
  }


/** Get the next Token. */
  static final public Token getNextToken() {
    if (token.next != null) token = token.next;
    else token = token.next = token_source.getNextToken();
    jj_ntk = -1;
    jj_gen++;
    return token;
  }

/** Get the specific Token. */
  static final public Token getToken(int index) {
    Token t = token;
    for (int i = 0; i < index; i++) {
      if (t.next != null) t = t.next;
      else t = t.next = token_source.getNextToken();
    }
    return t;
  }

  static private int jj_ntk() {
    if ((jj_nt=token.next) == null)
      return (jj_ntk = (token.next=token_source.getNextToken()).kind);
    else
      return (jj_ntk = jj_nt.kind);
  }

  static private java.util.List<int[]> jj_expentries = new java.util.ArrayList<int[]>();
  static private int[] jj_expentry;
  static private int jj_kind = -1;

  /** Generate ParseException. */
  static public ParseException generateParseException() {
    jj_expentries.clear();
    boolean[] la1tokens = new boolean[40];
    if (jj_kind >= 0) {
      la1tokens[jj_kind] = true;
      jj_kind = -1;
    }
    for (int i = 0; i < 14; i++) {
      if (jj_la1[i] == jj_gen) {
        for (int j = 0; j < 32; j++) {
          if ((jj_la1_0[i] & (1<<j)) != 0) {
            la1tokens[j] = true;
          }
          if ((jj_la1_1[i] & (1<<j)) != 0) {
            la1tokens[32+j] = true;
          }
        }
      }
    }
    for (int i = 0; i < 40; i++) {
      if (la1tokens[i]) {
        jj_expentry = new int[1];
        jj_expentry[0] = i;
        jj_expentries.add(jj_expentry);
      }
    }
    int[][] exptokseq = new int[jj_expentries.size()][];
    for (int i = 0; i < jj_expentries.size(); i++) {
      exptokseq[i] = jj_expentries.get(i);
    }
    return new ParseException(token, exptokseq, tokenImage);
  }

  /** Enable tracing. */
  static final public void enable_tracing() {
  }

  /** Disable tracing. */
  static final public void disable_tracing() {
  }

}
