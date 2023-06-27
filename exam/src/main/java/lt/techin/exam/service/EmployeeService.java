package lt.techin.exam.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.techin.exam.dto.EmployeeDto;
import lt.techin.exam.entity.AutoService;
import lt.techin.exam.entity.Employee;
import lt.techin.exam.exception.EntityMismatch;
import lt.techin.exam.exception.NoEntries;
import lt.techin.exam.exception.NotFound;
import lt.techin.exam.repository.AutoServiceRepository;
import lt.techin.exam.repository.EmployeeRepository;

@Service
public class EmployeeService {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	@Autowired
	private AutoServiceRepository autoServiceRepository;
	@Autowired
	private ModelMapper modelMapper;
	
	public List<EmployeeDto> getEmployees(Long autoServiceId){
		List<Employee> employees = employeeRepository.findAllByAutoServiceId(autoServiceId);
		if(employees.isEmpty()) {
			throw new NoEntries("employees");
		}
		return employees.stream().map(employee -> modelMapper.map(employee, EmployeeDto.class)).toList();
	}
	
	public EmployeeDto getEmployeeById(Long id) {
		Employee employee = employeeRepository.findById(id).orElseThrow(() -> new NotFound("employee", "id", id.toString()));
		return modelMapper.map(employee, EmployeeDto.class);
	}
	public void createEmployee(EmployeeDto employeeDto) {
		AutoService autoService = autoServiceRepository.findById(employeeDto.getAutoServiceId()).orElseThrow(() -> new NotFound("autoService", "id", employeeDto.getAutoServiceId().toString()));
		Employee employee = modelMapper.map(employeeDto, Employee.class);
		employee.setAutoService(autoService);
		employeeRepository.save(employee);
	}
	
	public void updateEmployee(Long id, EmployeeDto updatedEmployeeDto) {
		AutoService autoService = autoServiceRepository.findById(updatedEmployeeDto.getAutoServiceId()).orElseThrow(() -> new NotFound("autoService", "id", updatedEmployeeDto.getAutoServiceId().toString()));
		Employee existingEmployee = employeeRepository.findById(id).orElseThrow(() -> new NotFound("employee", "id", id.toString()));
		existingEmployee.setName(updatedEmployeeDto.getName());
		existingEmployee.setSurname(updatedEmployeeDto.getSurname());
		existingEmployee.setSpecialty(updatedEmployeeDto.getSpecialty());
		existingEmployee.setCity(updatedEmployeeDto.getCity());
		if(!existingEmployee.getAutoService().getId().equals(autoService.getId())) {
			existingEmployee.setAutoService(autoService);
		}
		
		employeeRepository.save(existingEmployee);
	}
	
	public void deleteEmployee( Long id) {
		Employee employee = employeeRepository.findById(id).orElseThrow(() -> new NotFound("employee", "id", id.toString()));

		employeeRepository.delete(employee);
	}
	
}
