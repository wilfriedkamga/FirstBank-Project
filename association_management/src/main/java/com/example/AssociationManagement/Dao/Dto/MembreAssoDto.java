package com.example.AssociationManagement.Dao.Dto;
import com.example.AssociationManagement.Dao.Entity.Membre_Asso;
import com.example.AssociationManagement.Dao.Enumerations.EtatMembre;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class MembreAssoDto {
    private String id;
    private String name;
    private String phone;
    private int numOrdre;
    private LocalDate creationDate;
    private EtatMembre etat;
    private String roleId;
    private String associationId;


    public MembreAssoDto(Membre_Asso membre){
        this.id=membre.getId();
        this.name=membre.getName();
        this.associationId=membre.getAssociation().getId();
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

    public int getNumOrdre() {
        return numOrdre;
    }

    public void setNumOrdre(int numOrdre) {
        this.numOrdre = numOrdre;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public EtatMembre getEtat() {
        return etat;
    }

    public void setEtat(EtatMembre etat) {
        this.etat = etat;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getAssociationId() {
        return associationId;
    }

    public void setAssociationId(String associationId) {
        this.associationId = associationId;
    }
}
