package com.example.AssociationManagement.Dao.Entity;

import com.example.AssociationManagement.Dao.Enumerations.PaimentMode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "cagnotte")
@Getter
@Setter
public class Cagnotte {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @Column(nullable = false)
    private BigDecimal montant;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaimentMode modePaiement;

    @ManyToOne
    @JoinColumn(name = "membre_id", nullable = false)
    private Membre_Tont membre;

    @ManyToOne
    @JoinColumn(name = "reunion_id", nullable = false)
    private Reunion reunion;

    // Constructors, Getters, and Setters
    public Cagnotte() {
    }

    public Cagnotte(BigDecimal montant, PaimentMode modePaiement, Membre_Tont membre, Reunion reunion) {
        this.montant = montant;
        this.modePaiement = modePaiement;
        this.membre = membre;
        this.reunion = reunion;
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

    public Membre_Tont getMembre() {
        return membre;
    }

    public void setMembre(Membre_Tont membre) {
        this.membre = membre;
    }

    public Reunion getReunion() {
        return reunion;
    }

    public void setReunion(Reunion reunion) {
        this.reunion = reunion;
    }
}
