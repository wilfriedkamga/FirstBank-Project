package com.example.AssociationManagement.Dao.Modele;

import com.example.AssociationManagement.Dao.Enumerations.PrivilegeAsso;

import java.util.List;

public class UpdateRoleModel {
    private String id_Caller;
    private String roleId;
    private String label;
    private String labelV;
    private String associationId;
    private int nbMaxOcc;
    private List<PrivilegeAsso> privilegeList;

    public String getId_Caller() {
        return id_Caller;
    }

    public void setId_Caller(String id_Caller) {
        this.id_Caller = id_Caller;
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

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
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

    public List<PrivilegeAsso> getPrivilegeList() {
        return privilegeList;
    }

    public void setPrivilegeList(List<PrivilegeAsso> privilegeLIst) {
        this.privilegeList = privilegeLIst;
    }
}
