package com.example.AssociationManagement.Dao.Entity;


import com.example.AssociationManagement.Dao.Enumerations.PrivilegeAsso;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "privilege_asso")
@Setter
@Getter
public class Privilege_Asso {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @Enumerated(EnumType.STRING)
    private PrivilegeAsso label;

    @ManyToMany(mappedBy = "privileges")
    private List<Role_Asso> roles;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Role_Asso> getRoles() {
        return roles;
    }

    public void setRoles(List<Role_Asso> roles) {
        this.roles = roles;
    }

    public PrivilegeAsso getLabel() {
        return label;
    }

    public void setLabel(PrivilegeAsso label) {
        this.label = label;
    }
}

