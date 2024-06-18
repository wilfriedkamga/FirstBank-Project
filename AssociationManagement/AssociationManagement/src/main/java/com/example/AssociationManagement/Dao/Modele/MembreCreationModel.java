package com.example.AssociationManagement.Dao.Modele;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MembreCreationModel {
    private String associationId;
    private String name;
    private String phone;
    private String roleLabel;

    // Getters and Setters
}