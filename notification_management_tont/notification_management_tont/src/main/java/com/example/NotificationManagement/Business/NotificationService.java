package com.example.NotificationManagement.Business;


import com.example.NotificationManagement.Entity.Notification2;
import com.example.NotificationManagement.Entity.Utilisateur;
import com.example.NotificationManagement.Modele.CommonResponseModel;
import com.example.NotificationManagement.Modele.CreateNotifModel;
import com.example.NotificationManagement.Repository.NotificationRepository;
import com.example.NotificationManagement.Repository.UtilisateurRepository;
import com.example.NotificationManagement.dto.NotificationDto;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class NotificationService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${usermanagement.api.url}")
    private String userManagementApiUrl;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    public void sendSmsToApi(String phone, String message) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Api-Key", "2C250CF6-0B66-41D5-A7A5-59EC8B6942E0");
        headers.set("X-Secret", "Fa20uInW2h2n3IpWs0f4NY6BRcPmC8snBioUcRJHmU9pC7");
        headers.set("Content-Type", "application/json");

        Map<String, Object> payload = new HashMap<>();
        payload.put("senderId", "FirstSaving");
        payload.put("message", message);
        payload.put("msisdn", new String[]{phone});
        payload.put("maskedMsisdn", false);
        payload.put("flag", "GSM7");

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                "https://sms.lmtgroup.com/api/v1/pushes",
                HttpMethod.POST,
                request,
                String.class
        );

        System.out.println(response.getBody());
    }

    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    private boolean isUserExist(String phone) {
        String url = userManagementApiUrl + "/userExist";
        Map<String, String> requestBody = Map.of("phone", phone);
        ResponseEntity<CommonResponseModel> responseEntity = restTemplate.postForEntity(url, requestBody, CommonResponseModel.class);
        CommonResponseModel response = responseEntity.getBody();

        return response != null && "0".equals(response.getResponseCode());
    }


    public Utilisateur getUtilisateurByPhone(String phone) {
        return utilisateurRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("Utilisateur not found"));
    }


    public Notification2 sendNotification(CreateNotifModel createNotifModel) {
        // Vérifier si l'utilisateur existe

        String url = userManagementApiUrl + "/userExist";

        Map<String, String> requestBody = Map.of("phone", createNotifModel.getPhone());
        ResponseEntity<CommonResponseModel> responseEntity = restTemplate.postForEntity(url, requestBody, CommonResponseModel.class);
        CommonResponseModel response = responseEntity.getBody();

        if ( !(response != null && "0".equals(response.getResponseCode()))) {
            throw new RuntimeException("Utilisateur not found in user management service");
        }

        @SuppressWarnings("unchecked")
        Map<String, Object> userDetails = (Map<String, Object>) response.getData();
        String phone = (String) userDetails.get("phone");

        Utilisateur utilisateur = utilisateurRepository.findByPhone(createNotifModel.getPhone()).orElse(null);
        if(utilisateur == null){
            utilisateur=new Utilisateur();
            utilisateur.setPhone(phone);
        }
        System.out.println("passe bien par ici");

        Notification2 notification = new Notification2();
        notification.setTitle(createNotifModel.getTitle());
        notification.setMessage(createNotifModel.getMessage());
        notification.setRead(false);
        notification.setUtilisateur(utilisateur);
        System.out.println("passe bien par ici2");

        System.out.println("passe bien par ici3");
        Utilisateur utilisateur1 =utilisateurRepository.save(utilisateur);
        Notification2 notification2=notificationRepository.save(notification);
        utilisateur1.getNotifications().add(notification2);
        utilisateurRepository.save(utilisateur);
        return notification2;
    }


    public List<NotificationDto> getNotifications(String phone) {
        Utilisateur utilisateur = getUtilisateurByPhone(phone);
        System.out.println("passe dans le service1");
        List<Notification2> notifications =utilisateur.getNotifications();
        List<NotificationDto> notificationDtos=new ArrayList<>();
        if(notifications.isEmpty()){return null;}

        for(Notification2 notif:notifications){
            notificationDtos.add(new NotificationDto(notif));
        }
        System.out.println("passe dans le service2");
        return notificationDtos;
    }

    @Transactional
    public void readNotifications(List<String> notificationIds, String phone) {
        Utilisateur utilisateur = getUtilisateurByPhone(phone);

        List<Notification2> notifications = notificationRepository.findAllById(notificationIds);
        notifications.forEach(notification -> {
            if (utilisateur.getNotifications().contains(notification)) {
                notification.setRead(true);
            }
        });

        notificationRepository.saveAll(notifications);
    }


    @Transactional
    public void deleteNotification(String notificationId) {
        Notification2 notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        // Dissocier la notification de son utilisateur
        Utilisateur utilisateur = notification.getUtilisateur();
        if (utilisateur != null) {
            utilisateur.getNotifications().remove(notification);
            notification.setUtilisateur(null); // Dissocier la notification de l'utilisateur
            utilisateurRepository.save(utilisateur); // Mise à jour de l'utilisateur en base de données
        }

        // Supprimer la notification de la base de données
        notificationRepository.delete(notification);
    }

}
