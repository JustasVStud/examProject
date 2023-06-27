package lt.techin.exam.exception;

public class NoEntries extends RuntimeException{
	
	private static final long serialVersionUID = 1L;
	
	public NoEntries(String table) {
		super(String.format("No entries found in table %s", table));
	}
}

