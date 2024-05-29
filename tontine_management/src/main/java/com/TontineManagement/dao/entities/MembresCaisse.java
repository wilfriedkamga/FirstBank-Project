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
@Table(name = "membre_caisse")
@Setter
@Getter
public class MembresCaisse{

    @Id
    private String id;
    private String nomUtilisateur;
    private String role;// validateur, adherent
    private String id_caisse;
    private String idutiliateur;
    private String creer_par;
    private Date date_creation;



// Constructeurs, getters et setters

    public MembresCaisse() {
        // Constructeur par défaut
        this.id=UUID.randomUUID().toString();
        this.date_creation=new Date();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getId_caisse() {
        return id_caisse;
    }

    public void setId_caisse(String id_caisse) {
        this.id_caisse = id_caisse;
    }

    public String getIdutiliateur() {
        return idutiliateur;
    }

    public void setIdutiliateur(String idutiliateur) {
        this.idutiliateur = idutiliateur;
    }

    public String getCreer_par() {
        return creer_par;
    }

    public void setCreer_par(String creer_par) {
        this.creer_par = creer_par;
    }

    public Date getDate_creation() {
        return date_creation;
    }

    public void setDate_creation(Date date_creation) {
        this.date_creation = date_creation;
    }
}
