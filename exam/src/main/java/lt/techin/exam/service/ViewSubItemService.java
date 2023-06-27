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
public class ViewSubItemService {
	
	@Autowired
	private EmployeeRepository viewSubItemRepository;
	@Autowired
	private AutoServiceRepository viewItemRepository;
	@Autowired
	private ModelMapper modelMapper;
	
	public List<EmployeeDto> getViewSubItems(Long viewItemId){
		List<Employee> employees = viewSubItemRepository.findAllByViewItemId(viewItemId);
		if(employees.isEmpty()) {
			throw new NoEntries("viewSubItems");
		}
		return employees.stream().map(viewSubItem -> modelMapper.map(viewSubItem, EmployeeDto.class)).toList();
	}
	
	public EmployeeDto getViewSubItemById(Long viewItemId, Long id) {
		AutoService autoService = viewItemRepository.findById(viewItemId).orElseThrow(() -> new NotFound("viewItem", "id", viewItemId.toString()));
		Employee employee = viewSubItemRepository.findById(id).orElseThrow(() -> new NotFound("viewSubItem", "id", id.toString()));
		if(!employee.getViewItem().getId().equals(autoService.getId())) {
			throw new EntityMismatch("viewSubItem", id.toString(), "viewItem", viewItemId.toString());
		}
		return modelMapper.map(employee, EmployeeDto.class);
	}
	
	public void createViewSubItem(Long viewItemId, EmployeeDto viewSubItemDto) {
		AutoService autoService = viewItemRepository.findById(viewItemId).orElseThrow(() -> new NotFound("viewItem", "id", viewItemId.toString()));
		Employee employee = modelMapper.map(viewSubItemDto, Employee.class);
		employee.setViewItem(autoService);
		viewSubItemRepository.save(employee);
	}
	
	public void updateViewSubItem(Long viewItemId, Long id, EmployeeDto updatedViewSubItemDto) {
		AutoService autoService = viewItemRepository.findById(viewItemId).orElseThrow(() -> new NotFound("viewItem", "id", viewItemId.toString()));
		Employee existingViewSubItem = viewSubItemRepository.findById(id).orElseThrow(() -> new NotFound("viewSubItem", "id", id.toString()));
		if(!existingViewSubItem.getViewItem().getId().equals(autoService.getId())) {
			throw new EntityMismatch("viewSubItem", id.toString(), "viewItem", viewItemId.toString());
		}
		existingViewSubItem.setTitle(updatedViewSubItemDto.getTitle());
		viewSubItemRepository.save(existingViewSubItem);
	}
	
	public void deleteViewSubItem(Long viewItemId, Long id) {
		AutoService autoService = viewItemRepository.findById(viewItemId).orElseThrow(() -> new NotFound("viewItem", "id", viewItemId.toString()));
		Employee employee = viewSubItemRepository.findById(id).orElseThrow(() -> new NotFound("viewSubItem", "id", id.toString()));
		if(!employee.getViewItem().getId().equals(autoService.getId())) {
			throw new EntityMismatch("viewSubItem", id.toString(), "viewItem", viewItemId.toString());
		}
		viewSubItemRepository.delete(employee);
	}
	
}
