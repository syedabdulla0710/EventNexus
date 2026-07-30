package com.eventnexus.model;

import jakarta.persistence.*;

/**
 * Represents a user's waitlist request when an event is fully booked.
 * Stored in a FIFO Queue to ensure fair ordering.
 */
@Entity
@Table(name = "waitlist_entries")
public class WaitlistEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private int requestedSeats;

    public WaitlistEntry() {}

    public WaitlistEntry(String username, int requestedSeats) {
        this.username = username;
        this.requestedSeats = requestedSeats;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getRequestedSeats() {
        return requestedSeats;
    }

    public void setRequestedSeats(int requestedSeats) {
        this.requestedSeats = requestedSeats;
    }
}
