package com.NotificationManagement.controller;

import com.NotificationManagement.business.INotificationManagerBus;
import com.NotificationManagement.dao.model.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import java.util.*;


@RestController
@RequestMapping(value = "/api/notificationmanagement")
public class NotificationManagerController{

	@Autowired
	INotificationManagerBus notificationmanagerBus;

	@PostMapping(value = "/sendemail")
	public ResponseEntity sendEmail(@RequestBody SendEmailModel sendEmailModel){

		CommonResponseModel response = new CommonResponseModel();

			response.setMessage("Success");
			response.setResponseCode("0");
			notificationmanagerBus.sendEmail(sendEmailModel.getDest(),sendEmailModel.getMsg());

			return new ResponseEntity(response, HttpStatus.OK);

	}

}