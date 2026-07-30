package com.eventnexus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class EventNexusApplication {
    public static void main(String[] args) {
        // Force the JVM timezone to UTC to avoid conflicts with PostgreSQL's valid timezones
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
        SpringApplication.run(EventNexusApplication.class, args);
    }
}
