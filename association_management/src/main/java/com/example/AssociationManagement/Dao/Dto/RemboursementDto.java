package com.example.AssociationManagement.Dao.Dto;
import com.example.AssociationManagement.Dao.Entity.Remboursement;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RemboursementDto {

    private String id;
    private BigDecimal montant;
    private LocalDate dateRemboursement;
    private String detteId;

    public RemboursementDto(Remboursement remboursement) {
        this.id = remboursement.getId();
        this.montant = remboursement.getMontant();
        this.dateRemboursement = remboursement.getDateRemboursement();
        this.detteId = remboursement.getDette() != null ? remboursement.getDette().getId() : null;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public BigDecimal getMontant() {
        return montant;
    }

    public void setMontant(BigDecimal montant) {
        this.montant = montant;
    }

    public LocalDate getDateRemboursement() {
        return dateRemboursement;
    }

    public void setDateRemboursement(LocalDate dateRemboursement) {
        this.dateRemboursement = dateRemboursement;
    }

    public String getDetteId() {
        return detteId;
    }

    public void setDetteId(String detteId) {
        this.detteId = detteId;
    }
}
