package com.eventnexus.controller;

import com.eventnexus.dto.BookingRequest;
import com.eventnexus.dto.BookingResponse;
import com.eventnexus.model.Event;
import com.eventnexus.service.EventService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/**
 * REST controller for event management endpoints.
 * Provides CRUD operations and seat booking/cancellation.
 */
@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<Collection<Event>> listEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @PostMapping
    public ResponseEntity<Event> createEvent(@Valid @RequestBody Event event) {
        Event created = eventService.createEvent(event);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<Event> getEvent(@PathVariable String eventId) {
        return ResponseEntity.ok(eventService.getEvent(eventId));
    }

    @PostMapping("/{eventId}/book")
    public ResponseEntity<BookingResponse> bookSeats(
            @PathVariable String eventId,
            @Valid @RequestBody BookingRequest request) {
        BookingResponse response = eventService.bookSeats(eventId, request.getUsername(), request.getSeats());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{eventId}/cancel")
    public ResponseEntity<BookingResponse> cancelSeats(
            @PathVariable String eventId,
            @Valid @RequestBody BookingRequest request) {
        BookingResponse response = eventService.cancelSeats(eventId, request.getUsername(), request.getSeats());
        return ResponseEntity.ok(response);
    }
}
