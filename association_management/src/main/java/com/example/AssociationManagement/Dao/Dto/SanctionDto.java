package com.example.AssociationManagement.Dao.Dto;

import java.time.LocalDate;

public class SanctionDto {

    private String id;
    private String montant;
    private LocalDate delayDate;
    private LocalDate startDate;
    private String etat; // Enum for sanction status
    private String membreTontId; // ID of the associated Membre_Tont

    // Constructors
    public SanctionDto() {}

    public SanctionDto(String id, String montant, LocalDate delayDate, LocalDate startDate, String etat, String membreTontId) {
        this.id = id;
        this.montant = montant;
        this.delayDate = delayDate;
        this.startDate = startDate;
        this.etat = etat;
        this.membreTontId = membreTontId;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMontant() {
        return montant;
    }

    public void setMontant(String montant) {
        this.montant = montant;
    }

    public LocalDate getDelayDate() {
        return delayDate;
    }

    public void setDelayDate(LocalDate delayDate) {
        this.delayDate = delayDate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public String getMembreTontId() {
        return membreTontId;
    }

    public void setMembreTontId(String membreTontId) {
        this.membreTontId = membreTontId;
    }
}
