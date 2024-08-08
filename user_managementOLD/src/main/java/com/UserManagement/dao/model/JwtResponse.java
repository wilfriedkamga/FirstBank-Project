package com.UserManagement.dao.model;

import com.UserManagement.dao.entities.User;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class JwtResponse{

	private String jwttoken;
	private Object user;

	public String getJwttoken() {
		return jwttoken;
	}

	public void setJwttoken(String jwttoken) {
		this.jwttoken = jwttoken;
	}

	public Object getUser() {
		return user;
	}

	public void setUser(Object user) {
		this.user = user;
	}

	public JwtResponse(String jwttoken, Object user) {
		this.jwttoken = jwttoken;
		this.user = user;
	}
}