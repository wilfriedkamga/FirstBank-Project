package com.example.AssociationManagement.Dao.Dto;

import com.example.AssociationManagement.Dao.Entity.Role_Tont;

import java.util.List;
import java.util.stream.Collectors;

public class RoleTontDto {

    private String id;
    private String label;
    private boolean isDeletable;
    private String tontineId;
    private List<String> privilegeIds;

    // Constructeur pour initialiser le DTO à partir d'une entité Role_Tont
    public RoleTontDto(Role_Tont roleTont) {
        this.id = roleTont.getId();
        this.label = roleTont.getLabel();
        this.isDeletable = roleTont.isDeletable();
        this.tontineId = roleTont.getTontine().getId();
        this.privilegeIds = roleTont.getPrivileges_tont().stream()
                .map(privilege -> privilege.toString())
                .collect(Collectors.toList());
    }

    // Constructeur par défaut
    public RoleTontDto() {
    }

    // Getters and Setters
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

    public boolean isDeletable() {
        return isDeletable;
    }

    public void setDeletable(boolean deletable) {
        isDeletable = deletable;
    }

    public String getTontineId() {
        return tontineId;
    }

    public void setTontineId(String tontineId) {
        this.tontineId = tontineId;
    }

    public List<String> getPrivilegeIds() {
        return privilegeIds;
    }

    public void setPrivilegeIds(List<String> privilegeIds) {
        this.privilegeIds = privilegeIds;
    }
}
