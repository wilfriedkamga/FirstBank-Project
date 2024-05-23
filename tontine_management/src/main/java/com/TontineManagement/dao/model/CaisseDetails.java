package com.TontineManagement.dao.model;

import java.util.Date;

public class CaisseDetails {

    private String nom;
    private String type;
    private String description;
    private String creerPar;
    private String tontine_id;
    private int nbMembres;
    private Date dateCreation;

    public CaisseDetails(CaisseModel caisseModel,int nbMembres,Date dateCreation){
        this.nom=caisseModel.getNom();
        this.type=caisseModel.getType();
        this.description=caisseModel.getDescription();
        this.creerPar=caisseModel.getCreerPar();
        this.tontine_id=caisseModel.getTontine_id();
        this.dateCreation=dateCreation;
        this.nbMembres=nbMembres;
    }
    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreerPar() {
        return creerPar;
    }

    public void setCreerPar(String creerPar) {
        this.creerPar = creerPar;
    }

    public String getTontine_id() {
        return tontine_id;
    }

    public void setTontine_id(String tontine_id) {
        this.tontine_id = tontine_id;
    }

    public int getNbMembres() {
        return nbMembres;
    }

    public void setNbMembres(int nbMembres) {
        this.nbMembres = nbMembres;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }
}
