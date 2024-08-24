package com.afb.intern.savtont.service;

import com.afb.intern.savtont.config.PulsarConfig;
import com.afb.intern.savtont.dto.NotificationDto;
import com.afb.intern.savtont.models.Notification;
import com.afb.intern.savtont.repository.NotificationsRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.pulsar.client.api.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;

@RequiredArgsConstructor
@Service
public class NotificationConsumer {
    private final PulsarConfig pulsarConfig;
    private final NotificationService notificationService;

    @Value("${pulsar.topic.name}")
    private String topicName;

    @Value("${pulsar.subscription.name}")
    private String subscriptionName;

    @PostConstruct
    public void consumeNotifications() throws PulsarClientException {
        Consumer<NotificationDto> consumer = pulsarConfig.pulsarClient()
                .newConsumer(Schema.JSON(NotificationDto.class))
                .topic(topicName)
                .subscriptionType(SubscriptionType.Shared)
                .subscriptionName(subscriptionName)
                .messageListener((consumer1, msg) -> {
                    try {
                        NotificationDto notif = msg.getValue();
                        notificationService.processNotification(notif);
                        consumer1.acknowledge(msg);
                    } catch (PulsarClientException e) {
                        e.printStackTrace();
                    }
                })
                .subscribe();

    }
}
