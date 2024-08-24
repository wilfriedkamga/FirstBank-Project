package com.example.AssociationManagement.Dao.Entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "tontine")
public class Tontine {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String nb_membre;
    private String tontineName;
    private LocalDate creationDate;
    private String type;// dette epargne, sociale
    private String amount;
    private String purpose;
    private Date startDate;
    private Date endDate;
    private String phoneValidator1;
    private String phoneValidator2;
    private boolean isDeletable=true;
    private boolean onChangeType=true;
    private boolean canRemove=true;
    private boolean onChangeParam=true;
    private String phoneCreator;


    @ManyToOne
    @JoinColumn(name = "association_id", nullable = false)
    private Association association;

    @OneToMany(mappedBy = "tontine", cascade = CascadeType.ALL)
    private List<Role_Tont> roles_tont = new ArrayList<>();


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

    public String getTontineName() {
        return tontineName;
    }

    public void setTontineName(String tontineName) {
        this.tontineName = tontineName;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getPhoneValidator1() {
        return phoneValidator1;
    }

    public void setPhoneValidator1(String phoneValidator1) {
        this.phoneValidator1 = phoneValidator1;
    }

    public String getPhoneValidator2() {
        return phoneValidator2;
    }

    public void setPhoneValidator2(String phoneValidator2) {
        this.phoneValidator2 = phoneValidator2;
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

    public String getPhoneCreator() {
        return phoneCreator;
    }

    public void setPhoneCreator(String phoneCreator) {
        this.phoneCreator = phoneCreator;
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
