package com.eventnexus.service;

import com.eventnexus.dto.BookingResponse;
import com.eventnexus.exception.ResourceNotFoundException;
import com.eventnexus.model.Event;
import com.eventnexus.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

/**
 * Service layer for event management operations.
 * Handles event creation, retrieval, seat booking, and cancellation.
 */
@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event getEvent(String eventId) {
        return eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));
    }

    public Collection<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getBookedEventsByUser(String username) {
        return eventRepository.findByBookedUser(username);
    }

    public BookingResponse bookSeats(String eventId, String username, int seats) {
        Event event = getEvent(eventId);
        boolean success = event.bookSeats(username, seats);
        if (success) {
            return new BookingResponse(true, "Successfully booked " + seats + " seat(s)", event.getAvailableSeats());
        } else {
            return new BookingResponse(false, "Insufficient seats. Added to waitlist.", event.getAvailableSeats());
        }
    }

    public BookingResponse cancelSeats(String eventId, String username, int seats) {
        Event event = getEvent(eventId);
        boolean success = event.cancelSeats(username, seats);
        if (success) {
            return new BookingResponse(true, "Successfully cancelled " + seats + " seat(s)", event.getAvailableSeats());
        } else {
            return new BookingResponse(false, "Cancellation failed. User does not have enough booked seats.", event.getAvailableSeats());
        }
    }
}
