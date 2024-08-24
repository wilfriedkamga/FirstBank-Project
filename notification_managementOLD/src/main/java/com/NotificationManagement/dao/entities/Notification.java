package com.NotificationManagement.dao.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "Notification")
@Setter
@Getter
public class Notification extends BaseAuditEntity {

	@Id
	@Column(name = "idNotif",nullable = false)
	private Long idNotif;

	@Column(name = "recipient")
	private String recipient;

	@Column(name = "message")
	private Boolean message;

	@Column(name = "state")
	private Boolean state;

	
}