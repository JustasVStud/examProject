package lt.techin.exam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import lt.techin.exam.entity.PostItem;

public interface PostItemRepository extends JpaRepository<PostItem, Long>{
	
	@Query("SELECT pi FROM PostItem pi WHERE pi.user.id = :userId")
	List<PostItem> findPostItems(@Param("userId") Long userId);
}
