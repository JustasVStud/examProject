package lt.techin.exam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.techin.exam.entity.PostSubItem;

public interface PostSubItemRepository extends JpaRepository<PostSubItem, Long> {
	List<PostSubItem> findAllByPostItemId(Long postItemId);
}
