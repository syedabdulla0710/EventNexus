package com.eventnexus.dto;

public class BookingResponse {
    private boolean success;
    private String message;
    private int remainingSeats;

    public BookingResponse() {}

    public BookingResponse(boolean success, String message, int remainingSeats) {
        this.success = success;
        this.message = message;
        this.remainingSeats = remainingSeats;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public int getRemainingSeats() { return remainingSeats; }
    public void setRemainingSeats(int remainingSeats) { this.remainingSeats = remainingSeats; }
}
