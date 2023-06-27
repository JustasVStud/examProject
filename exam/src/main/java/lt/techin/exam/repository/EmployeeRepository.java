package lt.techin.exam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.techin.exam.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	
	List<Employee> findAllByAutoServiceId(Long autoServiceId);
}
