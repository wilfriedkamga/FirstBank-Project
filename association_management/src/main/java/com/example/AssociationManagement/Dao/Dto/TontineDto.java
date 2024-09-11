package com.example.AssociationManagement.Dao.Dto;
import com.example.AssociationManagement.Dao.Entity.Tontine;
import com.example.AssociationManagement.Dao.Enumerations.TypeTontine;

import java.util.Date;

public class TontineDto {

    private String id;
    private String tontineName;
    private Date creationDate;
    private TypeTontine type;
    private String amount;
    private String purpose;
    private Date startDate;
    private Date endDate;
    private String phoneValidator1;
    private String phoneValidator2;
    private String phoneCreator;
    private String associationId;

    // Constructeur vide
    public TontineDto() {
    }

    // Constructeur avec Tontine
    public TontineDto(Tontine tontine) {
        this.id = tontine.getId();
        this.tontineName = tontine.getTontineName();
        this.creationDate = tontine.getCreationDate();
        this.type = tontine.getType();
        this.amount = tontine.getAmount();
        this.purpose = tontine.getPurpose();
        this.startDate = tontine.getStartDate();
        this.endDate = tontine.getEndDate();
        this.phoneValidator1 = tontine.getPhoneValidator1();
        this.phoneValidator2 = tontine.getPhoneValidator2();
        this.phoneCreator = tontine.getPhoneCreator();
        this.associationId = tontine.getAssociation() != null ? tontine.getAssociation().getId() : null;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTontineName() {
        return tontineName;
    }

    public void setTontineName(String tontineName) {
        this.tontineName = tontineName;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
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

    public String getPhoneCreator() {
        return phoneCreator;
    }

    public void setPhoneCreator(String phoneCreator) {
        this.phoneCreator = phoneCreator;
    }

    public String getAssociationId() {
        return associationId;
    }

    public void setAssociationId(String associationId) {
        this.associationId = associationId;
    }
}
