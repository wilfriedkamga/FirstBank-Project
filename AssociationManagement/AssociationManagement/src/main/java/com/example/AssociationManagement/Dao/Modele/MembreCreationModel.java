package com.example.AssociationManagement.Dao.Modele;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


public class MembreCreationModel {
    private String associationId;
    private String name;
    private String phone;
    private String roleLabel;

    // Getters and Setters

    public String getAssociationId() {
        return associationId;
    }

    public void setAssociationId(String associationId) {
        this.associationId = associationId;
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

    public String getRoleLabel() {
        return roleLabel;
    }

    public void setRoleLabel(String roleLabel) {
        this.roleLabel = roleLabel;
    }
}