package com.example.AssociationManagement.Dao.Modele;

public class InvitationResponseModel {
    String membre_id;
    boolean answer;

    public String getMembre_id() {
        return membre_id;
    }

    public void setMembre_id(String membre_id) {
        this.membre_id = membre_id;
    }

    public boolean isAnswer() {
        return answer;
    }

    public void setAnswer(boolean answer) {
        this.answer = answer;
    }
}
