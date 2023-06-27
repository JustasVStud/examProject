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
public class EmployeeRatingService {
	
	@Autowired
	private EmployeeRatingRepository employeeRatingRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ModelMapper modelMapper;
	
	public List<EmployeeRatingDto> getEmployeeRatings(Long userId) {
		List<EmployeeRating> employeeRatings = employeeRatingRepository.findEmployeeRatings(userId);
		if (employeeRatings.isEmpty()) {
			throw new NoEntries("employeeRatings");
		}
		return employeeRatings.stream().map(employeeRating -> modelMapper.map(employeeRating, EmployeeRatingDto.class)).toList();
	}
	 
	public EmployeeRatingDto getEmployeeRatingById(Long id, Long userId) {
		EmployeeRating employeeRating =  employeeRatingRepository.findById(id).orElseThrow(() -> new NotFound("employeeRating", "id", id.toString()));
		if(!employeeRating.getUser().getId().equals(userId)) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid user");
		}
		return modelMapper.map(employeeRating, EmployeeRatingDto.class);
	}
	
	public void createEmployeeRating(Long userId, EmployeeRatingDto employeeRatingDto) { 
		EmployeeRating employeeRating = modelMapper.map(employeeRatingDto, EmployeeRating.class);
		User user = userRepository.findById(userId).orElseThrow(() -> new NotFound("user", "id", userId.toString()));
		employeeRating.setUser(user);
		employeeRatingRepository.save(employeeRating);
	}
	
	public void updateEmployeeRating(Long id, Long userId, EmployeeRatingDto updatedEmployeeRatingDto) {
		EmployeeRating existingEmployeeRating = employeeRatingRepository.findById(id).orElseThrow(() -> new NotFound("employeeRating", "id", id.toString()));
		if(!existingEmployeeRating.getUser().getId().equals(userId)) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid user");
		}
		//existingEmployeeRating.setTitle(updatedEmployeeRatingDto.getTitle());
		employeeRatingRepository.save(existingEmployeeRating);
	}
	
	public void deleteEmployeeRating(Long id, Long userId) {
		EmployeeRating employeeRating =  employeeRatingRepository.findById(id).orElseThrow(() -> new NotFound("employeeRating", "id", id.toString()));
		if(!employeeRating.getUser().getId().equals(userId)) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid user");
		}
		employeeRatingRepository.delete(employeeRating);
	}
}