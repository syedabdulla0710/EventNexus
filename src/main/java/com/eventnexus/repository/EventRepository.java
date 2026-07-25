package com.eventnexus.repository;

import com.eventnexus.model.Event;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * In-memory repository for Event entities.
 * Uses ConcurrentHashMap for thread-safe read/write operations,
 * enabling safe concurrent access without external synchronization.
 */
@Repository
public class EventRepository {
    private final ConcurrentHashMap<String, Event> events = new ConcurrentHashMap<>();

    public Event save(Event event) {
        events.put(event.getEventId(), event);
        return event;
    }

    public Optional<Event> findById(String eventId) {
        return Optional.ofNullable(events.get(eventId));
    }

    public Collection<Event> findAll() {
        return events.values();
    }

    public List<Event> findByBookedUser(String username) {
        return events.values().stream()
                .filter(event -> event.getBookings().containsValue(username))
                .collect(Collectors.toList());
    }

    public boolean existsById(String eventId) {
        return events.containsKey(eventId);
    }

    public void deleteById(String eventId) {
        events.remove(eventId);
    }
}
