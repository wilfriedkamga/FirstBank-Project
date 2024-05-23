package com.TontineManagement.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000") // Autoriser l'origine http://localhost:3001
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Autoriser les méthodes HTTP
                .allowCredentials(true); // Autoriser les cookies et les en-têtes d'autorisation si nécessaire
    }
}
