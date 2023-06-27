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
import lt.techin.exam.service.ViewItemService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/viewItems")
public class ViewItemController {
	
	@Autowired
	private ViewItemService viewItemService;
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping
	public ResponseEntity<List<AutoServiceDto>> getViewItems(@AuthenticationPrincipal CustomUserDetails currentUser){
		return new ResponseEntity<>(viewItemService.getViewItems(), HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping("/{id}")
	public ResponseEntity<AutoServiceDto> getViewItemById(@AuthenticationPrincipal CustomUserDetails currentUser, @PathVariable Long id){
		return new ResponseEntity<>(viewItemService.getViewItemById(id), HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@PostMapping()
	public ResponseEntity<HttpStatus> createViewItem(@AuthenticationPrincipal CustomUserDetails currentUser, @RequestBody AutoServiceDto viewItemDto){
		viewItemService.createViewItem(viewItemDto);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@PatchMapping("/{id}")
	public ResponseEntity<HttpStatus> updateViewItem(@AuthenticationPrincipal CustomUserDetails currentUser, @PathVariable Long id, @RequestBody AutoServiceDto viewItemDto){
		viewItemService.updateViewItem(id, viewItemDto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteViewItem(@AuthenticationPrincipal CustomUserDetails currentUser, @PathVariable Long id){
		viewItemService.deleteViewItem(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
