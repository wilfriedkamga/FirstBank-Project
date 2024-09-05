package com.example.AssociationManagement.Dao.Dto;

import java.time.LocalDate;
import java.util.Date;


public class TontineDto {
    private String id;
    private String tontineName;
    private LocalDate creationDate;
    private String type;
    private String amount;
    private Date startDate;
    private Date endDate;
    private String purpose;
    private String nbMembres;
    private String nbNotifications;


    public String getNbMembres() {
        return nbMembres;
    }

    public void setNbMembres(String nbMembres) {
        this.nbMembres = nbMembres;
    }

    public String getNbNotifications() {
        return nbNotifications;
    }

    public void setNbNotifications(String nbNotifications) {
        this.nbNotifications = nbNotifications;
    }

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

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }
}