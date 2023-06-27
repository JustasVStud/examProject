package lt.techin.exam.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lt.techin.exam.dto.EmployeeRatingDto;
import lt.techin.exam.entity.EmployeeRating;
import lt.techin.exam.entity.User;
import lt.techin.exam.exception.NoEntries;
import lt.techin.exam.exception.NotFound;
import lt.techin.exam.repository.EmployeeRatingRepository;
import lt.techin.exam.repository.UserRepository;

@Service
public class PostItemService {
	
	@Autowired
	private EmployeeRatingRepository employeeRatingRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ModelMapper modelMapper;
	
	public List<EmployeeRatingDto> getPostItems(Long userId) {
		List<EmployeeRating> employeeRatings = employeeRatingRepository.findPostItems(userId);
		if (employeeRatings.isEmpty()) {
			throw new NoEntries("postItems");
		}
		return employeeRatings.stream().map(postItem -> modelMapper.map(postItem, EmployeeRatingDto.class)).toList();
	}
	 
	public EmployeeRatingDto getPostItemById(Long id, Long userId) {
		EmployeeRating employeeRating =  employeeRatingRepository.findById(id).orElseThrow(() -> new NotFound("postItem", "id", id.toString()));
		if(!employeeRating.getUser().getId().equals(userId)) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid user");
		}
		return modelMapper.map(employeeRating, EmployeeRatingDto.class);
	}
	
	public void createPostItem(Long userId, EmployeeRatingDto postItemDto) { 
		EmployeeRating employeeRating = modelMapper.map(postItemDto, EmployeeRating.class);
		User user = userRepository.findById(userId).orElseThrow(() -> new NotFound("user", "id", userId.toString()));
		employeeRating.setUser(user);
		employeeRatingRepository.save(employeeRating);
	}
	
	public void updatePostItem(Long id, Long userId, EmployeeRatingDto updatedPostItemDto) {
		EmployeeRating existingPostItem = employeeRatingRepository.findById(id).orElseThrow(() -> new NotFound("postItem", "id", id.toString()));
		if(!existingPostItem.getUser().getId().equals(userId)) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid user");
		}
		existingPostItem.setTitle(updatedPostItemDto.getTitle());
		employeeRatingRepository.save(existingPostItem);
	}
	
	public void deletePostItem(Long id, Long userId) {
		EmployeeRating employeeRating =  employeeRatingRepository.findById(id).orElseThrow(() -> new NotFound("postItem", "id", id.toString()));
		if(!employeeRating.getUser().getId().equals(userId)) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid user");
		}
		employeeRatingRepository.delete(employeeRating);
	}
}