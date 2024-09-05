package com.example.AssociationManagement.Dao.Modele;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleCreationModel {
    private String associationId;
    private String label;
    private int nbMaxOcc;


// Getters and Setters

    public String getAssociationId() {
        return associationId;
    }

    public void setAssociationId(String associationId) {
        this.associationId = associationId;
    }

    public String getLabel() {
        return label;
    }

    public int getNbMaxOcc() {
        return nbMaxOcc;
    }

    public void setNbMaxOcc(int nbMaxOcc) {
        this.nbMaxOcc = nbMaxOcc;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}