package com.example.NotificationManagement.Controller;

import com.example.NotificationManagement.Business.NotificationService;
import com.example.NotificationManagement.Entity.Notification2;
import com.example.NotificationManagement.Modele.CommonResponseModel;
import com.example.NotificationManagement.Modele.CreateNotifModel;
import com.example.NotificationManagement.Modele.SendInvitationModel;
import com.example.NotificationManagement.dto.NotificationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@RequestMapping(value = "/api/notificationmanagement")
@Controller
public class NotificationController {


    @Autowired
    private NotificationService notificationService;

    @Autowired
    private MessageSource messageSource;

    @PostMapping("/email")
    public ResponseEntity<String> sendEmail(@RequestParam String to, @RequestParam String subject, @RequestParam String text) {
        notificationService.sendEmail(to, subject, text);
        return ResponseEntity.ok("Email sent successfully");
    }

    @PostMapping("/sms")
    public ResponseEntity<String> sendSms(@RequestParam String phone, @RequestParam String message) {
        notificationService.sendSmsToApi(phone, message);
        return ResponseEntity.ok("SMS sent successfully");
    }

    @PostMapping("/sendInvitation")
    public ResponseEntity<String> sendInvitation(@RequestBody SendInvitationModel sendInvitationModel) {
        System.out.println("passe bien ici"+sendInvitationModel.getEmetPhone()+sendInvitationModel.getDestPhone());
        String message="L'utilisateur avec le numéro "+sendInvitationModel.getEmetPhone()+"vous invite à rejoindre la meilleur plateforme " +
                "de gestion des tontines. via le lien suivant: www.firstsaving.ddns.net pour participer aux tontines avec lui. ";
        notificationService.sendSmsToApi(sendInvitationModel.getDestPhone(), message);
        return ResponseEntity.ok("SMS sent successfully");
    }

    @PostMapping("/registerTokenPhone")
    public ResponseEntity<String> registerPhonesToken(@RequestBody String phone, @RequestParam String token) {

        notificationService.registerTokenPhone(phone,token);
        return ResponseEntity.ok("sucess of registration");
    }

    @PostMapping("/pushNotificationByToken")
    public ResponseEntity<String> sendPushNotificationByToken(@RequestParam String recipientToken, @RequestParam String title, @RequestParam String messageBody) {
        notificationService.sendPushNotification(recipientToken, title, messageBody);
        return ResponseEntity.ok("Push notification sent successfully");
    }

    @PostMapping("/pushNotificationByPhone")
    public ResponseEntity<String> sendPushNotificationByPhone(@RequestParam String phone, @RequestParam String title, @RequestParam String messageBody) {
        notificationService.sendPushNotificationWithPhone(phone, title, messageBody);
        return ResponseEntity.ok("Push notification sent successfully");
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendNotification(@RequestBody  CreateNotifModel createNotifModel) {

        System.out.println("Voici le numero de telephone voici les pbs");
        Notification2 notification2=notificationService.sendNotification(createNotifModel);
        List<String > data=new ArrayList<>();
        data.add(notification2.getId());
        data.add(notification2.getTitle());
        data.add(notification2.getMessage());
        data.add(notification2.getUtilisateur().getPhone());

        CommonResponseModel commonResponseModel=new CommonResponseModel("Sucess", "0",data);
        System.out.println("Voici le numero de telephone"+createNotifModel.getReceiverPhone());
        return ResponseEntity.ok().body(commonResponseModel);
    }

    @GetMapping("/getNotifications")
    public ResponseEntity<?> getNotifications(@RequestParam String phone) {
        System.out.println("passe dans get notifications");
        List<NotificationDto> notificationDtos=notificationService.getNotifications(phone);
        CommonResponseModel commonResponseModel=new CommonResponseModel("Sucess", "0",notificationDtos);

        return ResponseEntity.ok().body(commonResponseModel);
    }


    @PostMapping("/read")
    public void readNotifications(@RequestBody List<String> notificationIds, @RequestParam String phone) {
        notificationService.readNotifications(notificationIds, phone);
    }

    @PostMapping("/answerNotification")
    public void answerNotifications(@RequestBody String notificationId, @RequestParam boolean status) {
        notificationService.answerNotification(notificationId, status);
    }



    @DeleteMapping("/delete/{notificationId}")
    public void deleteNotification(@PathVariable String notificationId) {
        notificationService.deleteNotification(notificationId);
    }


}
