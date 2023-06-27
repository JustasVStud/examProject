package lt.techin.exam.repository;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import lt.techin.exam.entity.EmployeeRating;

public interface EmployeeRatingRepository extends JpaRepository<EmployeeRating, Long>{
	
	@Query("SELECT SUM(er.rating) FROM EmployeeRating er " +
	           "WHERE er.employee.id = :employeeId ")
	    Optional<BigDecimal> getEmployeeRatings(@Param("employeeId") Long employeeId);
}
