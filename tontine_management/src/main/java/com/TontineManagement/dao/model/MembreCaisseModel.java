package com.TontineManagement.dao.model;

import java.util.Date;

public class MembreCaisseModel {

    private String nomUtilisateur;
    private String role;// validateur, adherent
    private String id_caisse;
    private String idutiliateur;
    private String creer_par;


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


}
