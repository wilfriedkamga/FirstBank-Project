package com.example.AssociationManagement.Dao.Entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "evenement")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Evenement {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String description;
    private LocalDate dateEcheance;

    @ManyToOne
    @JoinColumn(name = "association_id", nullable = false)
    private Association association;

    @ManyToOne
    @JoinColumn(name = "membre_asso_id", nullable = false)
    private Membre_Asso membreAsso;

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDateEcheance() {
        return dateEcheance;
    }

    public void setDateEcheance(LocalDate dateEcheance) {
        this.dateEcheance = dateEcheance;
    }

    public Association getAssociation() {
        return association;
    }

    public void setAssociation(Association association) {
        this.association = association;
    }

    public Membre_Asso getMembreAsso() {
        return membreAsso;
    }

    public void setMembreAsso(Membre_Asso membreAsso) {
        this.membreAsso = membreAsso;
    }
}
