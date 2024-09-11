package com.example.AssociationManagement.Dao.Modele;


import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CreateSanctionModel {
    private double amount;
    private Date delayDate;
    private Date startDate;
    private String status;
    // autres attributs nécessaires
}



