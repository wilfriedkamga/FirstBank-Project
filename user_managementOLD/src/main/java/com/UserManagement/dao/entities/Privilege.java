package com.UserManagement.dao.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Privilege")
@Getter
@Setter
public class Privilege {

	@SequenceGenerator(name = "privilege_id_seq", sequenceName = "privilege_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "privilege_id_seq")
	@Id
	@Column(name = "idPrivilege", nullable = false)
	private Long idPrivilege;

	@Column(name = "name")
	private String name;

	// Un privilège peut appartenir à plusieurs rôles
	@ManyToMany(mappedBy = "privileges")
	private List<Role> roles;


}
