package lt.techin.exam.controller;

import static lt.techin.exam.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lt.techin.exam.dto.EmployeeRatingDto;
import lt.techin.exam.security.CustomUserDetails;
import lt.techin.exam.service.EmployeeRatingService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/employeeRatings")
public class EmployeeRatingController {
	
	@Autowired
	private EmployeeRatingService employeeRatingService;
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping
	public ResponseEntity<List<EmployeeRatingDto>> getEmployeeRatings(@AuthenticationPrincipal CustomUserDetails currentUser){
		Long userId = currentUser.getId();
		return new ResponseEntity<>(employeeRatingService.getEmployeeRatings(userId), HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping("/{id}")
	public ResponseEntity<EmployeeRatingDto> getEmployeeRatingById(@AuthenticationPrincipal CustomUserDetails currentUser, @PathVariable Long id){
		Long userId = currentUser.getId();
		return new ResponseEntity<>(employeeRatingService.getEmployeeRatingById(id, userId), HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@PostMapping()
	public ResponseEntity<HttpStatus> createEmployeeRating(@AuthenticationPrincipal CustomUserDetails currentUser, @RequestBody EmployeeRatingDto employeeRatingDto){
		Long userId = currentUser.getId();
		employeeRatingService.createEmployeeRating(userId, employeeRatingDto);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@PatchMapping("/{id}")
	public ResponseEntity<HttpStatus> updateEmployeeRating(@AuthenticationPrincipal CustomUserDetails currentUser, @PathVariable Long id, @RequestBody EmployeeRatingDto employeeRatingDto){
		Long userId = currentUser.getId();
		employeeRatingService.updateEmployeeRating(id, userId,employeeRatingDto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteEmployeeRating(@AuthenticationPrincipal CustomUserDetails currentUser, @PathVariable Long id){
		Long userId = currentUser.getId();
		employeeRatingService.deleteEmployeeRating(id, userId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
