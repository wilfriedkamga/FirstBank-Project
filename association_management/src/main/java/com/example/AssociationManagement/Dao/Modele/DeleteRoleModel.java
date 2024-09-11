package com.example.AssociationManagement.Dao.Modele;

import com.example.AssociationManagement.Dao.Enumerations.PrivilegeAsso;

import java.util.List;

public class DeleteRoleModel {
    private String id_Caller;
    private String associationId;
    private String label;
    private String roleId;

    public String getId_Caller() {
        return id_Caller;
    }

    public void setId_Caller(String id_Caller) {
        this.id_Caller = id_Caller;
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

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }
}
