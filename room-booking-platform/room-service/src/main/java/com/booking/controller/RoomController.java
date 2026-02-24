package com.booking.controller;

import com.booking.model.Room;
import com.booking.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class RoomController {
    
    @Autowired
    private RoomRepository roomRepository;
    
    // GET all rooms
    @GetMapping
    public List<Room> getAllRooms() {
        return roomRepository.findByIsActiveTrue();
    }
    
    // GET room by ID
    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable String id) {
        Optional<Room> room = roomRepository.findById(id);
        return room.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // POST create new room
    @PostMapping
    public Room createRoom(@RequestBody Room room) {
        return roomRepository.save(room);
    }
    
    // PUT update room
    @PutMapping("/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable String id, @RequestBody Room roomDetails) {
        return roomRepository.findById(id)
                .map(room -> {
                    room.setName(roomDetails.getName());
                    room.setCapacity(roomDetails.getCapacity());
                    room.setDescription(roomDetails.getDescription());
                    room.setLocation(roomDetails.getLocation());
                    room.setEquipment(roomDetails.getEquipment());
                    room.setHourlyRate(roomDetails.getHourlyRate());
                    room.setIsActive(roomDetails.getIsActive());
                    return ResponseEntity.ok(roomRepository.save(room));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    // DELETE room (soft delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRoom(@PathVariable String id) {
        return roomRepository.findById(id)
                .map(room -> {
                    room.setIsActive(false);
                    roomRepository.save(room);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    // GET available rooms by capacity
    @GetMapping("/search/capacity/{minCapacity}")
    public List<Room> getRoomsByMinCapacity(@PathVariable Integer minCapacity) {
        return roomRepository.findByCapacityGreaterThanEqual(minCapacity);
    }
    
    // GET rooms by location
    @GetMapping("/search/location/{location}")
    public List<Room> getRoomsByLocation(@PathVariable String location) {
        return roomRepository.findByLocationContainingIgnoreCase(location);
    }
    
    // Health check endpoint
    @GetMapping("/health")
    public String health() {
        return "Room Service is UP!";
    }
}