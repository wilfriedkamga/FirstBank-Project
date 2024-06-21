package com.example.AssociationManagement.Dao.Entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "role_tont")
@Setter
@Getter
public class Role_Tont {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String label;

    private boolean isDeletable;

    @ManyToOne
    @JoinColumn(name = "tontine_id", nullable = false)
    private Tontine tontine;

    @ManyToMany
    @JoinTable(
            name = "role_tont_privilege",
            joinColumns = @JoinColumn(name = "role_tont_id"),
            inverseJoinColumns = @JoinColumn(name = "privilege_tont_id")
    )
    private List<Privilege_Tont> privileges_tont;
}
