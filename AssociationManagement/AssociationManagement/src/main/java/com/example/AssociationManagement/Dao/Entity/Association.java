package com.example.AssociationManagement.Dao.Entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "association")
@AllArgsConstructor
@NoArgsConstructor
public class Association {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String name;

    private String frequenceReunion;

    private String jourReunion;

    private String modeReunion;

    private LocalDate creationDate;

    private boolean isDeletable;

    private int nbMembers=0;

    private int nbTontines=0;

    @OneToMany(mappedBy = "association", cascade = CascadeType.ALL)
    private List<Role_Asso> roles = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "association_membre",
            joinColumns = @JoinColumn(name = "association_id"),
            inverseJoinColumns = @JoinColumn(name = "membre_id")
    )
    private List<Membre_Asso> membres = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFrequenceReunion() {
        return frequenceReunion;
    }

    public void setFrequenceReunion(String frequenceReunion) {
        this.frequenceReunion = frequenceReunion;
    }

    public String getJourReunion() {
        return jourReunion;
    }

    public void setJourReunion(String jourReunion) {
        this.jourReunion = jourReunion;
    }

    public String getModeReunion() {
        return modeReunion;
    }

    public void setModeReunion(String modeReunion) {
        this.modeReunion = modeReunion;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public boolean isDeletable() {
        return isDeletable;
    }

    public void setDeletable(boolean deletable) {
        isDeletable = deletable;
    }

    public List<Role_Asso> getRoles() {
        return roles;
    }

    public void setRoles(List<Role_Asso> roles) {
        this.roles = roles;
    }

    public List<Membre_Asso> getMembres() {
        return membres;
    }

    public void setMembres(List<Membre_Asso> membres) {
        this.membres = membres;
    }

    public int getNbMembers() {
        return nbMembers;
    }

    public void setNbMembers(int nbMembers) {
        this.nbMembers = nbMembers;
    }

    public int getNbTontines() {
        return nbTontines;
    }

    public void setNbTontines(int nbTontines) {
        this.nbTontines = nbTontines;
    }
}
