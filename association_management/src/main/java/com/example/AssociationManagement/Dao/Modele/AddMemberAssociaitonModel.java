package com.example.AssociationManagement.Dao.Modele;

import com.example.AssociationManagement.Dao.Enumerations.Frequence;
import com.example.AssociationManagement.Dao.Enumerations.Jour;

import java.util.Date;

public class AddMemberAssociaitonModel {

    private String phone;
    private String role;
    private String fullName;
    private String associationId;

    public String getAssociationId() {
        return associationId;
    }

    public void setAssociationId(String associationId) {
        this.associationId = associationId;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
}

