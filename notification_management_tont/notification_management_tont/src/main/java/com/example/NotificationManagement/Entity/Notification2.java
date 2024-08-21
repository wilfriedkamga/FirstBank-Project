package com.example.NotificationManagement.Entity;

import javax.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Notification2 {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(updatable = false, nullable = false)
    private String id;
    private String title;
    private String message;
    private boolean isRead;
    private boolean requiredConfirmation=false;
    private boolean statusConfirmation;
    private boolean confirmationState=false;
    private Date creationDate;
    private String imageUrl;
    private String senderPhone;
    private String receiverPhone;
    @ManyToOne
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;

    // getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public boolean isConfirmationState() {
        return confirmationState;
    }

    public void setConfirmationState(boolean confirmationState) {
        this.confirmationState = confirmationState;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public boolean isRequiredConfirmation() {
        return requiredConfirmation;
    }

    public void setRequiredConfirmation(boolean requiredConfirmation) {
        this.requiredConfirmation = requiredConfirmation;
    }

    public boolean isStatusConfirmation() {
        return statusConfirmation;
    }

    public void setStatusConfirmation(boolean statusConfirmation) {
        this.statusConfirmation = statusConfirmation;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getSenderPhone() {
        return senderPhone;
    }

    public void setSenderPhone(String senderPhone) {
        this.senderPhone = senderPhone;
    }

    public String getReceiverPhone() {
        return receiverPhone;
    }

    public void setReceiverPhone(String receiverPhone) {
        this.receiverPhone = receiverPhone;
    }
}
