package com.example.AssociationManagement.Dao.Dto;

import com.example.AssociationManagement.Dao.Enumerations.EtatMembre;
import com.example.AssociationManagement.Dao.Enumerations.PaimentMode;



public class CotisationDto {

    private String amount;
    private PaimentMode mode;
    private EtatMembre state;
    private String reunionId;
    private String membreTontId;

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public PaimentMode getMode() {
        return mode;
    }

    public void setMode(PaimentMode mode) {
        this.mode = mode;
    }

    public EtatMembre getState() {
        return state;
    }

    public void setState(EtatMembre state) {
        this.state = state;
    }

    public String getReunionId() {
        return reunionId;
    }

    public void setReunionId(String reunionId) {
        this.reunionId = reunionId;
    }

    public String getMembreTontId() {
        return membreTontId;
    }

    public void setMembreTontId(String membreTontId) {
        this.membreTontId = membreTontId;
    }
}
