package com.APIGateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@SpringBootApplication
@EnableZuulProxy
public class APIGatewayApp {
	public static void main(String[] args) {

		SpringApplication.run(APIGatewayApp.class, args);

	}

}