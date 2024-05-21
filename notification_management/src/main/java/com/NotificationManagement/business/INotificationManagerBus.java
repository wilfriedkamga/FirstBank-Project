package com.NotificationManagement.business;

import com.NotificationManagement.dao.entities.*;
import java.util.*;

public interface INotificationManagerBus {

	boolean sendEmail(String dest, String msg);
	boolean sendSms(String dest, String msg);

}