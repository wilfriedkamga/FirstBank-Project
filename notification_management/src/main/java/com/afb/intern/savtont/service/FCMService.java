package com.afb.intern.savtont.service;

import com.google.api.core.ApiFuture;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.TopicManagementResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class FCMService {
    public void sendNotification(String token, String message) throws FirebaseMessagingException, ExecutionException, InterruptedException {
        Message msg = Message.builder()
                .setToken(token)
                .putData("message", message)
                .build();
        String response = FirebaseMessaging.getInstance().sendAsync(msg).get();
        System.out.println("Sent notification: " + response);
    }

    public void sendToTopic(String topic, String message) throws FirebaseMessagingException, ExecutionException, InterruptedException {
        Message msg = Message.builder()
                .setTopic(topic)
                .putData("message", message)
                .build();
        String response = FirebaseMessaging.getInstance().sendAsync(msg).get();
        System.out.println("Sent notification to topic: " + topic);
    }

    public void subcribeToTopic(String token, String topic) throws FirebaseMessagingException {
        List<String> tokens = Collections.singletonList(token);
        ApiFuture<TopicManagementResponse> response = FirebaseMessaging.getInstance().subscribeToTopicAsync(tokens, topic);
        try {
            TopicManagementResponse result = response.get();
            System.out.println("Subscribed to topic: " + result.getSuccessCount());
        } catch (InterruptedException | ExecutionException e) {
            System.out.println("Error subscribing to topic: " + e.getMessage());
        }
    }

    public void unsubscribeFromTopic(String token, String topic) throws FirebaseMessagingException {
        List<String> tokens = Collections.singletonList(token);
        ApiFuture<TopicManagementResponse> response = FirebaseMessaging.getInstance().unsubscribeFromTopicAsync(tokens, topic);
        try {
            TopicManagementResponse result = response.get();
            System.out.println("Unsubscribed from topic: " + result.getSuccessCount());
        } catch (InterruptedException | ExecutionException e) {
            System.out.println("Error unsubscribing from topic: " + e.getMessage());
        }
    }
}
