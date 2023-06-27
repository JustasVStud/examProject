package lt.techin.exam.service;

import java.math.BigDecimal;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.techin.exam.dto.EmployeeRatingDto;
import lt.techin.exam.dto.EmployeeRatingSumDto;
import lt.techin.exam.entity.Employee;
import lt.techin.exam.entity.EmployeeRating;
import lt.techin.exam.exception.NoEntries;
import lt.techin.exam.exception.NotFound;
import lt.techin.exam.repository.EmployeeRatingRepository;
import lt.techin.exam.repository.EmployeeRepository;

@Service
public class EmployeeRatingService {
	
	@Autowired
	private EmployeeRatingRepository employeeRatingRepository;
	@Autowired
	private EmployeeRepository employeeRepository;
	@Autowired
	private ModelMapper modelMapper;
	
	public BigDecimal getEmployeeRatings(Long employeeID) {
		BigDecimal employeeRatings = employeeRatingRepository.getEmployeeRatings(employeeID).orElse(BigDecimal.ZERO);
		return employeeRatings;
	}
	 
	
	public void createEmployeeRating(Long employeeId, EmployeeRatingDto employeeRatingDto) { 
		EmployeeRating employeeRating = modelMapper.map(employeeRatingDto, EmployeeRating.class);
		Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new NotFound("employee", "id", employeeId.toString()));
		employeeRating.setEmployee(employee);
		employeeRatingRepository.save(employeeRating);
	}
	

}