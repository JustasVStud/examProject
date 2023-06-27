package lt.techin.exam.service;

import java.util.List;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.techin.exam.dto.ViewItemDto;
import lt.techin.exam.entity.ViewItem;
import lt.techin.exam.exception.NoEntries;
import lt.techin.exam.exception.NotFound;
import lt.techin.exam.repository.ViewItemRepository;

@Service
public class ViewItemService {
	
	@Autowired
	private ViewItemRepository viewItemRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	public List<ViewItemDto> getViewItems() {
		List<ViewItem> viewItems = viewItemRepository.findAll();
		if (viewItems.isEmpty()) {
			throw new NoEntries("viewItems");
		}
		return viewItems.stream().map(viewItem -> modelMapper.map(viewItem, ViewItemDto.class)).toList();
	}
	 
	public ViewItemDto getViewItemById(Long id) {
		ViewItem viewItem =  viewItemRepository.findById(id).orElseThrow(() -> new NotFound("viewItem", "id", id.toString()));
		return modelMapper.map(viewItem, ViewItemDto.class);
	}
	
	public void createViewItem(ViewItemDto viewItemDto) { 
		ViewItem viewItem = modelMapper.map(viewItemDto, ViewItem.class);
		viewItemRepository.save(viewItem);
	}
	
	public void updateViewItem(Long id, ViewItemDto updatedViewItemDto) {
		ViewItem existingViewItem = viewItemRepository.findById(id).orElseThrow(() -> new NotFound("viewItem", "id", id.toString()));
		existingViewItem.setTitle(updatedViewItemDto.getTitle());
		viewItemRepository.save(existingViewItem);
	}
	
	public void deleteViewItem(Long id) {
		ViewItem viewItem =  viewItemRepository.findById(id).orElseThrow(() -> new NotFound("viewItem", "id", id.toString()));
		viewItemRepository.delete(viewItem);
	}
}