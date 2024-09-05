package com.example.AssociationManagement.Dao.Entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "invitation")
public class Invitation {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private Date date;
    private String[] phoneDest;
    private String emetteur;
    private String messageTitle;
    private String messsageBody;
    private boolean stateAnswer;
    private boolean statusAnwer;



    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String[] getPhoneDest() {
        return phoneDest;
    }

    public void setPhoneDest(String[] phoneDest) {
        this.phoneDest = phoneDest;
    }

    public String getEmetteur() {
        return emetteur;
    }

    public void setEmetteur(String emetteur) {
        this.emetteur = emetteur;
    }

    public String getMessageTitle() {
        return messageTitle;
    }

    public void setMessageTitle(String messageTitle) {
        this.messageTitle = messageTitle;
    }

    public String getMesssageBody() {
        return messsageBody;
    }

    public void setMesssageBody(String messsageBody) {
        this.messsageBody = messsageBody;
    }

    public boolean isStateAnswer() {
        return stateAnswer;
    }

    public void setStateAnswer(boolean stateAnswer) {
        this.stateAnswer = stateAnswer;
    }

    public boolean isStatusAnwer() {
        return statusAnwer;
    }

    public void setStatusAnwer(boolean statusAnwer) {
        this.statusAnwer = statusAnwer;
    }

}
