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
import lt.techin.exam.service.ViewSubItemService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/")
public class ViewSubItemController {
	
	@Autowired
	private ViewSubItemService viewSubItemService;
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping("viewItems/{viewItemId}/viewSubItems")
	public ResponseEntity<List<EmployeeDto>> getViewSubItems(
			@PathVariable(value = "viewItemId") Long viewItemId){
		return new ResponseEntity<>(viewSubItemService.getViewSubItems(viewItemId), HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping("viewItems/{viewItemId}/viewSubItems/{id}")
	public ResponseEntity<EmployeeDto> getViewSubItemById(
			@PathVariable(value = "viewItemId") Long viewItemId, 
			@PathVariable(value = "id") Long id){
		return new ResponseEntity<>(viewSubItemService.getViewSubItemById(viewItemId, id), HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@PostMapping("viewItems/{viewItemId}/viewSubItems")
	public ResponseEntity<HttpStatus> createViewSubItem(
			@PathVariable(value = "viewItemId") Long viewItemId, 
			@RequestBody EmployeeDto viewSubItemDto){
		viewSubItemService.createViewSubItem(viewItemId, viewSubItemDto);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@PatchMapping("viewItems/{viewItemId}/viewSubItems/{id}")
	public ResponseEntity<HttpStatus> updateViewSubItem(
			@PathVariable(value = "viewItemId") Long viewItemId, 
			@PathVariable(value = "id") Long id, 
			@RequestBody EmployeeDto viewSubItemDto){
		viewSubItemService.updateViewSubItem(viewItemId, id, viewSubItemDto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@DeleteMapping("viewItems/{viewItemId}/viewSubItems/{id}")
	public ResponseEntity<HttpStatus> deleteViewSubItem(
			@PathVariable(value = "viewItemId") Long viewItemId, 
			@PathVariable(value = "id") Long id){
		viewSubItemService.deleteViewSubItem(viewItemId, id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
