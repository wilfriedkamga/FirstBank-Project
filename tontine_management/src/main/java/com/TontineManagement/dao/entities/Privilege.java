package com.TontineManagement.dao.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "Privilege")
@Setter
@Getter
public class Privilege {

	@SequenceGenerator(name = "privilege_id_seq", sequenceName = "privilege_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "privilege_id_seq")
	@Id
	@Column(name = "idPrivilege",nullable = false)
	private Long idPrivilege;

	
	@ManyToOne
	@JoinColumn(name="phone",referencedColumnName="phone")
	private User user;

	@ManyToOne
	@JoinColumn(name="idRole",referencedColumnName="idRole")
	private Role role;

	public Long getIdPrivilege() {
		return idPrivilege;
	}

	public void setIdPrivilege(Long idPrivilege) {
		this.idPrivilege = idPrivilege;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
}