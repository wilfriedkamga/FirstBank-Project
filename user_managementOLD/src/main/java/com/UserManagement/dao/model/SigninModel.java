package com.UserManagement.dao.model;

import com.sun.istack.NotNull;
import lombok.*;
import java.util.*;


public class SigninModel {

	private String phone;

	private String password;


	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}