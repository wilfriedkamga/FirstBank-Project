package com.NotificationManagement.dao.model;

import lombok.*;
import java.util.*;

@Getter
@Setter
public class CommonResponseModel {
	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getResponseCode() {
		return responseCode;
	}

	public void setResponseCode(String responseCode) {
		this.responseCode = responseCode;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	private String responseCode;

	private Object data;


}