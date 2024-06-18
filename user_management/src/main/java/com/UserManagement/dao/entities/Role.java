package com.UserManagement.dao.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Role")
@Getter
@Setter
public class Role {

	@SequenceGenerator(name = "role_id_seq", sequenceName = "role_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_id_seq")
	@Id
	@Column(name = "idRole", nullable = false)
	private Long idRole;

	@Column(name = "roleName")
	private String roleName;

	@Column(name = "description")
	private String description;

	// Un rôle peut avoir plusieurs privilèges
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "roles_privileges",
			joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "idRole"),
			inverseJoinColumns = @JoinColumn(name = "privilege_id", referencedColumnName = "idPrivilege"))
	private List<Privilege> privileges;

	// Un rôle peut être attribué à plusieurs utilisateurs
	@ManyToMany(mappedBy = "roles")
	private List<User> users;

	public Long getIdRole() {
		return idRole;
	}

	public void setIdRole(Long idRole) {
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

	public List<Privilege> getPrivileges() {
		return privileges;
	}

	public void setPrivileges(List<Privilege> privileges) {
		this.privileges = privileges;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}
}
