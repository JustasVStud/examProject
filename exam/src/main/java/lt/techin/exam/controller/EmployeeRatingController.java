package lt.techin.exam.controller;

import static lt.techin.exam.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
	@GetMapping("/{employeeId}")
	public ResponseEntity<BigDecimal> getEmployeeRatings(@AuthenticationPrincipal CustomUserDetails currentUser,
			@PathVariable(value = "employeeId") Long employeeId ){
		return new ResponseEntity<>(employeeRatingService.getEmployeeRatings(employeeId), HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@PostMapping()
	public ResponseEntity<HttpStatus> createEmployeeRating(@AuthenticationPrincipal CustomUserDetails currentUser, @RequestBody EmployeeRatingDto employeeRatingDto){
		employeeRatingService.createEmployeeRating(employeeRatingDto);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
}
