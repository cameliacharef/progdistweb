package com.booking.repository;

import com.booking.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, String> {
    List<Room> findByIsActiveTrue();
    List<Room> findByLocationContainingIgnoreCase(String location);
    List<Room> findByCapacityGreaterThanEqual(Integer minCapacity);
}