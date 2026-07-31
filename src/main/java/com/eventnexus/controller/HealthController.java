package com.eventnexus.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Simple health check endpoint for keep-alive pings.
 * Used by external cron services (e.g., cron-job.org) to prevent
 * Render free tier from spinning down due to inactivity.
 */
@RestController
public class HealthController {

    @GetMapping("/api/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "EventNexus"));
    }
}
