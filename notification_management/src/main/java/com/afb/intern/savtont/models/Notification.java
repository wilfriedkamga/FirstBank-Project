package com.afb.intern.savtont.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    private String id;

    @Column(name = "message", nullable = false)
    private String msg;

    @OneToMany(mappedBy = "notification", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Notifi_Recipient> recipients;

    @Column(name = "state", nullable = false)
    private String state;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "issuedTime", nullable = false)
    private Date createdDate;

    @Column(name = "displayedOnUI", nullable = false)
    private boolean frontendDisplay;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Set<Notifi_Recipient> getRecipients() {
        return recipients;
    }

    public void setRecipients(Set<Notifi_Recipient> recipients) {
        this.recipients = recipients;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public boolean isFrontendDisplay() {
        return frontendDisplay;
    }

    public void setFrontendDisplay(boolean frontendDisplay) {
        this.frontendDisplay = frontendDisplay;
    }
}
