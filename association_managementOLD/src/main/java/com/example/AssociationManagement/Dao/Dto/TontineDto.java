package com.example.AssociationManagement.Dao.Dto;

import java.time.LocalDate;



public class TontineDto {
    private String id;
    private String name;
    private LocalDate creationDate;

    public TontineDto(String id, String name, LocalDate creationDate) {
        this.id = id;
        this.name = name;
        this.creationDate = creationDate;
    }

    // Getters and Setters
}