package com.UserManagement.dao.model;

import com.sun.istack.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.*;

@Setter
@Getter
public class SignupModel {

	@NotNull
	private String phone;

	private String fullname;

	private LocalDate birthDate;

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	private String password;

	private String gender;

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}