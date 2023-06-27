package lt.techin.exam.controller;

import static lt.techin.exam.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lt.techin.exam.dto.UserDto;
import lt.techin.exam.service.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping
	public ResponseEntity<List<UserDto>> getUsers(){
		return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping("/id/{id}")
	public ResponseEntity<UserDto> getUserById(@PathVariable Long id){
		return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping("/username/{username}")
	public ResponseEntity<UserDto> getUserByName(@PathVariable String username){
		return new ResponseEntity<>(userService.getUserByName(username), HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteUser(@PathVariable Long id){
		userService.deleteUser(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}