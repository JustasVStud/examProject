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
import lt.techin.exam.dto.PostSubItemDto;
import lt.techin.exam.service.PostSubItemService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/")
public class PostSubItemController {
	
	@Autowired
	private PostSubItemService postSubItemService;
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping("postItems/{postItemId}/postSubItems")
	public ResponseEntity<List<PostSubItemDto>> getPostSubItems(
			@PathVariable(value = "postItemId") Long postItemId){
		return new ResponseEntity<>(postSubItemService.getPostSubItems(postItemId), HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping("postItems/{postItemId}/postSubItems/{id}")
	public ResponseEntity<PostSubItemDto> getPostSubItemById(
			@PathVariable(value = "postItemId") Long postItemId, 
			@PathVariable(value = "id") Long id){
		return new ResponseEntity<>(postSubItemService.getPostSubItemById(postItemId, id), HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@PostMapping("postItems/{postItemId}/postSubItems")
	public ResponseEntity<HttpStatus> createPostSubItem(
			@PathVariable(value = "postItemId") Long postItemId, 
			@RequestBody PostSubItemDto postSubItemDto){
		postSubItemService.createPostSubItem(postItemId, postSubItemDto);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@PatchMapping("postItems/{postItemId}/postSubItems/{id}")
	public ResponseEntity<HttpStatus> updatePostSubItem(
			@PathVariable(value = "postItemId") Long postItemId, 
			@PathVariable(value = "id") Long id, 
			@RequestBody PostSubItemDto postSubItemDto){
		postSubItemService.updatePostSubItem(postItemId, id, postSubItemDto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@DeleteMapping("postItems/{postItemId}/postSubItems/{id}")
	public ResponseEntity<HttpStatus> deletePostSubItem(
			@PathVariable(value = "postItemId") Long postItemId, 
			@PathVariable(value = "id") Long id){
		postSubItemService.deletePostSubItem(postItemId, id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
