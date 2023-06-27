package lt.techin.exam.controller;

import static lt.techin.exam.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import lt.techin.exam.dto.EmployeeDto;
import lt.techin.exam.service.EmployeeService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/")
public class EmployeeController {
	
	@Autowired
	private EmployeeService employeeService;
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping("autoServices/{autoServiceId}/employees")
	public ResponseEntity<List<EmployeeDto>> getEmployees(
			@PathVariable(value = "autoServiceId") Long autoServiceId){
		return new ResponseEntity<>(employeeService.getEmployees(autoServiceId), HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping("autoServices/{autoServiceId}/employees/{id}")
	public ResponseEntity<EmployeeDto> getEmployeeById(
			@PathVariable(value = "autoServiceId") Long autoServiceId, 
			@PathVariable(value = "id") Long id){
		return new ResponseEntity<>(employeeService.getEmployeeById(autoServiceId, id), HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@PostMapping("autoServices/{autoServiceId}/employees")
	public ResponseEntity<HttpStatus> createEmployee(
			@PathVariable(value = "autoServiceId") Long autoServiceId, 
			@RequestBody EmployeeDto employeeDto){
		employeeService.createEmployee(autoServiceId, employeeDto);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@PatchMapping("autoServices/{autoServiceId}/employees/{id}")
	public ResponseEntity<HttpStatus> updateEmployee(
			@PathVariable(value = "autoServiceId") Long autoServiceId, 
			@PathVariable(value = "id") Long id, 
			@RequestBody EmployeeDto employeeDto){
		employeeService.updateEmployee(autoServiceId, id, employeeDto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@DeleteMapping("autoServices/{autoServiceId}/employees/{id}")
	public ResponseEntity<HttpStatus> deleteEmployee(
			@PathVariable(value = "autoServiceId") Long autoServiceId, 
			@PathVariable(value = "id") Long id){
		employeeService.deleteEmployee(autoServiceId, id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
