package lt.techin.exam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import lt.techin.exam.entity.EmployeeRating;

public interface EmployeeRatingRepository extends JpaRepository<EmployeeRating, Long>{
	
	@Query("SELECT er FROM EmployeeRating er WHERE er.user.id = :userId")
	List<EmployeeRating> findEmployeeRating(@Param("userId") Long userId);
}
