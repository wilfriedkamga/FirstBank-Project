package com.afb.intern.savtont.config;

import com.afb.intern.savtont.dto.NotificationDto;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.apache.pulsar.client.api.Producer;
import org.apache.pulsar.client.api.PulsarClient;
import org.apache.pulsar.client.api.PulsarClientException;
import org.apache.pulsar.client.api.Schema;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
@Data
public class PulsarConfig {

    @Value("${pulsar.service-url}")
    private String pulsarServiceurl;

    @Value("${pulsar.topic.name}")
    private String topicName;


    @Bean
    public PulsarClient pulsarClient() throws PulsarClientException {
        return PulsarClient.builder()
                .serviceUrl(pulsarServiceurl)
                .build();
    }

    @Bean
    public Producer<NotificationDto> notificationProducer() throws PulsarClientException {
        return pulsarClient().newProducer(Schema.JSON(NotificationDto.class))
                .topic(topicName)
                .create();
    }
}
