package lt.techin.exam.service;

import java.math.BigDecimal;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.techin.exam.dto.EmployeeRatingDto;
import lt.techin.exam.entity.Employee;
import lt.techin.exam.entity.EmployeeRating;

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
	 
	
	public void createEmployeeRating(EmployeeRatingDto employeeRatingDto) { 
		EmployeeRating employeeRating = modelMapper.map(employeeRatingDto, EmployeeRating.class);
		Employee employee = employeeRepository.findById(employeeRatingDto.getEmployeeId()).orElseThrow(() -> new NotFound("employee", "id", employeeRatingDto.getEmployeeId().toString()));
		employeeRating.setEmployee(employee);
		employeeRatingRepository.save(employeeRating);
	}
	

}