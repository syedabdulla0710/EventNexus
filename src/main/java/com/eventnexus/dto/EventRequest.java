package com.eventnexus.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class EventRequest {
    private String eventId;

    @NotBlank(message = "Event name is required")
    private String name;

    @NotBlank(message = "Date is required")
    private String date;

    @NotBlank(message = "Location is required")
    private String location;

    @Min(value = 1, message = "Total seats must be at least 1")
    private int totalSeats;

    public EventRequest() {}

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
}
