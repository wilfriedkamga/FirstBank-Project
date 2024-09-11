package com.example.AssociationManagement.Dao.Dto;

import com.example.AssociationManagement.Dao.Entity.Role_Asso;
import com.example.AssociationManagement.Dao.Enumerations.EtatRole;

import java.util.List;
import java.util.stream.Collectors;

public class RoleAssoDto {

    private String id;
    private String label;
    private String labelV;
    private boolean isDeletable;
    private EtatRole state;
    private int nbMaxOcc;
    private String associationId;
    private List<String> privilegeIds;

    public RoleAssoDto() {
    }

    public RoleAssoDto(Role_Asso roleAsso) {
        this.id = roleAsso.getId();
        this.label = roleAsso.getLabel();
        this.labelV = roleAsso.getLabelV();
        this.isDeletable = roleAsso.isDeletable();
        this.state = roleAsso.getState();
        this.nbMaxOcc = roleAsso.getNbMaxOcc();
        this.associationId = roleAsso.getAssociation() != null ? roleAsso.getAssociation().getId() : null;
        this.privilegeIds = roleAsso.getPrivileges() != null ? roleAsso.getPrivileges().stream().map(p -> p.getId()).collect(Collectors.toList()) : null;
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

    public String getLabelV() {
        return labelV;
    }

    public void setLabelV(String labelV) {
        this.labelV = labelV;
    }

    public boolean isDeletable() {
        return isDeletable;
    }

    public void setDeletable(boolean deletable) {
        isDeletable = deletable;
    }

    public EtatRole getState() {
        return state;
    }

    public void setState(EtatRole state) {
        this.state = state;
    }

    public int getNbMaxOcc() {
        return nbMaxOcc;
    }

    public void setNbMaxOcc(int nbMaxOcc) {
        this.nbMaxOcc = nbMaxOcc;
    }

    public String getAssociationId() {
        return associationId;
    }

    public void setAssociationId(String associationId) {
        this.associationId = associationId;
    }

    public List<String> getPrivilegeIds() {
        return privilegeIds;
    }

    public void setPrivilegeIds(List<String> privilegeIds) {
        this.privilegeIds = privilegeIds;
    }
}
