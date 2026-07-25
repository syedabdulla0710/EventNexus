package com.eventnexus.service;

import com.eventnexus.dto.AuthResponse;
import com.eventnexus.model.User;
import com.eventnexus.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Service layer for user authentication and management.
 * Implements Spring Security's UserDetailsService for integration
 * with the security filter chain.
 */
@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Set<String> loggedInUsers = ConcurrentHashMap.newKeySet();

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse registerUser(String username, String password, String role) {
        if (userRepository.existsByUsername(username)) {
            return new AuthResponse(false, "Username already exists", null, null);
        }
        User user = new User(username, passwordEncoder.encode(password));
        user.setRole(role);
        userRepository.save(user);
        return new AuthResponse(true, "Registration successful", username, role);
    }

    public AuthResponse loginUser(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .map(user -> {
                    loggedInUsers.add(username);
                    return new AuthResponse(true, "Login successful", username, user.getRole());
                })
                .orElse(new AuthResponse(false, "Invalid username or password", null, null));
    }

    public void logoutUser(String username) {
        loggedInUsers.remove(username);
    }

    public boolean isLoggedIn(String username) {
        return loggedInUsers.contains(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
        );
    }
}
