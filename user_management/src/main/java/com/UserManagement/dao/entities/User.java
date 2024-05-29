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

	@Column(name = "email")
	private String email;

	@Column(name = "idCardImage")
	private String idCardImage;

	@Column(name = "idCardExpirationDate")
	private LocalDate idCardExpirationDate;

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

	public String getIdCardImage() {
		return idCardImage;
	}

	public void setIdCardImage(String idCardImage) {
		this.idCardImage = idCardImage;
	}

	public LocalDate getIdCardExpirationDate() {
		return idCardExpirationDate;
	}

	public void setIdCardExpirationDate(LocalDate idCardExpirationDate) {
		this.idCardExpirationDate = idCardExpirationDate;
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