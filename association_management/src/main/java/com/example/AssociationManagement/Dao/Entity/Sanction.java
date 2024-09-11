package com.example.AssociationManagement.Dao.Entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
@Table(name = "sanction")
@AllArgsConstructor
@NoArgsConstructor
public class Sanction {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String montant;

    private LocalDate delayDate;
    private LocalDate startDate;


    private String etat; // Enum for sanction status

    // Relation entre sanction et membre_tont
    @ManyToOne
    @JoinColumn(name = "membre_tont_id", nullable = false)
    private Membre_Tont membre_tont;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMontant() {
        return montant;
    }

    public void setMontant(String montant) {
        this.montant = montant;
    }

    public LocalDate getDelayDate() {
        return delayDate;
    }

    public void setDelayDate(LocalDate delayDate) {
        this.delayDate = delayDate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public Membre_Tont getMembre_tont() {
        return membre_tont;
    }

    public void setMembre_tont(Membre_Tont membre_tont) {
        this.membre_tont = membre_tont;
    }
}
