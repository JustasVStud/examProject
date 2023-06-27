package lt.techin.exam.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class CustomExceptionHandler {
	
	@ExceptionHandler(NotFound.class)
	public ResponseEntity<String> handleNotFound(NotFound ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
	
	@ExceptionHandler(NoEntries.class)
	public ResponseEntity<String> handleNoEntries(NoEntries ex) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
	}
	
	@ExceptionHandler(EntityMismatch.class)
	public ResponseEntity<String> handleEntityMismatch(EntityMismatch ex) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
	}
}