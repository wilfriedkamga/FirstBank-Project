package com.afb.intern.savtont.service;


import com.afb.intern.savtont.dto.NotificationDto;
import com.afb.intern.savtont.dto.RecipientDto;
import com.afb.intern.savtont.dto.SendOtpDto;
import com.afb.intern.savtont.dto.SmsRequest;
import com.afb.intern.savtont.exception.AppException;
import com.afb.intern.savtont.models.Notifi_Recipient;
import com.afb.intern.savtont.models.Notification;
import com.afb.intern.savtont.models.Recipient;
import com.afb.intern.savtont.repository.NotifRecipientRepository;
import com.afb.intern.savtont.repository.NotificationsRepository;
import com.afb.intern.savtont.repository.RecipientRepository;
import com.google.firebase.messaging.FirebaseMessagingException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.*;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationsRepository notificationsRepository;
    private final RecipientRepository recipientRepository;
    private final NotifRecipientRepository notifRecipientRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final FCMService fcmService;
    private final JavaMailSender mailSender;
    private final ModelMapper modelMapper = new ModelMapper();

    public void sendSMS(SendOtpDto sendOtpDto) {

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("X-Api-Key", "2C250CF6-0B66-41D5-A7A5-59EC8B6942E0");
        headers.add("X-Secret", "Fa20uInW2h2n3IpWs0f4NY6BRcPmC8snBioUcRJHmU9pC7");
        headers.add("Host", "sms.lmtgroup.com");
        // System.getenv("API_KEY")System.getenv("API_SECRET")
        SmsRequest request = new SmsRequest();
        request.setSenderId("FirstSaving");
        request.setMessage(sendOtpDto.getMsg());
        request.setMsisdn(Collections.singletonList(sendOtpDto.getRecipient()));
        request.setMaskedMsisdn(false);
        request.setFlag("GSM7");

        HttpEntity<SmsRequest> entity = new HttpEntity<>(request, headers);

        ResponseEntity<String> response = restTemplate.postForEntity("https://sms.lmtgroup.com/api/v1/pushes", entity, String.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            Notification OtpNotif = modelMapper.map(sendOtpDto, Notification.class);
            OtpNotif.setId(UUID.randomUUID().toString());
            OtpNotif.setState("sent");
            OtpNotif.setCreatedDate(new Date());
            OtpNotif.setStatus("not verified");
            Notification notifsaved = notificationsRepository.save(OtpNotif);
        }

    }

    public void sendMail(SendOtpDto sendOtpDto){

        if(sendOtpDto == null) {
            throw new IllegalArgumentException("sendOtp cannot be null");
        }
        String recipient = sendOtpDto.getRecipient();
        if (recipient == null || recipient.trim().isEmpty()){
            throw new IllegalArgumentException("Recipient email cannot be null or empty");
        }

        System.out.println("Recipient email: "+ recipient);

        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom("renenlom9@gmail.com");
            mail.setTo(sendOtpDto.getRecipient());
            mail.setSubject("Account activation");
            mail.setText(sendOtpDto.getMsg());

            mailSender.send(mail);

            System.out.println("Email sent successfully to "+ recipient);
        } catch (Exception e) {
            e.printStackTrace();
            throw new MailSendException("Failed to send email to "+ recipient, e);
        }

    }


    public NotificationDto saveNotification(NotificationDto notif) {
        Notification notification = modelMapper.map(notif, Notification.class);
        Notification savedNotif = notificationsRepository.save(notification);
        Set<String> recipients = notif.getRecipient();
        for (String recipient : recipients) {
            messagingTemplate.convertAndSendToUser(recipient, "/queue/notifications", modelMapper.map(savedNotif, NotificationDto.class));
        }
        return modelMapper.map(savedNotif, NotificationDto.class);

    }

    public List<NotificationDto> getNotificationsForUser(String phone){
        List<Notification> notifications = notificationsRepository.findAllByRecipient(phone);

        return notifications.stream()
                .map(notification -> modelMapper.map(notification, NotificationDto.class))
                .collect(Collectors.toList());
    }

    public void storeToken(RecipientDto recipientDto) throws FirebaseMessagingException {
        Recipient existingRecipient = recipientRepository.findByRecipientAndToken(recipientDto.getRecipient(), recipientDto.getToken());
        if (existingRecipient!= null) {
            existingRecipient.setToken(recipientDto.getToken());
            recipientRepository.save(existingRecipient);
        } else {
            Recipient recipient = modelMapper.map(recipientDto, Recipient.class);
            recipient.setId(UUID.randomUUID().toString());
            recipientRepository.save(recipient);

            fcmService.subcribeToTopic(recipient.getToken(), "predefined_plan");
        }
    }

    public void processNotification(NotificationDto notificationDto) {
        Notification notification = modelMapper.map(notificationDto, Notification.class);
        notification.setCreatedDate(new Date());
        notification.setState("created");
        notification.setStatus("not read");
        Notification savedNotif = notificationsRepository.save(notification);

        if (notificationDto.isFrontendDisplay()) {
            Set<String> recipients = notificationDto.getRecipient();
            String message = notificationDto.getMsg();
            for (String recipient : recipients) {
                try {
                    Recipient recipient1 = recipientRepository.findByRecipient(recipient)
                                    .orElseThrow(()-> new AppException("Unknown user", HttpStatus.NOT_FOUND));
                    fcmService.sendNotification(recipient1.getToken(), message);
                    messagingTemplate.convertAndSendToUser(recipient, "/queue/notifications", notificationDto);
                    Notifi_Recipient recipientNotification = new Notifi_Recipient();
                    recipientNotification.setId(UUID.randomUUID().toString());
                    recipientNotification.setNotification(savedNotif);
                    recipientNotification.setRecipient(recipient1);
                    notifRecipientRepository.save(recipientNotification);
                } catch (FirebaseMessagingException e) {
                    e.printStackTrace();
                } catch (ExecutionException e) {
                    throw new RuntimeException(e);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        }

    }
    
}
