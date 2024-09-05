package com.example.AssociationManagement.Dao.Entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "association")

public class Association {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String name;

    private String frequenceReunion;
    private boolean visibility=true;
    private String jourReunion;

    private String modeReunion;

    private boolean state1;
    private boolean state2;
    private boolean state3;

    private LocalDate creationDate;

    private boolean isDeletable;

    private int nbMembers=0;

    private int nbTontines=0;

    private String phoneCreator;

    private boolean isAlredryOpen;

    @OneToMany(mappedBy = "association", cascade = CascadeType.ALL)
    private List<Role_Asso> roles = new ArrayList<>();

    @OneToMany(mappedBy = "association", cascade = CascadeType.ALL)
    private List<Tontine> tontines = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "association_membre",
            joinColumns = @JoinColumn(name = "association_id"),
            inverseJoinColumns = @JoinColumn(name = "membre_id")
    )
    private List<Membre_Asso> membres = new ArrayList<>();

    @OneToMany(mappedBy = "association")
    private List<Reunion> reunions;

    @OneToMany(mappedBy = "association")
    private List<Document> document;

    @OneToMany(mappedBy = "association")
    private List<Evenement> evenements;

    public List<Evenement> getEvenements() {
        return evenements;
    }

    public void setEvenements(List<Evenement> evenements) {
        this.evenements = evenements;
    }

    public String getId() {
        return id;
    }

    public void setState1(boolean state1) {
        this.state1 = state1;
    }

    public void setState2(boolean state2) {
        this.state2 = state2;
    }

    public boolean isAlredryOpen() {
        return isAlredryOpen;
    }

    public void setAlredryOpen(boolean alredryOpen) {
        isAlredryOpen = alredryOpen;
    }

    public void setState3(boolean state3) {
        this.state3 = state3;
    }

    public String getPhoneCreator() {
        return phoneCreator;
    }

    public void setPhoneCreator(String phoneCreator) {
        this.phoneCreator = phoneCreator;
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

    public List<Document> getDocument() {
        return document;
    }
    public void setDocuments(List<Document> evenements) {
        this.document = evenements;
    }

    public void addDocument(Document document) {
        this.document.add(document);
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

    public List<Role_Asso> getRoles() {
        return roles;
    }

    public void setRoles(List<Role_Asso> roles) {
        this.roles = roles;
    }

    public List<Tontine> getTontines() {
        return tontines;
    }

    public boolean isVisibility() {
        return visibility;
    }

    public void setVisibility(boolean visibility) {
        this.visibility = visibility;
    }

    public void setTontines(List<Tontine> tontines) {
        this.tontines = tontines;
    }

    public List<Membre_Asso> getMembres() {
        return membres;
    }

    public void setMembres(List<Membre_Asso> membres) {
        this.membres = membres;
    }

    public List<Reunion> getReunions() {
        return reunions;
    }

    public boolean isState1() {
        return state1;
    }

    public boolean isState2() {
        return state2;
    }

    public boolean isState3() {
        return state3;
    }

    public void setReunions(List<Reunion> reunions) {
        this.reunions = reunions;
    }
}
