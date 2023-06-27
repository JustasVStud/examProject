package lt.techin.exam.service;

import java.util.List;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.techin.exam.dto.AutoServiceDto;
import lt.techin.exam.entity.AutoService;
import lt.techin.exam.exception.NoEntries;
import lt.techin.exam.exception.NotFound;
import lt.techin.exam.repository.AutoServiceRepository;

@Service
public class ViewItemService {
	
	@Autowired
	private AutoServiceRepository viewItemRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	public List<AutoServiceDto> getViewItems() {
		List<AutoService> autoServices = viewItemRepository.findAll();
		if (autoServices.isEmpty()) {
			throw new NoEntries("viewItems");
		}
		return autoServices.stream().map(viewItem -> modelMapper.map(viewItem, AutoServiceDto.class)).toList();
	}
	 
	public AutoServiceDto getViewItemById(Long id) {
		AutoService autoService =  viewItemRepository.findById(id).orElseThrow(() -> new NotFound("viewItem", "id", id.toString()));
		return modelMapper.map(autoService, AutoServiceDto.class);
	}
	
	public void createViewItem(AutoServiceDto viewItemDto) { 
		AutoService autoService = modelMapper.map(viewItemDto, AutoService.class);
		viewItemRepository.save(autoService);
	}
	
	public void updateViewItem(Long id, AutoServiceDto updatedViewItemDto) {
		AutoService existingViewItem = viewItemRepository.findById(id).orElseThrow(() -> new NotFound("viewItem", "id", id.toString()));
		existingViewItem.setTitle(updatedViewItemDto.getTitle());
		viewItemRepository.save(existingViewItem);
	}
	
	public void deleteViewItem(Long id) {
		AutoService autoService =  viewItemRepository.findById(id).orElseThrow(() -> new NotFound("viewItem", "id", id.toString()));
		viewItemRepository.delete(autoService);
	}
}