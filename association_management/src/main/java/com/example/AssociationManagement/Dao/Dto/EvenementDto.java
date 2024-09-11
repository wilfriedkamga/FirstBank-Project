package com.example.AssociationManagement.Dao.Dto;

import com.example.AssociationManagement.Dao.Entity.Evenement;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EvenementDto {

    private String id;
    private String description;
    private LocalDate dateEcheance;
    private String associationId;
    private String membreAssoId;

    // Constructeur à partir de l'entité Evenement
    public EvenementDto(Evenement evenement) {
        this.id = evenement.getId();
        this.description = evenement.getDescription();
        this.dateEcheance = evenement.getDateEcheance();
        this.associationId = evenement.getAssociation().getId();
        this.membreAssoId = evenement.getMembreAsso().getId();
    }

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

    public String getAssociationId() {
        return associationId;
    }

    public void setAssociationId(String associationId) {
        this.associationId = associationId;
    }

    public String getMembreAssoId() {
        return membreAssoId;
    }

    public void setMembreAssoId(String membreAssoId) {
        this.membreAssoId = membreAssoId;
    }
}
