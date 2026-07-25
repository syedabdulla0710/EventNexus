package com.eventnexus.model;

/**
 * Represents a user's waitlist request when an event is fully booked.
 * Stored in a FIFO Queue to ensure fair ordering.
 */
public class WaitlistEntry {
    private final String username;
    private final int requestedSeats;

    public WaitlistEntry(String username, int requestedSeats) {
        this.username = username;
        this.requestedSeats = requestedSeats;
    }

    public String getUsername() {
        return username;
    }

    public int getRequestedSeats() {
        return requestedSeats;
    }
}
