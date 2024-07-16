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

    public Tontine getTontine() {
        return tontine;
    }

    public void setTontine(Tontine tontine) {
        this.tontine = tontine;
    }

    public List<Privilege_Tont> getPrivileges_tont() {
        return privileges_tont;
    }

    public void setPrivileges_tont(List<Privilege_Tont> privileges_tont) {
        this.privileges_tont = privileges_tont;
    }
}
