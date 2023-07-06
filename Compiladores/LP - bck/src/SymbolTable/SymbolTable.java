package SymbolTable;

import java.util.ArrayList;

public class Symtable {

	private ArrayList<InsertTable> table;
	private int pos;

	public int getPos() {
		return pos;
	}

	public void setPos(int pos) {
		this.pos = pos;
	}

	public Symtable() {
		table = new ArrayList<InsertTable>();
		pos = 0;
	}
	
	public ArrayList<InsertTable> getTable() {
		return table;
	}

	public void setTable(ArrayList<InsertTable> table) {
		this.table = table;
	}
	
	public void add(InsertTable novaEntry) {
		
		table.add(novaEntry);
		pos++;
	}
	
	public void retira() {
		table.remove(pos-1);
		pos--;
	}

	public int find(String nome, String escopo) {
		
		for(InsertTable a: table) {
			
			if(a.getCadeia().equals(nome) && a.getEscopo().equals(escopo)) {
				return 1;
			}
		}
		
		return 0;
	}
	
	public int find(String nome) {
		
		for(InsertTable a: table) {
			
			if(a.getCadeia().equals(nome)) {
				return 1;
			}
		}
		
		return 0;
	}

	public String getType(String nome) {
		
		for(InsertTable a: table) {
			if(a.getCadeia().equals(nome))
				return a.getTipo();
		}
		
		return "None";
	}
	
	public String toString() {
		String print = "pos = " + pos;
		
		for(InsertTable ind: table) {
			print += "\n[";
			print += ind.toString();
			print += "]";
		}
		
		return print;
	}

	public String getType(int pos2) {
		return table.get(pos2).getTipo();
	}

	public String getValor(String image) {
		
		for(InsertTable a: table) {
			if(a.getCadeia().equals(image)) {
				return a.getValor();
			}
		}
		
		return "None";
	}

	public void atualizaValor(String string, String valor) {
		
		for(int i = 0; i < table.size(); i++) {
			if(table.get(i).getCadeia().equals(string)) {
				InsertTable troca = table.get(i);
				troca.setValor(valor);
				table.set(i, troca);
			}
		}
	}
}
