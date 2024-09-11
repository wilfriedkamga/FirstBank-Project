package com.example.AssociationManagement.Dao.Entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "privilege_tont")
@Setter
@Getter
public class Privilege_Tont {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @ManyToMany(mappedBy = "privileges_tont")
    private List<Role_Tont> roles;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Role_Tont> getRoles() {
        return roles;
    }

    public void setRoles(List<Role_Tont> roles) {
        this.roles = roles;
    }
}
