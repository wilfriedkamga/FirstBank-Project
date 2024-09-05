package com.example.AssociationManagement.Dao.Dto;

import com.example.AssociationManagement.Dao.Entity.Association;

import java.time.LocalDate;

public class AssociationDto {
    private String id;
    private String name;
    private String frequenceReunion;
    private String jourReunion;
    private LocalDate creationDate;
    private int nbMembre;
    private int nbTontine;
    private int nbReunion;
    private int nbEvenement;
    private int nbDocument;
    private boolean estOperationel;
    private boolean isAlreadyOpen;
    private  boolean visibility;

    public int getNbReunion() {
        return nbReunion;
    }

    public AssociationDto() {
    }

    public AssociationDto(String id, String name, String frequenceReunion, String jourReunion, LocalDate creationDate, int nbMembre, int nbTontine, int nbReunion, int nbEvenement, int nbDocument,boolean estOperationel,boolean isAlreadyOpen, boolean visibility) {
        this.id = id;
        this.name = name;
        this.frequenceReunion = frequenceReunion;
        this.jourReunion = jourReunion;
        this.creationDate = creationDate;
        this.nbMembre = nbMembre;
        this.nbTontine = nbTontine;
        this.nbReunion = nbReunion;
        this.nbEvenement = nbEvenement;
        this.nbDocument = nbDocument;
        this.estOperationel=estOperationel;
        this.isAlreadyOpen=isAlreadyOpen;
        this.visibility=visibility;
    }

    public AssociationDto(Association association){
        this.id = association.getId();
        this.name = association.getName();
        this.frequenceReunion = association.getFrequenceReunion();
        this.jourReunion = association.getJourReunion();
        this.creationDate = association.getCreationDate();
        this.nbMembre = association.getNbMembers();
        this.nbTontine = association.getNbTontines();
        this.nbReunion = 0;
        this.nbEvenement = 0;
        this.nbDocument = 0;
        this.estOperationel=association.isState1()&&association.isState3()&&association.isState2();
        this.isAlreadyOpen=association.isAlredryOpen();
        this.visibility=association.isVisibility();
    }

    public boolean isEstOperationel() {
        return estOperationel;
    }

    public boolean isVisibility() {
        return visibility;
    }

    public void setVisibility(boolean visibility) {
        this.visibility = visibility;
    }

    public void setEstOperationel(boolean estOperationel) {
        this.estOperationel = estOperationel;
    }

    public void setNbReunion(int nbReunion) {
        this.nbReunion = nbReunion;
    }

    public int getNbEvenement() {
        return nbEvenement;
    }

    public void setNbEvenement(int nbEvenement) {
        this.nbEvenement = nbEvenement;
    }

    public int getNbDocument() {
        return nbDocument;
    }

    public void setNbDocument(int nbDocument) {
        this.nbDocument = nbDocument;
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

    public boolean isAlreadyOpen() {
        return isAlreadyOpen;
    }

    public void setAlreadyOpen(boolean alreadyOpen) {
        isAlreadyOpen = alreadyOpen;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }
// Constructeurs, getters et setters...
}
