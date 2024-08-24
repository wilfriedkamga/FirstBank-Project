package com.NotificationManagement.dao.model;

import lombok.*;
import java.util.*;

@Setter
@Getter
public class SendEmailModel {

	private String dest;

	private String msg;

	public String getDest() {
		return dest;
	}

	public void setDest(String dest) {
		this.dest = dest;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
}