
package com.example.AssociationManagement.Dao.Dto;

import com.example.AssociationManagement.Dao.Entity.Privilege_Asso;
import com.example.AssociationManagement.Dao.Enumerations.PrivilegeAsso;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PrivilegeAssoDto {

    private String id;
    private PrivilegeAsso label;
    private List<String> roleIds;

    public PrivilegeAssoDto(Privilege_Asso privilegeAsso) {
        this.id = privilegeAsso.getId();
        this.label = privilegeAsso.getLabel();
        this.roleIds = privilegeAsso.getRoles().stream()
                .map(role -> role.getId())
                .collect(Collectors.toList());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public PrivilegeAsso getLabel() {
        return label;
    }

    public void setLabel(PrivilegeAsso label) {
        this.label = label;
    }

    public List<String> getRoleIds() {
        return roleIds;
    }

    public void setRoleIds(List<String> roleIds) {
        this.roleIds = roleIds;
    }
}
