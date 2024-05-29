package com.TontineManagement.dao.entities;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;


import javax.persistence.*;

@Entity
@Table(name = "membre_tontine")
@Setter
@Getter
public class MembresTontine {

    @Id
    private String id;
    private String nomUtilisateur;
    private String role;// ADMIN, ADHERENT,PRESIDENT
    private String id_tontine;
    private String idutiliateur;
    private String creer_par;
    private Date date_creation;

    public Date getDate_creation() {
        return date_creation;
    }

// Constructeurs, getters et setters

    public MembresTontine() {
        // Constructeur par défaut
        this.id=UUID.randomUUID().toString();
        this.date_creation=new Date();
    }

    public String getCreer_par() {
        return creer_par;
    }

    public void setCreer_par(String creer_par) {
        this.creer_par = creer_par;
    }



    public String getId() {
        return id;
    }

    public String getNomUtilisateur() {
        return nomUtilisateur;
    }

    public void setNomUtilisateur(String nomUtilisateur) {
        this.nomUtilisateur = nomUtilisateur;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }


    public String getId_tontine() {
        return id_tontine;
    }

    public void setId_tontine(String id_tontine) {
        this.id_tontine = id_tontine;
    }

    public String getIdutiliateur() {
        return idutiliateur;
    }

    public void setId_utiliateur(String id_utiliateur) {
        this.idutiliateur = id_utiliateur;
    }



}
