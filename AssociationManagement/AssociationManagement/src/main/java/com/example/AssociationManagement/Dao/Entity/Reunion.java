package com.example.AssociationManagement.Dao.Entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "reunion")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Reunion {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private LocalDate dateSeance;
    private LocalTime heureDebut;
    private LocalTime heureFin;
    private int nombreMembresPresents;
    private int nombreCotisationsAttendues;

    @ManyToOne
    @JoinColumn(name = "association_id", nullable = false)
    private Association association;

    @OneToMany(mappedBy = "reunion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cotisation> cotisations = new ArrayList<>();

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getDateSeance() {
        return dateSeance;
    }

    public void setDateSeance(LocalDate dateSeance) {
        this.dateSeance = dateSeance;
    }

    public LocalTime getHeureDebut() {
        return heureDebut;
    }

    public void setHeureDebut(LocalTime heureDebut) {
        this.heureDebut = heureDebut;
    }

    public LocalTime getHeureFin() {
        return heureFin;
    }

    public void setHeureFin(LocalTime heureFin) {
        this.heureFin = heureFin;
    }

    public int getNombreMembresPresents() {
        return nombreMembresPresents;
    }

    public void setNombreMembresPresents(int nombreMembresPresents) {
        this.nombreMembresPresents = nombreMembresPresents;
    }

    public int getNombreCotisationsAttendues() {
        return nombreCotisationsAttendues;
    }

    public void setNombreCotisationsAttendues(int nombreCotisationsAttendues) {
        this.nombreCotisationsAttendues = nombreCotisationsAttendues;
    }

    public Association getAssociation() {
        return association;
    }

    public void setAssociation(Association association) {
        this.association = association;
    }

    public List<Cotisation> getCotisations() {
        return cotisations;
    }

    public void setCotisations(List<Cotisation> cotisations) {
        this.cotisations = cotisations;
    }
}
