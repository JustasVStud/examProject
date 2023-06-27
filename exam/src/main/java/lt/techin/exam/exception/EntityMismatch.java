package lt.techin.exam.exception;

public class EntityMismatch extends RuntimeException{
	
	private static final long serialVersionUID = 1L;
	
	public EntityMismatch(String entity, String id, String parent, String parentId) {
		super(String.format("%s with id: %s, does not belong to %s with id: %s", entity, id, parent, parentId));
	}
}
