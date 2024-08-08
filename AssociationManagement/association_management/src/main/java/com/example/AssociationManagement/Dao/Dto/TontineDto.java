package com.example.AssociationManagement.Dao.Dto;

import java.time.LocalDate;



public class TontineDto {
    private String id;
    private String name;
    private LocalDate creationDate;
    private String type;// dette epargne, sociale
    private String montant;
    private String periodicite;

    public TontineDto(String id, String name, LocalDate creationDate) {
        this.id = id;
        this.name = name;
        this.creationDate = creationDate;
    }

    public TontineDto(String id, String name, LocalDate creationDate, String type, String montant_freq, String periodicite) {
        this.id = id;
        this.name = name;
        this.creationDate = creationDate;
        this.type = type;
        this.montant = montant_freq;
        this.periodicite = periodicite;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMontant_freq() {
        return montant;
    }

    public void setMontant_freq(String montant_freq) {
        this.montant = montant_freq;
    }

    public String getPeriodicite() {
        return periodicite;
    }

    public void setPeriodicite(String periodicite) {
        this.periodicite = periodicite;
    }

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

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }
}