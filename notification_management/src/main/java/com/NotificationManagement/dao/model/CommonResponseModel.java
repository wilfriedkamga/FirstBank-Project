package com.NotificationManagement.dao.model;

import lombok.*;
import java.util.*;

@Getter
@Setter
public class CommonResponseModel {
	private String message;

	private String responseCode;

	private Object data;

}