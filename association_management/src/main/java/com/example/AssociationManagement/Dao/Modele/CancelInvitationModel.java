package com.example.AssociationManagement.Dao.Modele;

import com.example.AssociationManagement.Dao.Enumerations.InvitationType;

public class CancelInvitationModel {
    private String associationId;
    private String roleId;
    private String responderId;
    private InvitationType type;

    public String getAssociationId() {
        return associationId;
    }

    public void setAssociationId(String associationId) {
        this.associationId = associationId;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getResponderId() {
        return responderId;
    }

    public void setResponderId(String responderId) {
        this.responderId = responderId;
    }

    public InvitationType getType() {
        return type;
    }

    public void setType(InvitationType type) {
        this.type = type;
    }
}
