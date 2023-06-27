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
import lt.techin.exam.dto.AutoServiceDto;
import lt.techin.exam.security.CustomUserDetails;
import lt.techin.exam.service.AutoServiceService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/autoServices")
public class AutoServiceController {
	
	@Autowired
	private AutoServiceService autoServiceService;
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping
	public ResponseEntity<List<AutoServiceDto>> getAutoServices(@AuthenticationPrincipal CustomUserDetails currentUser){
		return new ResponseEntity<>(autoServiceService.getAutoServices(), HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping("/{id}")
	public ResponseEntity<AutoServiceDto> getAutoServiceById(@AuthenticationPrincipal CustomUserDetails currentUser, @PathVariable Long id){
		return new ResponseEntity<>(autoServiceService.getAutoServiceById(id), HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@PostMapping()
	public ResponseEntity<HttpStatus> createAutoService(@AuthenticationPrincipal CustomUserDetails currentUser, @RequestBody AutoServiceDto autoServiceDto){
		autoServiceService.createAutoService(autoServiceDto);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@PatchMapping("/{id}")
	public ResponseEntity<HttpStatus> updateAutoService(@AuthenticationPrincipal CustomUserDetails currentUser, @PathVariable Long id, @RequestBody AutoServiceDto autoServiceDto){
		autoServiceService.updateAutoService(id, autoServiceDto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteAutoService(@AuthenticationPrincipal CustomUserDetails currentUser, @PathVariable Long id){
		autoServiceService.deleteAutoService(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
