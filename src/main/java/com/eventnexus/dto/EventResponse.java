package com.eventnexus.dto;

import com.eventnexus.model.WaitlistEntry;

import java.util.Map;
import java.util.Queue;

public class EventResponse {
    private String eventId;
    private String name;
    private String date;
    private String location;
    private int totalSeats;
    private int availableSeats;
    private Map<Integer, String> bookings;
    private Queue<WaitlistEntry> waitlist;

    public EventResponse() {}

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

    public Map<Integer, String> getBookings() { return bookings; }
    public void setBookings(Map<Integer, String> bookings) { this.bookings = bookings; }

    public Queue<WaitlistEntry> getWaitlist() { return waitlist; }
    public void setWaitlist(Queue<WaitlistEntry> waitlist) { this.waitlist = waitlist; }
}
