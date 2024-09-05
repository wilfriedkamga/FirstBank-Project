package com.example.AssociationManagement.Dao.Dto;


import com.example.AssociationManagement.Dao.Entity.Membre_Asso;
import com.example.AssociationManagement.Dao.Enumerations.EtatMembre;

import java.time.LocalDate;


public  class MembreAssoDto {
    private String id;
    private String memberName;
    private String memberPhone;
    private LocalDate creationDate;
    private String role;
    private String avatarUrl;
    private boolean isCreator;
    private String associationId;
    private EtatMembre state;

    public MembreAssoDto(Membre_Asso membre_asso) {
        this.id = membre_asso.getId();
        this.memberName = membre_asso.getName();
        this.memberPhone = membre_asso.getPhone();
        this.creationDate = membre_asso.getCreationDate();
        this.role = membre_asso.getRole().getLabelV();
        this.associationId =membre_asso.getAssociation().getId();
        this.isCreator=membre_asso.getPhone()==membre_asso.getAssociation().getPhoneCreator();
        this.state =membre_asso.getEtat();
        this.avatarUrl = null;

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getMemberPhone() {
        return memberPhone;
    }

    public void setMemberPhone(String memberPhone) {
        this.memberPhone = memberPhone;
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

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public boolean isCreator() {
        return isCreator;
    }

    public void setCreator(boolean creator) {
        isCreator = creator;
    }

    public String getAssociationId() {
        return associationId;
    }

    public void setAssociationId(String associationId) {
        this.associationId = associationId;
    }

    public EtatMembre getState() {
        return state;
    }

    public void setState(EtatMembre state) {
        this.state = state;
    }
}