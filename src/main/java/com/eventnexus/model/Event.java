package com.eventnexus.model;

import jakarta.persistence.*;
import java.util.*;

/**
 * Core domain model representing a bookable event.
 * 
 * Concurrency is now handled by JPA pessimistic locking at the repository/service layer
 * rather than synchronized methods.
 */
@Entity
@Table(name = "events")
public class Event {
    @Id
    private String eventId;
    private String name;
    private String date;
    private String location;
    private int totalSeats;
    private int availableSeats;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "event_bookings", joinColumns = @JoinColumn(name = "event_id"))
    @MapKeyColumn(name = "seat_number")
    @Column(name = "username")
    private Map<Integer, String> bookings;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "event_id")
    @OrderBy("id ASC")
    private List<WaitlistEntry> waitlist;

    public Event() {
        this.bookings = new HashMap<>();
        this.waitlist = new ArrayList<>();
    }

    public Event(String eventId, String name, String date, String location, int totalSeats) {
        this.eventId = eventId;
        this.name = name;
        this.date = date;
        this.location = location;
        this.totalSeats = totalSeats;
        this.availableSeats = totalSeats;
        this.bookings = new HashMap<>();
        this.waitlist = new ArrayList<>();
    }

    public boolean bookSeats(String username, int seats) {
        if (seats <= 0) {
            throw new IllegalArgumentException("Seat count must be positive");
        }
        if (seats > availableSeats) {
            waitlist.add(new WaitlistEntry(username, seats));
            return false;
        }

        for (int i = 0; i < seats; i++) {
            int seatNumber = totalSeats - availableSeats + 1;
            bookings.put(seatNumber, username);
            availableSeats--;
        }
        return true;
    }

    public boolean cancelSeats(String username, int seats) {
        if (seats <= 0) {
            throw new IllegalArgumentException("Seat count must be positive");
        }

        int cancelledSeats = 0;
        List<Integer> seatsToRemove = new ArrayList<>();

        for (Map.Entry<Integer, String> entry : bookings.entrySet()) {
            if (entry.getValue().equals(username)) {
                seatsToRemove.add(entry.getKey());
                cancelledSeats++;
                if (cancelledSeats == seats) break;
            }
        }

        if (cancelledSeats < seats) {
            return false;
        }

        for (int seatNumber : seatsToRemove) {
            bookings.remove(seatNumber);
            availableSeats++;
        }

        allocateSeatsFromWaitlist();
        return true;
    }

    private void allocateSeatsFromWaitlist() {
        Iterator<WaitlistEntry> iterator = waitlist.iterator();
        while (iterator.hasNext() && availableSeats > 0) {
            WaitlistEntry entry = iterator.next();
            if (entry.getRequestedSeats() <= availableSeats) {
                for (int i = 0; i < entry.getRequestedSeats(); i++) {
                    int seatNumber = totalSeats - availableSeats + 1;
                    bookings.put(seatNumber, entry.getUsername());
                    availableSeats--;
                }
                iterator.remove();
            } else {
                break;
            }
        }
    }

    // --- Getters and Setters ---

    public String getEventId() { return eventId; }
    public void setEventId(String eventId) { this.eventId = eventId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public int getTotalSeats() { return totalSeats; }
    public void setTotalSeats(int totalSeats) { this.totalSeats = totalSeats; }

    public int getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(int availableSeats) { this.availableSeats = availableSeats; }

    public Map<Integer, String> getBookings() {
        return bookings;
    }

    public void setBookings(Map<Integer, String> bookings) {
        this.bookings = bookings;
    }

    public List<WaitlistEntry> getWaitlist() {
        return waitlist;
    }

    public void setWaitlist(List<WaitlistEntry> waitlist) {
        this.waitlist = waitlist;
    }
}
