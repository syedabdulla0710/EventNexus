package com.eventnexus.repository;

import com.eventnexus.model.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 * In-memory repository for User entities.
 * Uses ConcurrentHashMap for thread-safe concurrent access.
 */
@Repository
public class UserRepository {
    private final ConcurrentHashMap<String, User> users = new ConcurrentHashMap<>();

    public User save(User user) {
        users.put(user.getUsername(), user);
        return user;
    }

    public Optional<User> findByUsername(String username) {
        return Optional.ofNullable(users.get(username));
    }

    public boolean existsByUsername(String username) {
        return users.containsKey(username);
    }
}
