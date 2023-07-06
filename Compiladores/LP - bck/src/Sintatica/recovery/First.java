package Sintatica.recovery;

import javacc.LPConstants;

//implementa os conjuntos first para alguns n�o-terminais
public class First {
	static public final RecoverySet varlist = new RecoverySet();
	static public final RecoverySet functlist = new RecoverySet();
	static public final RecoverySet functbody = new RecoverySet();
	static public final RecoverySet program = functlist;
	
	/**
	 * Adiciona os terminais da rela�ao primeiro no conjunto de sincroniza��o
	 */
	static {
		varlist.add(new Integer(LPConstants.VOID));
		varlist.add(new Integer(LPConstants.INT));
		varlist.add(new Integer(LPConstants.CHAR));
		
		functlist.add(new Integer(LPConstants.VOID));
		functlist.add(new Integer(LPConstants.INT));
		functlist.add(new Integer(LPConstants.CHAR));
		functlist.add(new Integer(LPConstants.IDENT));
		
		functbody.addAll(varlist);
		functbody.add(new Integer(LPConstants.IF));
		functbody.add(new Integer(LPConstants.SWITCH));
		functbody.add(new Integer(LPConstants.FOR));
		functbody.add(new Integer(LPConstants.WHILE));
		functbody.add(new Integer(LPConstants.IDENT));
		functbody.add(new Integer(LPConstants.BREAK));
		functbody.add(new Integer(LPConstants.RETURN));
	}

}
