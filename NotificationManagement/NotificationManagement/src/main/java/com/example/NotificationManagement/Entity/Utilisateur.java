package com.example.NotificationManagement.Entity;

import javax.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Utilisateur {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(updatable = false, nullable = false)
    private String id;

    private String phone;
    private String accesstoken;
    private boolean isActive;

    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL)
    private List<Notification2> notifications = new ArrayList<>();

    // getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAccesstoken() {
        return accesstoken;
    }

    public void setAccesstoken(String accesstoken) {
        this.accesstoken = accesstoken;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public List<Notification2> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification2> notifications) {
        this.notifications = notifications;
    }
}
