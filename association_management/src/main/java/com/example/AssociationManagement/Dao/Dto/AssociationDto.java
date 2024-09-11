package com.example.AssociationManagement.Dao.Dto;

import com.example.AssociationManagement.Dao.Entity.Association;
import com.example.AssociationManagement.Dao.Enumerations.EtatAsso;
import com.example.AssociationManagement.Dao.Enumerations.Frequence;
import com.example.AssociationManagement.Dao.Enumerations.Jour;
import com.example.AssociationManagement.Dao.Enumerations.MeetType;

import java.time.LocalDate;

public class AssociationDto {
    private String id;
    private String assoName;
    private Frequence meetingFrequency;
    private Jour meetingDay;
    private LocalDate creationDate;
    private int nbMembre;
    private int nbTontine;
    private int nbMeetings;
    private int nbEvents;
    private int nbDocuments;
    private boolean isAlreadyOpen;
    private boolean isDeletable;
    private  boolean visibility;
    private EtatAsso state;
    private String PhoneCreator;
    private MeetType meetMode;
    private String description;


    public AssociationDto(Association association){
        this.id = association.getId();
        this.assoName = association.getAssoName();
        this.meetingFrequency = association.getMeetFrequency();
        this.meetingDay = association.getMeetDay();
        this.creationDate = association.getCreationDate();
        this.nbMembre = association.getMembres().size();
        this.description=association.getDescription();
        this.nbTontine = 0;
        this.nbMeetings = 0;
        this.nbEvents = 0;
        this.state=association.getState();
        this.nbDocuments = 0;
        this.isAlreadyOpen=association.isAlredryOpen();
        this.visibility=association.isVisibility();
        this.meetMode=association.getMeetMode();
        this.isDeletable=association.isDeletable();
        this.PhoneCreator=association.getPhoneCreator();
        this.description=association.getDescription();
    }

    public Frequence getFrequenceReunion() {
        return meetingFrequency;
    }

    public void setFrequenceReunion(Frequence frequenceReunion) {
        this.meetingFrequency = frequenceReunion;
    }

    public String getAssoName() {
        return assoName;
    }

    public String getPhoneCreator() {
        return PhoneCreator;
    }

    public void setPhoneCreator(String phoneCreator) {
        PhoneCreator = phoneCreator;
    }

    public void setAssoName(String assoName) {
        this.assoName = assoName;
    }

    public Frequence getMeetingFrequency() {
        return meetingFrequency;
    }

    public void setMeetingFrequency(Frequence meetingFrequency) {
        this.meetingFrequency = meetingFrequency;
    }

    public Jour getMeetingDay() {
        return meetingDay;
    }

    public void setMeetingDay(Jour meetingDay) {
        this.meetingDay = meetingDay;
    }

    public int getNbMeetings() {
        return nbMeetings;
    }

    public void setNbMeetings(int nbMeetings) {
        this.nbMeetings = nbMeetings;
    }

    public int getNbEvents() {
        return nbEvents;
    }

    public void setNbEvents(int nbEvents) {
        this.nbEvents = nbEvents;
    }

    public int getNbDocuments() {
        return nbDocuments;
    }

    public void setNbDocuments(int nbDocuments) {
        this.nbDocuments = nbDocuments;
    }

    public boolean isDeletable() {
        return isDeletable;
    }

    public void setDeletable(boolean deletable) {
        isDeletable = deletable;
    }

    public EtatAsso getState() {
        return state;
    }

    public void setState(EtatAsso state) {
        this.state = state;
    }

    public MeetType getMeetMode() {
        return meetMode;
    }

    public void setMeetMode(MeetType meetMode) {
        this.meetMode = meetMode;
    }

    public Jour getJourReunion() {
        return meetingDay;
    }

    public void setJourReunion(Jour jourReunion) {
        this.meetingDay = jourReunion;
    }

    public boolean isVisibility() {
        return visibility;
    }

    public void setVisibility(boolean visibility) {
        this.visibility = visibility;
    }

    public void setNbReunion(int nbReunion) {
        this.nbMeetings = nbReunion;
    }

    public int getNbEvenement() {
        return nbEvents;
    }

    public void setNbEvenement(int nbEvenement) {
        this.nbEvents = nbEvenement;
    }

    public int getNbDocument() {
        return nbDocuments;
    }

    public void setNbDocument(int nbDocument) {
        this.nbDocuments = nbDocument;
    }

    public int getNbMembre() {
        return nbMembre;
    }

    public void setNbMembre(int nbMembre) {
        this.nbMembre = nbMembre;
    }

    public int getNbTontine() {
        return nbTontine;
    }

    public void setNbTontine(int nbTontine) {
        this.nbTontine = nbTontine;
    }

    public String  getId() {
        return id;
    }

    public void setId(String  id) {
        this.id = id;
    }

    public String getName() {
        return assoName;
    }

    public void setName(String name) {
        this.assoName = name;
    }


    public LocalDate getCreationDate() {
        return creationDate;
    }

    public boolean isAlreadyOpen() {
        return isAlreadyOpen;
    }

    public void setAlreadyOpen(boolean alreadyOpen) {
        isAlreadyOpen = alreadyOpen;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }
// Constructeurs, getters et setters...
}
