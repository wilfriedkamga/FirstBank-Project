package com.example.AssociationManagement.Dao.Dto;

import com.example.AssociationManagement.Dao.Entity.Reunion;

import java.time.LocalDate;
import java.time.LocalTime;

public class ReunionDto {
    private String id;
    private LocalDate date;
    private String associationId;
    private LocalTime debut;
    private LocalTime fin;
    private int nbParticipantsAttendu;
    private int nbCotisationsAttendu;
    private int nbParticipants;
    private int nbCotisations;

    public ReunionDto(Reunion reunion){
        this.associationId=reunion.getAssociation().getId();
        this.date=reunion.getDateSeance();
        this.debut=reunion.getHeureDebut();
        this.fin=reunion.getHeureFin();
        this.nbCotisations=reunion.getCotisations().size();
        this.nbCotisationsAttendu=reunion.getAssociation().getMembres().size();
        this.nbParticipantsAttendu=reunion.getAssociation().getMembres().size();

    }

    // Getters and Setters
}