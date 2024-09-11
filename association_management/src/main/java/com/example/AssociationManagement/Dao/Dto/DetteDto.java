package com.example.AssociationManagement.Dao.Dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class DetteDto {

    private BigDecimal montant;
    private LocalDate dateDelai;
    private BigDecimal montantNet;
    private BigDecimal montantARembourser;
    private String etat;
    private String membreTontId;
    private String documentId;

    public BigDecimal getMontant() {
        return montant;
    }

    public void setMontant(BigDecimal montant) {
        this.montant = montant;
    }

    public LocalDate getDateDelai() {
        return dateDelai;
    }

    public void setDateDelai(LocalDate dateDelai) {
        this.dateDelai = dateDelai;
    }

    public BigDecimal getMontantNet() {
        return montantNet;
    }

    public void setMontantNet(BigDecimal montantNet) {
        this.montantNet = montantNet;
    }

    public BigDecimal getMontantARembourser() {
        return montantARembourser;
    }

    public void setMontantARembourser(BigDecimal montantARembourser) {
        this.montantARembourser = montantARembourser;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public String getMembreTontId() {
        return membreTontId;
    }

    public void setMembreTontId(String membreTontId) {
        this.membreTontId = membreTontId;
    }

    public String getDocumentId() {
        return documentId;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }
}
