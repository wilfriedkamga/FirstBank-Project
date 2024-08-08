package com.example.AssociationManagement.Dao.Entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tontine")
public class Tontine {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String nb_membre;
    private String name;
    private LocalDate date_creation;
    private String type;// dette epargne, sociale
    private String montant;
    private String periodicite;
    private boolean isDeletable;
    private boolean onChangeType;
    private boolean canRemove;
    private boolean onChangeParam;


    @ManyToOne
    @JoinColumn(name = "association_id", nullable = false)
    private Association association;

    @OneToMany(mappedBy = "tontine", cascade = CascadeType.ALL)
    private List<Role_Tont> roles_tont = new ArrayList<>();

//    @ManyToOne
//    @JoinColumn(name = "create_by", nullable = false)
//    private Membre_Asso createBy;

    @ManyToMany
    @JoinTable(
            name = "membre_tontine",
            joinColumns = @JoinColumn(name = "tontine_id"),
            inverseJoinColumns = @JoinColumn(name = "membre_tont_id")
    )
    private List<Membre_Tont> membres_tont = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNb_membre() {
        return nb_membre;
    }

    public void setNb_membre(String nb_membre) {
        this.nb_membre = nb_membre;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDate_creation() {
        return date_creation;
    }

    public boolean isDeletable() {
        return isDeletable;
    }

    public void setDeletable(boolean deletable) {
        isDeletable = deletable;
    }

    public boolean isOnChangeType() {
        return onChangeType;
    }

    public void setOnChangeType(boolean onChangeType) {
        this.onChangeType = onChangeType;
    }

    public boolean isCanRemove() {
        return canRemove;
    }

    public void setCanRemove(boolean canRemove) {
        this.canRemove = canRemove;
    }

    public boolean isOnChangeParam() {
        return onChangeParam;
    }

    public void setOnChangeParam(boolean onChangeParam) {
        this.onChangeParam = onChangeParam;
    }

    public void setDate_creation(LocalDate date_creation) {
        this.date_creation = date_creation;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMontant_freq() {
        return montant;
    }

    public void setMontant_freq(String montant_freq) {
        this.montant = montant_freq;
    }

    public String getPeriodicite() {
        return periodicite;
    }

    public void setPeriodicite(String periodicite) {
        this.periodicite = periodicite;
    }

    public Association getAssociation() {
        return association;
    }

    public void setAssociation(Association association) {
        this.association = association;
    }

    public List<Role_Tont> getRoles_tont() {
        return roles_tont;
    }

    public void setRoles_tont(List<Role_Tont> roles_tont) {
        this.roles_tont = roles_tont;
    }


    public List<Membre_Tont> getMembres_tont() {
        return membres_tont;
    }

    public void setMembres_tont(List<Membre_Tont> membres_tont) {
        this.membres_tont = membres_tont;
    }
}
