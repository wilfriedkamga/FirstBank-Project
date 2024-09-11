package com.example.AssociationManagement.Dao.Entity;

import com.example.AssociationManagement.Dao.Enumerations.EtatMembre;
import com.example.AssociationManagement.Dao.Enumerations.PaimentMode;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "cotisation")
public class Cotisation {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String amount;
    @Enumerated(EnumType.STRING)
    private PaimentMode mode;
    @Enumerated(EnumType.STRING)
    private EtatMembre state;

    @ManyToOne
    @JoinColumn(name = "reunion_id", nullable = false)
    private Reunion reunion;

    @ManyToOne()
    @JoinColumn(name = "membre_tont_id",nullable = false)
    private Membre_Tont membre_tont;

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public PaimentMode getMode() {
        return mode;
    }

    public void setMode(PaimentMode mode) {
        this.mode = mode;
    }

    public EtatMembre getState() {
        return state;
    }

    public void setState(EtatMembre state) {
        this.state = state;
    }

    public Reunion getReunion() {
        return reunion;
    }

    public void setReunion(Reunion reunion) {
        this.reunion = reunion;
    }

    public Membre_Tont getMembre_tont() {
        return membre_tont;
    }

    public void setMembre_tont(Membre_Tont membre_tont) {
        this.membre_tont = membre_tont;
    }
}
