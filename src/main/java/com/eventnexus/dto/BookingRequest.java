package com.eventnexus.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class BookingRequest {
    @NotBlank(message = "Username is required")
    private String username;

    @Min(value = 1, message = "At least 1 seat must be booked")
    private int seats;

    public BookingRequest() {}

    public BookingRequest(String username, int seats) {
        this.username = username;
        this.seats = seats;
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public int getSeats() { return seats; }
    public void setSeats(int seats) { this.seats = seats; }
}
