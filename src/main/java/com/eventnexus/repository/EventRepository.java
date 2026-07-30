package com.eventnexus.repository;

import com.eventnexus.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import jakarta.persistence.LockModeType;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, String> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT e FROM Event e WHERE e.eventId = :eventId")
    Optional<Event> findByIdForUpdate(@Param("eventId") String eventId);

    @Query("SELECT e FROM Event e JOIN e.bookings b WHERE b = :username")
    List<Event> findByBookedUser(@Param("username") String username);
}
