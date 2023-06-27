package lt.techin.exam.exception;

public class NotFound extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	public NotFound(String entity, String paramType, String param) {
		super(String.format("%s with %s: %s was not found", entity, paramType, param));
	}
}
