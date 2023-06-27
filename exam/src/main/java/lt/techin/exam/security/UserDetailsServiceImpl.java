package lt.techin.exam.security;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lt.techin.exam.entity.User;
import lt.techin.exam.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;
    
	
	@Override
	public UserDetails loadUserByUsername(String username){
		User user = userRepository.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("username not found"));
		List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(user.getRole()));
		return mapUserToCustomUserDetails(user, authorities);
	}
	
	private CustomUserDetails mapUserToCustomUserDetails(User user, List<SimpleGrantedAuthority> authorities) {
		CustomUserDetails customUserDetails = new CustomUserDetails();
		customUserDetails.setId(user.getId());
		customUserDetails.setUsername(user.getUsername());
		customUserDetails.setPassword(user.getPassword());
		customUserDetails.setEmail(user.getEmail());
		customUserDetails.setAuthorities(authorities);
		return customUserDetails;
		
	}

}