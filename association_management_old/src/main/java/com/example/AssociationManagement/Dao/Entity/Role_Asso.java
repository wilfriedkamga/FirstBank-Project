package com.example.AssociationManagement.Dao.Entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "role_asso")
@Setter
@Getter
public class Role_Asso {


    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String label;

    private String labelV;

    private boolean isDeletable;

    private int nbMaxOcc;


    @ManyToOne
    @JoinColumn(name = "association_id", nullable = false)
    private Association association;

    @ManyToMany
    @JoinTable(
            name = "role_privilege",
            joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "privilege_id")
    )
    private List<Privilege_Asso> privileges;

    public String getId() {
        return id;
    }

    public int getNbMaxOcc() {
        return nbMaxOcc;
    }

    public void setNbMaxOcc(int nbMaxOcc) {
        this.nbMaxOcc = nbMaxOcc;
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

    public Association getAssociation() {
        return association;
    }

    public void setDeletable(boolean deletable) {
        isDeletable = deletable;
    }

    public String getLabelV() {
        return labelV;
    }

    public void setLabelV(String labelV) {
        this.labelV = labelV;
    }
    public void setAssociation(Association association) {
        this.association = association;
    }

    public List<Privilege_Asso> getPrivileges() {
        return privileges;
    }

    public void setPrivileges(List<Privilege_Asso> privileges) {
        this.privileges = privileges;
    }

    public boolean isDeletable() {
        return isDeletable;
    }

    public void setIsDeletable(boolean deletable) {
        isDeletable = deletable;
    }
}
