package com.example.AssociationManagement.Dao.Dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class MemberDetailsDto {
    private int nbAssociations;
    private int nbTontines;
    private int nbCotisations;
    private int nbDettes;
    private int nbSanctions;

    public int getNbAssociations() {
        return nbAssociations;
    }

    public MemberDetailsDto(int nbAssociations, int nbTontines, int nbCotisations, int nbDettes, int nbSanctions) {
        this.nbAssociations = nbAssociations;
        this.nbTontines = nbTontines;
        this.nbCotisations = nbCotisations;
        this.nbDettes = nbDettes;
        this.nbSanctions = nbSanctions;
    }

    public void setNbAssociations(int nbAssociations) {
        this.nbAssociations = nbAssociations;
    }

    public int getNbTontines() {
        return nbTontines;
    }

    public void setNbTontines(int nbTontines) {
        this.nbTontines = nbTontines;
    }

    public int getNbCotisations() {
        return nbCotisations;
    }

    public void setNbCotisations(int nbCotisations) {
        this.nbCotisations = nbCotisations;
    }

    public int getNbDettes() {
        return nbDettes;
    }

    public void setNbDettes(int nbDettes) {
        this.nbDettes = nbDettes;
    }

    public int getNbSanctions() {
        return nbSanctions;
    }

    public void setNbSanctions(int nbSanctions) {
        this.nbSanctions = nbSanctions;
    }
}