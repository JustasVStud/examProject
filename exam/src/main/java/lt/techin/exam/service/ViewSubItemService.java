package lt.techin.exam.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.techin.exam.dto.ViewSubItemDto;
import lt.techin.exam.entity.ViewItem;
import lt.techin.exam.entity.ViewSubItem;
import lt.techin.exam.exception.EntityMismatch;
import lt.techin.exam.exception.NoEntries;
import lt.techin.exam.exception.NotFound;
import lt.techin.exam.repository.ViewItemRepository;
import lt.techin.exam.repository.ViewSubItemRepository;

@Service
public class ViewSubItemService {
	
	@Autowired
	private ViewSubItemRepository viewSubItemRepository;
	@Autowired
	private ViewItemRepository viewItemRepository;
	@Autowired
	private ModelMapper modelMapper;
	
	public List<ViewSubItemDto> getViewSubItems(Long viewItemId){
		List<ViewSubItem> viewSubItems = viewSubItemRepository.findAllByViewItemId(viewItemId);
		if(viewSubItems.isEmpty()) {
			throw new NoEntries("viewSubItems");
		}
		return viewSubItems.stream().map(viewSubItem -> modelMapper.map(viewSubItem, ViewSubItemDto.class)).toList();
	}
	
	public ViewSubItemDto getViewSubItemById(Long viewItemId, Long id) {
		ViewItem viewItem = viewItemRepository.findById(viewItemId).orElseThrow(() -> new NotFound("viewItem", "id", viewItemId.toString()));
		ViewSubItem viewSubItem = viewSubItemRepository.findById(id).orElseThrow(() -> new NotFound("viewSubItem", "id", id.toString()));
		if(!viewSubItem.getViewItem().getId().equals(viewItem.getId())) {
			throw new EntityMismatch("viewSubItem", id.toString(), "viewItem", viewItemId.toString());
		}
		return modelMapper.map(viewSubItem, ViewSubItemDto.class);
	}
	
	public void createViewSubItem(Long viewItemId, ViewSubItemDto viewSubItemDto) {
		ViewItem viewItem = viewItemRepository.findById(viewItemId).orElseThrow(() -> new NotFound("viewItem", "id", viewItemId.toString()));
		ViewSubItem viewSubItem = modelMapper.map(viewSubItemDto, ViewSubItem.class);
		viewSubItem.setViewItem(viewItem);
		viewSubItemRepository.save(viewSubItem);
	}
	
	public void updateViewSubItem(Long viewItemId, Long id, ViewSubItemDto updatedViewSubItemDto) {
		ViewItem viewItem = viewItemRepository.findById(viewItemId).orElseThrow(() -> new NotFound("viewItem", "id", viewItemId.toString()));
		ViewSubItem existingViewSubItem = viewSubItemRepository.findById(id).orElseThrow(() -> new NotFound("viewSubItem", "id", id.toString()));
		if(!existingViewSubItem.getViewItem().getId().equals(viewItem.getId())) {
			throw new EntityMismatch("viewSubItem", id.toString(), "viewItem", viewItemId.toString());
		}
		existingViewSubItem.setTitle(updatedViewSubItemDto.getTitle());
		viewSubItemRepository.save(existingViewSubItem);
	}
	
	public void deleteViewSubItem(Long viewItemId, Long id) {
		ViewItem viewItem = viewItemRepository.findById(viewItemId).orElseThrow(() -> new NotFound("viewItem", "id", viewItemId.toString()));
		ViewSubItem viewSubItem = viewSubItemRepository.findById(id).orElseThrow(() -> new NotFound("viewSubItem", "id", id.toString()));
		if(!viewSubItem.getViewItem().getId().equals(viewItem.getId())) {
			throw new EntityMismatch("viewSubItem", id.toString(), "viewItem", viewItemId.toString());
		}
		viewSubItemRepository.delete(viewSubItem);
	}
	
}
