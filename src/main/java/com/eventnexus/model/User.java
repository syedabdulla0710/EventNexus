package com.eventnexus.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Represents a registered user in the system.
 * Supports two roles: USER (can book events) and ORGANIZER (can create events).
 */
@Entity
@Table(name = "users")
public class User {
    @Id
    private String username;
    private String password;
    private String role;

    public User() {
        this.role = "USER";
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.role = "USER";
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
