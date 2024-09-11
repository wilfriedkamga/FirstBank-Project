package com.example.AssociationManagement.Dao.Dto;

import com.example.AssociationManagement.Dao.Entity.Cagnotte;
import com.example.AssociationManagement.Dao.Entity.Membre_Tont;
import com.example.AssociationManagement.Dao.Entity.Reunion;
import com.example.AssociationManagement.Dao.Enumerations.PaimentMode;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CagnotteDto {

    private String id;
    private BigDecimal montant;
    private PaimentMode modePaiement;
    private String membreId;
    private String reunionId;

    // Constructor that takes the entity Cagnotte as parameter
    public CagnotteDto() {
    }

    public CagnotteDto(Cagnotte cagnotte) {
        this.id = cagnotte.getId();
        this.montant = cagnotte.getMontant();
        this.modePaiement = cagnotte.getModePaiement();
        this.membreId = cagnotte.getMembre().getId();
        this.reunionId = cagnotte.getReunion().getId();
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

    public PaimentMode getModePaiement() {
        return modePaiement;
    }

    public void setModePaiement(PaimentMode modePaiement) {
        this.modePaiement = modePaiement;
    }

    public String getMembreId() {
        return membreId;
    }

    public void setMembreId(String membreId) {
        this.membreId = membreId;
    }

    public String getReunionId() {
        return reunionId;
    }

    public void setReunionId(String reunionId) {
        this.reunionId = reunionId;
    }
}
