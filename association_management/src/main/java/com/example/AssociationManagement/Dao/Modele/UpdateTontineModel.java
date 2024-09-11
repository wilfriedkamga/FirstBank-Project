package com.example.AssociationManagement.Dao.Modele;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UpdateTontineModel {
    private String id;
    private String name;
    private int nbMembre;
    private Date creationDate;
    private String type;
    private double amount;
    private String purpose;
    // autres attributs nécessaires
}