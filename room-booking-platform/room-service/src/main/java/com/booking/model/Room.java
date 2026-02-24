package com.booking.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "rooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private Integer capacity;
    
    private String description;
    
    @Column(nullable = false)
    private String location; // Building A, Floor 3, etc.
    
    @Column(nullable = false)
    private String equipment; // Projector, Whiteboard, Video Conference
    
    @Column(nullable = false)
    private Boolean isActive = true;
    
    @Column(nullable = false)
    private Double hourlyRate;
}