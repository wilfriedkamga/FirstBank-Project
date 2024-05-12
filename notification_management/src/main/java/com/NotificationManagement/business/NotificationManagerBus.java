package com.NotificationManagement.business;

import com.NotificationManagement.dao.repositories.NotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;


@Service
public class NotificationManagerBus  implements INotificationManagerBus {

	@Autowired
	NotificationRepository notificationRepository;

	@Override
	public boolean sendEmail(String dest, String msg){
		//todo implement logical business
		return true;
	}

}