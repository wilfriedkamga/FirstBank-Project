package com.example.AssociationManagement.HelperClass;

import javax.persistence.Column;

public class User {
    private String fullName;
    private String phone;
    private String email;
    private String birthDate;
    private String gender;
    private String id;
    private String cniRecto;
    private String cniVerso;
    private String signature;
    private boolean activated;
    private boolean blocked;


    public User (){

    }

    public String getCniRecto() {
        return cniRecto;
    }

    public void setCniRecto(String cniRecto) {
        this.cniRecto = cniRecto;
    }

    public String getCniVerso() {
        return cniVerso;
    }

    public void setCniVerso(String cniVerso) {
        this.cniVerso = cniVerso;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public boolean getActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public boolean getBlocked() {
        return blocked;
    }

    public void setBlocked(boolean blocked) {
        this.blocked = blocked;
    }

    public String getFullName() {
        return fullName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
