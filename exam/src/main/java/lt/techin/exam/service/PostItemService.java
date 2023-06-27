package lt.techin.exam.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lt.techin.exam.dto.PostItemDto;
import lt.techin.exam.entity.PostItem;
import lt.techin.exam.entity.User;
import lt.techin.exam.exception.NoEntries;
import lt.techin.exam.exception.NotFound;
import lt.techin.exam.repository.PostItemRepository;
import lt.techin.exam.repository.UserRepository;

@Service
public class PostItemService {
	
	@Autowired
	private PostItemRepository postItemRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ModelMapper modelMapper;
	
	public List<PostItemDto> getPostItems(Long userId) {
		List<PostItem> postItems = postItemRepository.findPostItems(userId);
		if (postItems.isEmpty()) {
			throw new NoEntries("postItems");
		}
		return postItems.stream().map(postItem -> modelMapper.map(postItem, PostItemDto.class)).toList();
	}
	 
	public PostItemDto getPostItemById(Long id, Long userId) {
		PostItem postItem =  postItemRepository.findById(id).orElseThrow(() -> new NotFound("postItem", "id", id.toString()));
		if(!postItem.getUser().getId().equals(userId)) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid user");
		}
		return modelMapper.map(postItem, PostItemDto.class);
	}
	
	public void createPostItem(Long userId, PostItemDto postItemDto) { 
		PostItem postItem = modelMapper.map(postItemDto, PostItem.class);
		User user = userRepository.findById(userId).orElseThrow(() -> new NotFound("user", "id", userId.toString()));
		postItem.setUser(user);
		postItemRepository.save(postItem);
	}
	
	public void updatePostItem(Long id, Long userId, PostItemDto updatedPostItemDto) {
		PostItem existingPostItem = postItemRepository.findById(id).orElseThrow(() -> new NotFound("postItem", "id", id.toString()));
		if(!existingPostItem.getUser().getId().equals(userId)) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid user");
		}
		existingPostItem.setTitle(updatedPostItemDto.getTitle());
		postItemRepository.save(existingPostItem);
	}
	
	public void deletePostItem(Long id, Long userId) {
		PostItem postItem =  postItemRepository.findById(id).orElseThrow(() -> new NotFound("postItem", "id", id.toString()));
		if(!postItem.getUser().getId().equals(userId)) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid user");
		}
		postItemRepository.delete(postItem);
	}
}