package com.example.AssociationManagement.Dao.Modele;


import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UpdateSanctionModel {
    private String id;
    private double amount;
    private Date delayDate;
}
