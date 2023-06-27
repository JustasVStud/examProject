package lt.techin.exam.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.techin.exam.entity.User;

public interface UserRepository extends JpaRepository <User, Long>{
	
	Optional<User> findByUsername(String username);
}
