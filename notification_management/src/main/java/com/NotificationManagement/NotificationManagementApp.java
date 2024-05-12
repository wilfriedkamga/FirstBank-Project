package com.NotificationManagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class NotificationManagementApp {
    public static void main(String[] args) {

        SpringApplication.run(NotificationManagementApp.class, args);

    }

}