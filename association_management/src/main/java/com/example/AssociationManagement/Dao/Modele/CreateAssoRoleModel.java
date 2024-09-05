package com.example.AssociationManagement.Dao.Modele;

import com.example.AssociationManagement.Dao.Enumerations.PrivilegeAsso;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateAssoRoleModel {
    private String id_Caller;
    private String associationId;
    private String label;
    private String labelV;
    private int nbMaxOcc;
    private List<PrivilegeAsso> privilegeLIst;

// Getters and Setters

    public String getLabelV() {
        return labelV;
    }

    public String getId_Caller() {
        return id_Caller;
    }

    public void setId_Caller(String id_Caller) {
        this.id_Caller = id_Caller;
    }

    public List<PrivilegeAsso> getPrivilegeLIst() {
        return privilegeLIst;
    }

    public void setPrivilegeLIst(List<PrivilegeAsso> privilegeLIst) {
        this.privilegeLIst = privilegeLIst;
    }

    public void setLabelV(String labelV) {
        this.labelV = labelV;
    }

    public String getAssociationId() {
        return associationId;
    }

    public void setAssociationId(String associationId) {
        this.associationId = associationId;
    }

    public String getLabel() {
        return label;
    }

    public int getNbMaxOcc() {
        return nbMaxOcc;
    }

    public void setNbMaxOcc(int nbMaxOcc) {
        this.nbMaxOcc = nbMaxOcc;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}