package com.example.AssociationManagement.Dao.Modele;


import com.example.AssociationManagement.Dao.Enumerations.Frequence;
import com.example.AssociationManagement.Dao.Enumerations.Jour;
import com.example.AssociationManagement.Dao.Enumerations.MeetType;

public class UpdateAssoModel {
    private String associationId;
    private String name;
    private Frequence meetFrequency;
    private Jour meetDay;
    private MeetType meetType;

    // Getters et Setters

    public String getAssociationId() {
        return associationId;
    }

    public void setAssociationId(String associationId) {
        this.associationId = associationId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public MeetType getMeetType() {
        return meetType;
    }

    public void setMeetType(MeetType meetType) {
        this.meetType = meetType;
    }
}
