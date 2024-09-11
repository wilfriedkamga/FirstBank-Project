package com.example.AssociationManagement.Dao.Entity;

import com.example.AssociationManagement.Dao.Enumerations.EtatMembre;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "membre_asso")
@Setter
@Getter
public class Membre_Asso {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String name;

    private String phone;

    private int numOrdre;

    private LocalDate creationDate;

    @Enumerated(EnumType.STRING)
    private EtatMembre etat;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role_Asso role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "association_id", nullable = false)
    private Association association;
    public Association getAssociation() {
        return association;
    }

    public void setAssociation(Association association) {
        this.association = association;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public Role_Asso getRole() {
        return role;
    }

    public int getNumOrdre() {
        return numOrdre;
    }

    public void setNumOrdre(int numOrdre) {
        this.numOrdre = numOrdre;
    }

    public void setRole(Role_Asso role) {
        this.role = role;
    }

    public EtatMembre getEtat() {
        return etat;
    }

    public void setEtat(EtatMembre etat) {
        this.etat = etat;
    }
}
