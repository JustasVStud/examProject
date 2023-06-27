package lt.techin.exam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lt.techin.exam.dto.AuthResponse;
import lt.techin.exam.dto.LoginDto;
import lt.techin.exam.dto.RegistrationDto;
import lt.techin.exam.security.TokenProvider;
import lt.techin.exam.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
    private UserService userService;
	@Autowired
    private AuthenticationManager authenticationManager;
	@Autowired
    private TokenProvider tokenProvider;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginDto loginDto) {
        String token = authenticateAndGetToken(loginDto.getUsername(), loginDto.getPassword());
        return new AuthResponse(token);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegistrationDto registrationDto) {

        userService.createUser(registrationDto);

        String token = authenticateAndGetToken(registrationDto.getUsername(), registrationDto.getPassword());
        return new AuthResponse(token);
    }

    private String authenticateAndGetToken(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        return tokenProvider.generate(authentication);
    }
}