package com.example.AssociationManagement.Dao.Dto;

import java.time.LocalDate;

public class EventDto {
    private String id;
    private String name;
    private LocalDate date;

    public EventDto(String id, String name, LocalDate date) {
        this.id = id;
        this.name = name;
        this.date = date;
    }

    // Getters and Setters
}