package lt.techin.exam.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.techin.exam.dto.PostSubItemDto;
import lt.techin.exam.entity.EmployeeRating;
import lt.techin.exam.entity.PostSubItem;
import lt.techin.exam.exception.EntityMismatch;
import lt.techin.exam.exception.NoEntries;
import lt.techin.exam.exception.NotFound;
import lt.techin.exam.repository.EmployeeRatingRepository;
import lt.techin.exam.repository.PostSubItemRepository;

@Service
public class PostSubItemService {
	
	@Autowired
	private PostSubItemRepository postSubItemRepository;
	@Autowired
	private EmployeeRatingRepository employeeRatingRepository;
	@Autowired
	private ModelMapper modelMapper;
	
	public List<PostSubItemDto> getPostSubItems(Long postItemId){
		List<PostSubItem> postSubItems = postSubItemRepository.findAllByPostItemId(postItemId);
		if(postSubItems.isEmpty()) {
			throw new NoEntries("postSubItems");
		}
		return postSubItems.stream().map(postSubItem -> modelMapper.map(postSubItem, PostSubItemDto.class)).toList();
	}
	
	public PostSubItemDto getPostSubItemById(Long postItemId, Long id) {
		EmployeeRating employeeRating = employeeRatingRepository.findById(postItemId).orElseThrow(() -> new NotFound("postItem", "id", postItemId.toString()));
		PostSubItem postSubItem = postSubItemRepository.findById(id).orElseThrow(() -> new NotFound("postSubItem", "id", id.toString()));
		if(!postSubItem.getPostItem().getId().equals(employeeRating.getId())) {
			throw new EntityMismatch("postSubItem", id.toString(), "postItem", postItemId.toString());
		}
		return modelMapper.map(postSubItem, PostSubItemDto.class);
	}
	
	public void createPostSubItem(Long postItemId, PostSubItemDto postSubItemDto) {
		EmployeeRating employeeRating = employeeRatingRepository.findById(postItemId).orElseThrow(() -> new NotFound("postItem", "id", postItemId.toString()));
		PostSubItem postSubItem = modelMapper.map(postSubItemDto, PostSubItem.class);
		postSubItem.setPostItem(employeeRating);
		postSubItemRepository.save(postSubItem);
	}
	
	public void updatePostSubItem(Long postItemId, Long id, PostSubItemDto updatedPostSubItemDto) {
		EmployeeRating employeeRating = employeeRatingRepository.findById(postItemId).orElseThrow(() -> new NotFound("postItem", "id", postItemId.toString()));
		PostSubItem existingPostSubItem = postSubItemRepository.findById(id).orElseThrow(() -> new NotFound("postSubItem", "id", id.toString()));
		if(!existingPostSubItem.getPostItem().getId().equals(employeeRating.getId())) {
			throw new EntityMismatch("postSubItem", id.toString(), "postItem", postItemId.toString());
		}
		existingPostSubItem.setTitle(updatedPostSubItemDto.getTitle());
		postSubItemRepository.save(existingPostSubItem);
	}
	
	public void deletePostSubItem(Long postItemId, Long id) {
		EmployeeRating employeeRating = employeeRatingRepository.findById(postItemId).orElseThrow(() -> new NotFound("postItem", "id", postItemId.toString()));
		PostSubItem postSubItem = postSubItemRepository.findById(id).orElseThrow(() -> new NotFound("postSubItem", "id", id.toString()));
		if(!postSubItem.getPostItem().getId().equals(employeeRating.getId())) {
			throw new EntityMismatch("postSubItem", id.toString(), "postItem", postItemId.toString());
		}
		postSubItemRepository.delete(postSubItem);
	}
	
}
