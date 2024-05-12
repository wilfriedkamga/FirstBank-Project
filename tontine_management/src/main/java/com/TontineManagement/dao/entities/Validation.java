package com.TontineManagement.dao.entities;

import lombok.*;
import lombok.Setter;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.Instant;

import static java.time.temporal.ChronoUnit.MINUTES;

/**
 * Base class to represent auditing details of each entity
 *
 * Timestamps and user details are stored for each change made to the entity.
 *
 * Timestamps are recorded in UTC time, adjust accordingly to see timestamp in current zone
 *
 * Default user is 'SYSTEM'.
 */
@Entity
@Table(name = "validation")
@Setter
@Getter
public class Validation{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String code;
	private String message;
	private Instant creation=Instant.now();
	private Instant expiration=Instant.now().plus(2, MINUTES);
	private Instant activation;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    private String phone;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Instant getCreation() {
        return creation;
    }

    public void setCreation(Instant creation) {
        this.creation = creation;
    }

    public Instant getExpiration() {
        return expiration;
    }

    public void setExpiration(Instant expiration) {
        this.expiration = expiration;
    }

    public Instant getActivation() {
        return activation;
    }

    public void setActivation(Instant activation) {
        this.activation = activation;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @OneToOne(cascade = CascadeType.ALL)
	private User user;

}
