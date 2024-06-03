package com.afb.intern.savingsplanmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class SavingsPlanManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(SavingsPlanManagementApplication.class, args);
    }

}
