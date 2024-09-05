package com.example.AssociationManagement.Dao.Dto;

import com.example.AssociationManagement.Dao.Entity.Role_Asso;
import com.example.AssociationManagement.Dao.Enumerations.EtatRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public  class RoleAssoDto {
    private String id;
    private String label;
    private String labelV;
    private int nbMaxOcc;
    private EtatRole state;
    private String associationId;

    public RoleAssoDto(Role_Asso role){
        this.nbMaxOcc=role.getNbMaxOcc();
        this.label=role.getLabel();
        this.state=role.getState();
        this.associationId=role.getAssociation().getId();
        this.labelV=role.getLabelV();
    }

    public EtatRole getState() {
        return state;
    }

    public void setState(EtatRole state) {
        this.state = state;
    }

    public String getLabelV() {
        return labelV;
    }

    public void setLabelV(String labelV) {
        this.labelV = labelV;
    }

    public int getNbMaxOcc() {
        return nbMaxOcc;
    }

    public void setNbMaxOcc(int nbMaxOcc) {
        this.nbMaxOcc = nbMaxOcc;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}