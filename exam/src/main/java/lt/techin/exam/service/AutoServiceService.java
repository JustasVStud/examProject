package lt.techin.exam.service;

import java.util.List;
import java.util.Objects;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.techin.exam.dto.AutoServiceDto;
import lt.techin.exam.entity.AutoService;
import lt.techin.exam.entity.Employee;
import lt.techin.exam.exception.NoEntries;
import lt.techin.exam.exception.NotFound;
import lt.techin.exam.repository.AutoServiceRepository;
import lt.techin.exam.repository.EmployeeRepository;

@Service
public class AutoServiceService {
	
	@Autowired
	private AutoServiceRepository autoServiceRepository;
	@Autowired
	private EmployeeRepository employeeRepository;
	@Autowired
	private ModelMapper modelMapper;
	
	public List<AutoServiceDto> getAutoServices() {
		List<AutoService> autoServices = autoServiceRepository.findAll();
		if (autoServices.isEmpty()) {
			throw new NoEntries("autoServices");
		}
		return autoServices.stream().map(autoService -> modelMapper.map(autoService, AutoServiceDto.class)).toList();
	}
	 
	public AutoServiceDto getAutoServiceById(Long id) {
		AutoService autoService =  autoServiceRepository.findById(id).orElseThrow(() -> new NotFound("autoService", "id", id.toString()));
		return modelMapper.map(autoService, AutoServiceDto.class);
	}
	
	public void createAutoService(AutoServiceDto autoServiceDto) { 
		System.out.println(autoServiceDto);
		AutoService autoService = modelMapper.map(autoServiceDto, AutoService.class);
		if(autoServiceDto.getDirectorId() != null) {			
			Employee director = employeeRepository.findById(autoServiceDto.getDirectorId()).orElseThrow(() -> new NotFound("director from employees", "id", autoServiceDto.getDirectorId().toString()));
			autoService.setDirector(director);
		}
		autoServiceRepository.save(autoService);
	}
	
	public void updateAutoService(Long id, AutoServiceDto updatedAutoServiceDto) {
		AutoService existingAutoService = autoServiceRepository.findById(id).orElseThrow(() -> new NotFound("autoService", "id", id.toString()));
		existingAutoService.setTitle(updatedAutoServiceDto.getTitle());
		existingAutoService.setAddress(updatedAutoServiceDto.getAddress());
		if(!Objects.equals(existingAutoService.getDirector().getId(), updatedAutoServiceDto.getDirectorId())) {
			Employee director = employeeRepository.findById(updatedAutoServiceDto.getDirectorId()).orElseThrow(() -> new NotFound("director from employees", "id", updatedAutoServiceDto.getDirectorId().toString()));
			existingAutoService.setDirector(director);
		}
		autoServiceRepository.save(existingAutoService);
	}
	
	public void deleteAutoService(Long id) {
		AutoService autoService =  autoServiceRepository.findById(id).orElseThrow(() -> new NotFound("autoService", "id", id.toString()));
		autoServiceRepository.delete(autoService);
	}
}