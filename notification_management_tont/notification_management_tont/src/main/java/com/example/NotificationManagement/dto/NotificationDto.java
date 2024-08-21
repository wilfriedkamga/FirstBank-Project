package com.example.NotificationManagement.dto;

import com.example.NotificationManagement.Business.DateUtils;
import com.example.NotificationManagement.Entity.Notification2;

import java.util.Date;


public class NotificationDto {
    private String id;
    private String title;
    private String message;
    private boolean requiredConfirmation;
    private boolean statusConfirmation;
    private boolean isRead;
    private String timeStamp;
    private String imageUrl;

    public NotificationDto(String id, String title, String message, boolean requiredConfirmation, boolean statusConfirmation, boolean isRead, String timeStamp, String imageUrl) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.requiredConfirmation = requiredConfirmation;
        this.statusConfirmation = statusConfirmation;
        this.isRead = isRead;
        this.timeStamp = timeStamp;
        this.imageUrl = imageUrl;
    }

    public NotificationDto(Notification2 notification2) {
        this.id = notification2.getId();
        this.title =notification2.getTitle();
        this.message =notification2.getMessage();
        this.requiredConfirmation =notification2.isRequiredConfirmation();
        this.statusConfirmation =notification2.isStatusConfirmation();
        this.isRead = notification2.isRead();
        this.timeStamp = DateUtils.getTimeAgo(notification2.getCreationDate());
        this.imageUrl = notification2.getImageUrl();
    }

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

    public boolean isRequiredConfirmatin() {
        return requiredConfirmation;
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

    public void setRequiredConfirmatin(boolean requiredConfirmatin) {
        this.requiredConfirmation = requiredConfirmatin;
    }

    public boolean isUnRead() {
        return isRead;
    }

    public void setUnRead(boolean unRead) {
        this.isRead = unRead;
    }

    public String getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(String timeStamp) {
        this.timeStamp = timeStamp;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
