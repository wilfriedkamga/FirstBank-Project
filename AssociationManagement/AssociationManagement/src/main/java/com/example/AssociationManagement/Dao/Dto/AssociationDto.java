package com.example.AssociationManagement.Dao.Dto;

import java.time.LocalDate;

public class AssociationDto {
    private String id;
    private String name;
    private String frequenceReunion;
    private String jourReunion;
    private LocalDate creationDate;
    private int nbMembre;
    private int nbTontine;


    public AssociationDto(String id, String name, String frequenceReunion, String jourReunion, LocalDate creationDate, int nbMembre, int nbTontine) {
        this.id = id;
        this.name = name;
        this.frequenceReunion = frequenceReunion;
        this.jourReunion = jourReunion;
        this.creationDate = creationDate;
        this.nbMembre = nbMembre;
        this.nbTontine = nbTontine;
    }

    public int getNbMembre() {
        return nbMembre;
    }

    public void setNbMembre(int nbMembre) {
        this.nbMembre = nbMembre;
    }

    public int getNbTontine() {
        return nbTontine;
    }

    public void setNbTontine(int nbTontine) {
        this.nbTontine = nbTontine;
    }

    public String  getId() {
        return id;
    }

    public void setId(String  id) {
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

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }
// Constructeurs, getters et setters...
}
