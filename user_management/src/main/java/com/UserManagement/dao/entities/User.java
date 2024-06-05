package com.UserManagement.dao.entities;

import lombok.Getter;
import lombok.Setter;
import net.bytebuddy.asm.Advice;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "User")
@Setter
@Getter
public class User {

	@Id
	@Column(name = "phone",nullable = false)
	private String phone;

	@Column(name = "fullName")
	private String fullName;

	@Column(name = "birthDate")
	private LocalDate birthDate;

	@Column(name = "gender")
	private String gender;

	@Column(name = "password")
	private String password;

	@Column(name = "email",unique = true)
	private String email;

	@Column(name = "emailIsValid")
	private boolean emailIsVallid;

	@Column(name = "cni_recto")
	private String cniRecto;
	@Column(name = "cni_verso")
	private String cniVerso;

	@Column(name = "signature")
	private String Signature;

	@Column(name = "isActivated")
	private Boolean isActivated=false;

	@Column(name = "isBlocked")
	private Boolean isBlocked=false;

	@Column(name = "photo")
	private String photo;

	@Column(name = "CreationDate")
	private LocalDateTime CreationDate;


	@OneToMany(mappedBy="user")
	private List<Privilege> privilegelist = new ArrayList<Privilege>();



}