package com.UserManagement.dao.entities;

import lombok.Getter;
import lombok.Setter;
import net.bytebuddy.asm.Advice;
import org.hibernate.annotations.*;

import javax.persistence.*;
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

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCniRecto() {
		return cniRecto;
	}

	public boolean isEmailIsVallid() {
		return emailIsVallid;
	}

	public void setEmailIsVallid(boolean emailIsVallid) {
		this.emailIsVallid = emailIsVallid;
	}

	public void setCniRecto(String cniRecto) {
		this.cniRecto = cniRecto;
	}

	public String getCniVerso() {
		return cniVerso;
	}

	public void setCniVerso(String cniVerso) {
		this.cniVerso = cniVerso;
	}

	public String getSignature() {
		return Signature;
	}

	public void setSignature(String signature) {
		Signature = signature;
	}

	public Boolean getActivated() {
		return isActivated;
	}

	public void setActivated(Boolean activated) {
		isActivated = activated;
	}

	public Boolean getBlocked() {
		return isBlocked;
	}

	public void setBlocked(Boolean blocked) {
		isBlocked = blocked;
	}

	public LocalDateTime getCreationDate() {
		return CreationDate;
	}

	public void setCreationDate(LocalDateTime creationDate) {
		CreationDate = creationDate;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public List<Privilege> getPrivilegelist() {
		return privilegelist;
	}

	public void setPrivilegelist(List<Privilege> privilegelist) {
		this.privilegelist = privilegelist;
	}
}