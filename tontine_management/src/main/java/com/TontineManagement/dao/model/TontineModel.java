package com.TontineManagement.dao.model;

import com.TontineManagement.dao.entities.Tontine;

import java.util.Date;

public class TontineModel {
    private String id;
    private String nom;
    private String description;
    private String type;
    private String frequence;
    private String jourReunion;
    private String create_par;
    private Date dateCreation;
    private int nbCaisse;
    private int nbMembre;
    private Date prochaineReunion;
    private String id_admin1;
    private String id_admin2;
    private String id_admin3;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId_admin1() {
        return id_admin1;
    }

    public void setId_admin1(String id_admin1) {
        this.id_admin1 = id_admin1;
    }

    public String getId_admin2() {
        return id_admin2;
    }

    public void setId_admin2(String id_admin2) {
        this.id_admin2 = id_admin2;
    }

    public String getId_admin3() {
        return id_admin3;
    }

    public void setId_admin3(String id_admin3) {
        this.id_admin3 = id_admin3;
    }

    public String getCreate_par() {
        return create_par;
    }

    public void setCreate_par(String create_par) {
        this.create_par = create_par;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public int getNbCaisse() {
        return nbCaisse;
    }

    public void setNbCaisse(int nbCaisse) {
        this.nbCaisse = nbCaisse;
    }

    public int getNbMembre() {
        return nbMembre;
    }

    public void setNbMembre(int nbMembre) {
        this.nbMembre = nbMembre;
    }

    public Date getProchaineReunion() {
        return prochaineReunion;
    }

    public void setProchaineReunion(Date prochaineReunion) {
        this.prochaineReunion = prochaineReunion;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFrequence() {
        return frequence;
    }

    public void setFrequence(String frequence) {
        this.frequence = frequence;
    }

    public String getJourReunion() {
        return jourReunion;
    }

    public void setJourReunion(String jourReunion) {
        this.jourReunion = jourReunion;
    }
}
