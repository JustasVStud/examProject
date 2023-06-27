package lt.techin.exam.runner;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;
import lt.techin.exam.entity.User;
import lt.techin.exam.repository.UserRepository;
import lt.techin.exam.security.WebSecurityConfig;

@Slf4j
@Component
public class DatabaseInitializer implements CommandLineRunner {
	
	@Autowired
    private UserRepository userRepository;
	
	@Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        USERS.forEach(user -> {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
        });
    	
        log.info("Database initialized");
    }

    private static final List<User> USERS = Arrays.asList(
            new User("admin", "admin", "admin@mycompany.com", WebSecurityConfig.ADMIN),
            new User("user", "user", "user@mycompany.com", WebSecurityConfig.USER)
    );
}

