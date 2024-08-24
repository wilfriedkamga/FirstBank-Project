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
}
