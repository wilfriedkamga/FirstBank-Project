package com.TontineManagement.dao.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "Tontine")
@Setter
@Getter
public class Tontine {

    @Id
    private String uuid;

    private String nom;
    private String description;
    private String type;
    private String frequence;
    private String jourReunion;

    // Constructeurs, getters et setters supplémentaires

    public Tontine() {
        // Constructeur par défaut
        this.uuid = UUID.randomUUID().toString();
    }

    public Tontine(String uuid, String nom, String description, String type, String frequence, String jourReunion) {
        this.uuid = UUID.randomUUID().toString();
        this.nom = nom;
        this.description = description;
        this.type = type;
        this.frequence = frequence;
        this.jourReunion = jourReunion;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
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
