package lt.techin.exam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.techin.exam.entity.ViewSubItem;

public interface ViewSubItemRepository extends JpaRepository<ViewSubItem, Long> {
	
	List<ViewSubItem> findAllByViewItemId(Long viewItemId);
}
