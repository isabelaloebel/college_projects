package Tables;
import java.io.*;
import java.util.List;

public class SymbolTable {
	public String symbol;
	public String Tok;
	public String categoria;
	public String type;

	String getSymbol() {
		return symbol;
	}

	void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	String getTok() {
		return Tok;
	}

	void setTok(String Tok) {
		this.Tok = Tok;
	}

	String getCategoria() {
		return categoria;
	}

	void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	String getType() {
		return type;
	}

	void setType(String type) {
		this.type = type;
	}

	public SymbolTable(String symbol, String Tok, String categoria, String type) {
		this.symbol = symbol;
		this.Tok = Tok;
		this.categoria = categoria;
		this.type = type;
	}

}
