package com.TontineManagement.dao.model;

import java.time.LocalDate;
import java.util.Date;

public class MembreTontineModel {
    private String nomU;
    private String role;
    private String id_tontine;
    private String idutiliateur;
    private String create_par;


    public String getNomU() {
        return nomU;
    }

    public void setNomU(String nomU) {
        this.nomU = nomU;
    }

    public String getCreate_par() {
        return create_par;
    }

    public void setCreate_par(String create_par) {
        this.create_par = create_par;
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
