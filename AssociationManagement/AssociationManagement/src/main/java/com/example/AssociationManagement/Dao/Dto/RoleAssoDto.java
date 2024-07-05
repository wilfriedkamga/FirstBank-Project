package com.example.AssociationManagement.Dao.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public  class RoleAssoDto {
    private String id;
    private String label;
    private int nbMaxOcc;

    public RoleAssoDto(String id, String label, int nbMaxOcc) {
        this.id = id;
        this.label = label;
        this.nbMaxOcc=nbMaxOcc;
    }

    public int getNbMaxOcc() {
        return nbMaxOcc;
    }

    public void setNbMaxOcc(int nbMaxOcc) {
        this.nbMaxOcc = nbMaxOcc;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}