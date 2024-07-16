package com.example.AssociationManagement.Dao.Dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public  class MembreAssoDto {
    private String id;
    private String name;
    private String phone;
    private LocalDate creationDate;
    private String role;

    public MembreAssoDto(String id, String name, String phone, LocalDate creationDate, String role) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.creationDate = creationDate;
        this.role = role;
    }

    // Getters and Setters
    //...
}