package com.example.AssociationManagement.Dao.Modele;

import lombok.Getter;
import lombok.Setter;


public class UpdateAssoModel {
    private String id;
    private String name;
    private String frequenceReunion;
    private String jourReunion;
    private String modeReunion;

    // Getters et Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFrequenceReunion() {
        return frequenceReunion;
    }

    public void setFrequenceReunion(String frequenceReunion) {
        this.frequenceReunion = frequenceReunion;
    }

    public String getJourReunion() {
        return jourReunion;
    }

    public void setJourReunion(String jourReunion) {
        this.jourReunion = jourReunion;
    }

    public String getModeReunion() {
        return modeReunion;
    }

    public void setModeReunion(String modeReunion) {
        this.modeReunion = modeReunion;
    }
}
