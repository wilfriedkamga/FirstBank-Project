package com.example.AssociationManagement.Dao.Dto;


import com.example.AssociationManagement.Dao.Entity.Membre_Asso;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


public  class MembreAssoDto {
    private String id;
    private String name;
    private String phone;
    private LocalDate creationDate;
    private String role;
    private boolean stateConfirmation;
    private boolean statusConfirmation;
    private String avatarUrl;

    public MembreAssoDto(String id, String name, String phone, LocalDate creationDate, String role, boolean stateConfirmation, boolean statusConfirmation, String avatarUrl) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.creationDate = creationDate;
        this.role = role;
        this.stateConfirmation = stateConfirmation;
        this.statusConfirmation = statusConfirmation;
        this.avatarUrl = avatarUrl;
    }

    public MembreAssoDto(Membre_Asso membre_asso) {
        this.id = membre_asso.getId();
        this.name = membre_asso.getName();
        this.phone = membre_asso.getPhone();
        this.creationDate = membre_asso.getCreationDate();
        this.role = membre_asso.getRole().getLabelV();
        this.stateConfirmation = membre_asso.isStateConfirmation();
        this.statusConfirmation =membre_asso.isStatusConfirmation();
        this.avatarUrl = null;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isStateConfirmation() {
        return stateConfirmation;
    }

    public void setStateConfirmation(boolean stateConfirmation) {
        this.stateConfirmation = stateConfirmation;
    }

    public boolean isStatusConfirmation() {
        return statusConfirmation;
    }

    public void setStatusConfirmation(boolean statusConfirmation) {
        this.statusConfirmation = statusConfirmation;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
}