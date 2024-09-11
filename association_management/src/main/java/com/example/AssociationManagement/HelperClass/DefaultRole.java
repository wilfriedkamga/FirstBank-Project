package com.example.AssociationManagement.HelperClass;
import com.example.AssociationManagement.Dao.Enumerations.PrivilegeAsso;

import java.util.List;

public class DefaultRole {

    private String roleName;
    private String label;
    private List<PrivilegeAsso> privileges;
    private int maxPeople;
    private boolean deletable;

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public List<PrivilegeAsso> getPrivileges() {
        return privileges;
    }

    public void setPrivileges(List<PrivilegeAsso> privileges) {
        this.privileges = privileges;
    }

    public int getMaxPeople() {
        return maxPeople;
    }

    public void setMaxPeople(int maxPeople) {
        this.maxPeople = maxPeople;
    }

    public boolean isDeletable() {
        return deletable;
    }

    public void setDeletable(boolean deletable) {
        deletable = deletable;
    }
}
