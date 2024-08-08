package com.example.AssociationManagement.Dao.Modele;

public class CreateTontineModele {
    private String nom;
    private String type;
    private String montant_freq;
    private String creationDate;
    private String associationId;
    private String phoneValidateur1;
    private String phoneValidateur2;
    //private String CreatorPhone;




    public String getPhoneValidateur1() {
        return phoneValidateur1;
    }

    public void setPhoneValidateur1(String phoneValidateur1) {
        this.phoneValidateur1 = phoneValidateur1;
    }

    public String getPhoneValidateur2() {
        return phoneValidateur2;
    }

    public void setPhoneValidateur2(String phoneValidateur2) {
        this.phoneValidateur2 = phoneValidateur2;
    }

    public String getNom() {
        return nom;
    }

    public String getAssociationId() {
        return associationId;
    }

    public void setAssociationId(String associationId) {
        this.associationId = associationId;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMontant_freq() {
        return montant_freq;
    }

    public void setMontant_freq(String montant_freq) {
        this.montant_freq = montant_freq;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }
}
