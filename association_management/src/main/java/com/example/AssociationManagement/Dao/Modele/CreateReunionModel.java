package com.example.AssociationManagement.Dao.Modele;


import com.example.AssociationManagement.Dao.Enumerations.EtatReunion;
import com.example.AssociationManagement.Dao.Enumerations.TypeReunion;

import java.time.LocalDate;
import java.time.LocalTime;

public class CreateReunionModel {
    private LocalDate dateSeance;
    private LocalTime heureDebut;
    private LocalTime heureFin;
    private EtatReunion state;
    private TypeReunion type;
    private String associationId;

    public LocalDate getDateSeance() {
        return dateSeance;
    }

    public void setDateSeance(LocalDate dateSeance) {
        this.dateSeance = dateSeance;
    }

    public LocalTime getHeureDebut() {
        return heureDebut;
    }

    public void setHeureDebut(LocalTime heureDebut) {
        this.heureDebut = heureDebut;
    }

    public LocalTime getHeureFin() {
        return heureFin;
    }

    public void setHeureFin(LocalTime heureFin) {
        this.heureFin = heureFin;
    }

    public EtatReunion getState() {
        return state;
    }

    public void setState(EtatReunion state) {
        this.state = state;
    }

    public TypeReunion getType() {
        return type;
    }

    public void setType(TypeReunion type) {
        this.type = type;
    }

    public String getAssociationId() {
        return associationId;
    }

    public void setAssociationId(String associationId) {
        this.associationId = associationId;
    }
}
