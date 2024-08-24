package com.afb.intern.savtont.controller;

import com.afb.intern.savtont.dto.*;
import com.afb.intern.savtont.service.NotificationService;
import com.google.firebase.messaging.FirebaseMessagingException;
import lombok.RequiredArgsConstructor;
import org.apache.pulsar.client.api.Producer;
import org.apache.pulsar.client.api.PulsarClientException;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class NotificationsController {
    private final NotificationService notificationService;
    private final Producer<NotificationDto> notificationDtoProducer;
    private final ModelMapper modelMapper = new ModelMapper();

    @PostMapping("/notificationManagement/sendOtpCode")
    public ResponseEntity<Void> sendOtp(@RequestBody SendOtpDto sendOtpDto){
        notificationService.sendSMS(sendOtpDto);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }


    @MessageMapping("/notifications")
    @SendTo("/topic/notifications")
    public NotificationDto sendNotifications(ServFrontDto notif){
        NotificationDto notification = modelMapper.map(notif, NotificationDto.class);
        notification.setId(UUID.randomUUID().toString());
        notificationService.saveNotification(notification);
        return notification;
    }


    @MessageMapping("/notifications/subscribe")
    @SendTo("/topic/notifications")
    public List<NotificationDto> subscribeNotifications(SimpMessageHeaderAccessor headerAccessor) {
        String recipient = (String) headerAccessor.getSessionAttributes().get("username");
        return notificationService.getNotificationsForUser(recipient);
    }

    @PostMapping("/notificationManagement/storeNotification")
    public ResponseEntity<Void> storeNotification(@RequestBody NotificationDto notificationDto) {
        try {
            notificationDtoProducer.send(notificationDto);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (PulsarClientException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @PostMapping("/notificationManagement/storeToken")
    public ResponseEntity<Void> storeToken(@RequestBody RecipientDto recipientDto) throws FirebaseMessagingException {
        notificationService.storeToken(recipientDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/notificationManagement/sendEmail")
    public ResponseEntity<Void> sendEmail(@RequestBody SendOtpDto sendOtpDto) {
        notificationService.sendMail(sendOtpDto);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }
}
