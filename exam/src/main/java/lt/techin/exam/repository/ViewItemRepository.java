package lt.techin.exam.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.techin.exam.entity.ViewItem;

public interface ViewItemRepository extends JpaRepository<ViewItem, Long>{

}
