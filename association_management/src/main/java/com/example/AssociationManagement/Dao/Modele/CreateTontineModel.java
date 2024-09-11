package com.example.AssociationManagement.Dao.Modele;

import com.example.AssociationManagement.Dao.Enumerations.TypeTontine;

import java.util.Date;

public class CreateTontineModel {
    private String tontineName;
    private TypeTontine type;
    private String amount;
    private Date creationDate;
    private String associationId;
    private String phoneValidateur1;
    private String phoneValidateur2;
    private String purpose;
    private Date startDate;
    private Date endDate;
    private String phoneCreator;

    public String getTontineName() {
        return tontineName;
    }

    public void setTontineName(String tontineName) {
        this.tontineName = tontineName;
    }

    public TypeTontine getType() {
        return type;
    }

    public void setType(TypeTontine type) {
        this.type = type;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getAssociationId() {
        return associationId;
    }

    public void setAssociationId(String associationId) {
        this.associationId = associationId;
    }

    public String getPhoneValidateur1() {
        return phoneValidateur1;
    }

    public void setPhoneValidateur1(String phoneValidateur1) {
        this.phoneValidateur1 = phoneValidateur1;
    }

    public String getPhoneValidateur2() {
        return phoneValidateur2;
    }

    public void setPhoneValidateur2(String phoneValidateur2) {
        this.phoneValidateur2 = phoneValidateur2;
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

    public String getPhoneCreator() {
        return phoneCreator;
    }

    public void setPhoneCreator(String phoneCreator) {
        this.phoneCreator = phoneCreator;
    }
}
