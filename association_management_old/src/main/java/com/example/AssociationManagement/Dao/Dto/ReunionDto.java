package com.example.AssociationManagement.Dao.Dto;

import java.time.LocalDate;

public class ReunionDto {
    private String id;
    private LocalDate date;


    public ReunionDto(String id, LocalDate date){
        this.date = date;

    }

    // Getters and Setters
}