package com.TontineManagement.dao.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.*;

@Entity
@Table(name = "Role")
@Setter
@Getter
public class Role {

	@SequenceGenerator(name = "role_id_seq", sequenceName = "role_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_id_seq")
	@Id
	@Column(name = "idRole",nullable = false)
	private int idRole;

	@Column(name = "roleName")
	private String roleName;

	@Column(name = "description")
	private String description;

	
	@OneToMany(mappedBy="role")
	private List<Privilege> privilegelist = new ArrayList<Privilege>();

	public int getIdRole() {
		return idRole;
	}

	public void setIdRole(int idRole) {
		this.idRole = idRole;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Privilege> getPrivilegelist() {
		return privilegelist;
	}

	public void setPrivilegelist(List<Privilege> privilegelist) {
		this.privilegelist = privilegelist;
	}
}