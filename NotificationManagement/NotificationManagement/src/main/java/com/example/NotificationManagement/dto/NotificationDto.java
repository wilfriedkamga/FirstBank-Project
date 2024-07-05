package com.example.NotificationManagement.dto;

import com.example.NotificationManagement.Entity.Notification2;

public class NotificationDto {
    private String id;
    private String title;
    private String message;
    private String phone;

    public NotificationDto(Notification2 notification2) {
        this.id = notification2.getId();
        this.title = notification2.getTitle();
        this.message =notification2.getMessage();
        this.phone =notification2.getUtilisateur().getPhone();

    }

    public NotificationDto(String id, String title, String message, String phone) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.phone = phone;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
