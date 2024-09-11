package com.example.AssociationManagement.Dao.Entity;

import com.example.AssociationManagement.Dao.Enumerations.EtatAsso;
import com.example.AssociationManagement.Dao.Enumerations.Frequence;
import com.example.AssociationManagement.Dao.Enumerations.Jour;
import com.example.AssociationManagement.Dao.Enumerations.MeetType;
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

    private String assoName;
    private String description;
    private LocalDate creationDate;
    private boolean isDeletable;
    private boolean isAlredryOpen;
    private String phoneCreator;
    private boolean visibility=true;
    @Enumerated(EnumType.STRING)
    private EtatAsso state;
    @Enumerated(EnumType.STRING)
    private Frequence meetFrequency;
    @Enumerated(EnumType.STRING)
    private Jour meetDay;
    @Enumerated(EnumType.STRING)
    private MeetType meetMode;

    @OneToMany(mappedBy = "association", cascade = CascadeType.ALL)
    private List<Role_Asso> roles = new ArrayList<>();

    @OneToMany(mappedBy = "association", cascade = CascadeType.ALL)
    private List<Tontine> tontines = new ArrayList<>();

    @OneToMany(mappedBy = "association", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Membre_Asso> membres = new ArrayList<>();

    @OneToMany(mappedBy = "association", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reunion> reunions= new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAssoName() {
        return assoName;
    }

    public void setAssoName(String assoName) {
        this.assoName = assoName;
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

    public boolean isAlredryOpen() {
        return isAlredryOpen;
    }

    public String getDescription() {
        return description;
    }

    public void setAlredryOpen(boolean alredryOpen) {
        isAlredryOpen = alredryOpen;
    }

    public String getPhoneCreator() {
        return phoneCreator;
    }

    public void setPhoneCreator(String phoneCreator) {
        this.phoneCreator = phoneCreator;
    }

    public boolean isVisibility() {
        return visibility;
    }

    public void setVisibility(boolean visibility) {
        this.visibility = visibility;
    }

    public Frequence getMeetFrequency() {
        return meetFrequency;
    }

    public void setMeetFrequency(Frequence meetFrequency) {
        this.meetFrequency = meetFrequency;
    }

    public Jour getMeetDay() {
        return meetDay;
    }

    public void setMeetDay(Jour meetDay) {
        this.meetDay = meetDay;
    }

    public MeetType getMeetMode() {
        return meetMode;
    }

    public void setMeetMode(MeetType meetMode) {
        this.meetMode = meetMode;
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

    public EtatAsso getState() {
        return state;
    }

    public void setState(EtatAsso state) {
        this.state = state;
    }
}
