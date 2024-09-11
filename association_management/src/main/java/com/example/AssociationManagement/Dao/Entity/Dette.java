package com.example.AssociationManagement.Dao.Entity;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "dette")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Dette {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private BigDecimal montant;
    private LocalDate dateDelai;
    private BigDecimal montantNet;
    private BigDecimal montantARembourser;

    private String etat; // Enum for debt status

    @ManyToOne
    @JoinColumn(name = "membre_tont_id", nullable = false)
    private Membre_Tont membre_tont;

    @OneToOne(mappedBy = "dette", cascade = CascadeType.ALL, orphanRemoval = true)
    private Remboursement remboursement;

    @OneToOne
    @JoinColumn(name = "document_id", nullable = false)
    private Document document;

    // Getters and Setters

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

    public Membre_Tont getMembre_tont() {
        return membre_tont;
    }

    public void setMembre_tont(Membre_Tont membre_tont) {
        this.membre_tont = membre_tont;
    }

    public Remboursement getRemboursement() {
        return remboursement;
    }

    public void setRemboursement(Remboursement remboursement) {
        this.remboursement = remboursement;
    }

    public Document getDocument() {
        return document;
    }

    public void setDocument(Document document) {
        this.document = document;
    }
}
