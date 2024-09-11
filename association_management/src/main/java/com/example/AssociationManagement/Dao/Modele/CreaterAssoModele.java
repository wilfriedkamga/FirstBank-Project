package com.example.AssociationManagement.Dao.Modele;

import com.example.AssociationManagement.Dao.Enumerations.Frequence;
import com.example.AssociationManagement.Dao.Enumerations.Jour;

import java.time.LocalDate;
import java.util.Date;

public class CreaterAssoModele {
    private String associationName;
    private Frequence meetingFrequency ;
    private Jour meetingDay;
    private String phoneAdmin1;
    private String roleAdmin1;
    private String phoneAdmin2;
    private String roleAdmin2;
    private String phoneAdmin3;
    private String roleAdmin3;
    private String amount;
    private Date creationDate;
    private String tontineName;
    private String type;
    private String phoneValidator1;
    private String phoneValidator2;
    private Date startDate;
    private Date endDate;
    private String purpose;

    public String getAssociationName() {
        return associationName;
    }

    public void setAssociationName(String associationName) {
        this.associationName = associationName;
    }

    public String getPhoneAdmin1() {
        return phoneAdmin1;
    }

    public void setPhoneAdmin1(String phoneAdmin1) {
        this.phoneAdmin1 = phoneAdmin1;
    }

    public String getRoleAdmin1() {
        return roleAdmin1;
    }

    public void setRoleAdmin1(String roleAdmin1) {
        this.roleAdmin1 = roleAdmin1;
    }

    public String getPhoneAdmin2() {
        return phoneAdmin2;
    }

    public void setPhoneAdmin2(String phoneAdmin2) {
        this.phoneAdmin2 = phoneAdmin2;
    }

    public String getRoleAdmin2() {
        return roleAdmin2;
    }

    public void setRoleAdmin2(String roleAdmin2) {
        this.roleAdmin2 = roleAdmin2;
    }

    public String getPhoneAdmin3() {
        return phoneAdmin3;
    }

    public void setPhoneAdmin3(String phoneAdmin3) {
        this.phoneAdmin3 = phoneAdmin3;
    }

    public String getRoleAdmin3() {
        return roleAdmin3;
    }

    public void setRoleAdmin3(String roleAdmin3) {
        this.roleAdmin3 = roleAdmin3;
    }

    public String getTontineName() {
        return tontineName;
    }

    public void setTontineName(String tontineName) {
        this.tontineName = tontineName;
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

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
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

    public Frequence getMeetingFrequency() {
        return meetingFrequency;
    }

    public void setMeetingFrequency(Frequence meetingFrequency) {
        this.meetingFrequency = meetingFrequency;
    }

    public Jour getMeetingDay() {
        return meetingDay;
    }

    public void setMeetingDay(Jour meetingDay) {
        this.meetingDay = meetingDay;
    }
}
