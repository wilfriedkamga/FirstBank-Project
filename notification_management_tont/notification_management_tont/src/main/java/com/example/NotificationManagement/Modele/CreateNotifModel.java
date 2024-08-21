package com.example.NotificationManagement.Modele;

import java.util.Date;

public class CreateNotifModel {
    private String title;
    private String message;
    private String receiverPhone;
    private String senderPhone;
    private boolean requiredConfirmation;
    private boolean statusConfirmation;
    private String imageUrl;

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

    public String getReceiverPhone() {
        return receiverPhone;
    }

    public void setReceiverPhone(String receiverPhone) {
        this.receiverPhone = receiverPhone;
    }

    public String getSenderPhone() {
        return senderPhone;
    }

    public void setSenderPhone(String senderPhone) {
        this.senderPhone = senderPhone;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
