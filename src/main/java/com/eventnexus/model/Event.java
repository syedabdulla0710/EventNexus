package com.eventnexus.model;

import java.util.*;
import java.util.concurrent.ConcurrentLinkedQueue;

/**
 * Core domain model representing a bookable event.
 * 
 * Data Structures Used:
 * - TreeMap<Integer, String>: Ordered seat map (seat number → username). 
 *   TreeMap ensures O(log n) seat assignment and maintains sorted seat order.
 * - ConcurrentLinkedQueue<WaitlistEntry>: Thread-safe FIFO waitlist queue.
 *   When seats become available via cancellation, waitlisted users are
 *   automatically promoted in first-come-first-served order.
 * 
 * Concurrency: All booking/cancellation operations are synchronized to prevent
 * race conditions (e.g., two users booking the last seat simultaneously).
 */
public class Event {
    private String eventId;
    private String name;
    private String date;
    private String location;
    private int totalSeats;
    private int availableSeats;
    private final TreeMap<Integer, String> bookings;
    private final Queue<WaitlistEntry> waitlist;

    public Event() {
        this.bookings = new TreeMap<>();
        this.waitlist = new ConcurrentLinkedQueue<>();
    }

    public Event(String eventId, String name, String date, String location, int totalSeats) {
        this.eventId = eventId;
        this.name = name;
        this.date = date;
        this.location = location;
        this.totalSeats = totalSeats;
        this.availableSeats = totalSeats;
        this.bookings = new TreeMap<>();
        this.waitlist = new ConcurrentLinkedQueue<>();
    }

    /**
     * Books the requested number of seats for a user.
     * Uses synchronized to prevent race conditions during concurrent bookings.
     * If insufficient seats, the user is added to the waitlist queue.
     *
     * @param username the user requesting seats
     * @param seats    number of seats to book
     * @return true if booking succeeded, false if added to waitlist
     */
    public synchronized boolean bookSeats(String username, int seats) {
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

    /**
     * Cancels the specified number of seats for a user.
     * After cancellation, automatically promotes waitlisted users if seats open up.
     *
     * @param username the user cancelling seats
     * @param seats    number of seats to cancel
     * @return true if cancellation succeeded
     */
    public synchronized boolean cancelSeats(String username, int seats) {
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

    /**
     * Promotes waitlisted users when seats become available.
     * Processes the waitlist in FIFO order — the user who joined
     * the waitlist first gets priority.
     */
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
        return Collections.unmodifiableMap(bookings);
    }

    public Queue<WaitlistEntry> getWaitlist() {
        return new ConcurrentLinkedQueue<>(waitlist);
    }
}
