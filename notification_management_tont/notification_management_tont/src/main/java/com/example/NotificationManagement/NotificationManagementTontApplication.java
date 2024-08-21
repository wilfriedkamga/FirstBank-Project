package com.example.NotificationManagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;


@SpringBootApplication

public class NotificationManagementTontApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotificationManagementTontApplication.class, args);
	}

	@Bean
    public WebClient.Builder getWebClient(){
	  return WebClient.builder();
	}
}
