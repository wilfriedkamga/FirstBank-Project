package com.TontineManagement.dao.model;

import com.TontineManagement.dao.entities.Tontine;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

public class CaisseModel {

    private String nom;
    private String type;
    private String description;
    private String creerPar;
    private String tontine_id;
    private String montant;

    public CaisseModel() {
    }

    public CaisseModel(String nom, String type, String description, String creerPar, String tontine_id, String montant) {
        this.nom = nom;
        this.type = type;
        this.description = description;
        this.creerPar = creerPar;
        this.tontine_id = tontine_id;
        this.montant = montant;
    }

    public String getNom() {
        return nom;
    }

    public String getMontant() {
        return montant;
    }

    public void setMontant(String monstant) {
        this.montant = monstant;
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
}
