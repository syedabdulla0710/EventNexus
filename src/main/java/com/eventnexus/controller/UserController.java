package com.eventnexus.controller;

import com.eventnexus.dto.AuthResponse;
import com.eventnexus.dto.UserRequest;
import com.eventnexus.model.Event;
import com.eventnexus.service.EventService;
import com.eventnexus.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for user authentication and profile endpoints.
 * Handles registration, login, logout, and booked event retrieval.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final EventService eventService;

    public UserController(UserService userService, EventService eventService) {
        this.userService = userService;
        this.eventService = eventService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerUser(@Valid @RequestBody UserRequest request) {
        AuthResponse response = userService.registerUser(request.getUsername(), request.getPassword(), "USER");
        HttpStatus status = response.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT;
        return ResponseEntity.status(status).body(response);
    }

    @PostMapping("/register-organizer")
    public ResponseEntity<AuthResponse> registerOrganizer(@Valid @RequestBody UserRequest request) {
        AuthResponse response = userService.registerUser(request.getUsername(), request.getPassword(), "ORGANIZER");
        HttpStatus status = response.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT;
        return ResponseEntity.status(status).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@Valid @RequestBody UserRequest request) {
        AuthResponse response = userService.loginUser(request.getUsername(), request.getPassword());
        HttpStatus status = response.isSuccess() ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
        return ResponseEntity.status(status).body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logoutUser(@RequestBody UserRequest request) {
        userService.logoutUser(request.getUsername());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{username}/bookings")
    public ResponseEntity<List<Event>> getBookedEvents(@PathVariable String username) {
        return ResponseEntity.ok(eventService.getBookedEventsByUser(username));
    }
}
