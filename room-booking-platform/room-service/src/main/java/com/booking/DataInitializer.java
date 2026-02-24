package com.booking;

import com.booking.model.Room;
import com.booking.repository.RoomRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    private final RoomRepository roomRepository;
    
    public DataInitializer(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }
    
    @Override
    public void run(String... args) {
        // Create sample rooms if database is empty
        if (roomRepository.count() == 0) {
            roomRepository.save(Room.builder()
                .name("Salle Paris")
                .capacity(10)
                .description("Modern meeting room with video conference")
                .location("Building A, Floor 3")
                .equipment("Projector, Whiteboard, Video Conference")
                .hourlyRate(50.0)
                .isActive(true)
                .build());
            
            roomRepository.save(Room.builder()
                .name("Salle London")
                .capacity(20)
                .description("Large conference room")
                .location("Building B, Floor 1")
                .equipment("Projector, TV, Phone, Whiteboard")
                .hourlyRate(75.0)
                .isActive(true)
                .build());
            
            roomRepository.save(Room.builder()
                .name("Salle Tokyo")
                .capacity(8)
                .description("Small team meeting room")
                .location("Building A, Floor 2")
                .equipment("TV, Whiteboard")
                .hourlyRate(30.0)
                .isActive(true)
                .build());
            
            System.out.println("Sample rooms created!");
        }
    }
}