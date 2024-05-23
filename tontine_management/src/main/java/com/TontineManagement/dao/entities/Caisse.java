package com.TontineManagement.dao.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;


@Entity
@Table(name = "Caisse")
@Setter
@Getter
public class Caisse {
    @Id
    private String id;

    private String nom;
    private String type;
    private String description;
    private int nbMembres;
    private String creerPar;
    private Date dateCreation;

    @ManyToOne
    @JoinColumn(name = "tontine_id")
    private Tontine tontine;

    public Caisse() {
        // Constructeur par défaut
        this.id = UUID.randomUUID().toString();
        this.nbMembres=0;
        this.dateCreation=new Date();
    }

    public Caisse(String id, String nom, String type, String description, int nbMembres, String creerPar, Date dateCreation, Tontine tontine) {
        this.id = UUID.randomUUID().toString();
        this.nom = nom;
        this.type = type;
        this.description = description;
        this.nbMembres = nbMembres;
        this.creerPar = creerPar;
        this.dateCreation = dateCreation;
        this.tontine = tontine;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public int getNbMembres() {
        return nbMembres;
    }

    public void setNbMembres(int nbMembres) {
        this.nbMembres = nbMembres;
    }

    public String getCreerPar() {
        return creerPar;
    }

    public void setCreerPar(String creerPar) {
        this.creerPar = creerPar;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Tontine getTontine() {
        return tontine;
    }

    public void setTontine(Tontine tontine) {
        this.tontine = tontine;
    }
}
