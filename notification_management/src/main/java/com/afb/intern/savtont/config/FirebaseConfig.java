package com.afb.intern.savtont.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;

@Configuration
@RequiredArgsConstructor
@Data
public class FirebaseConfig {

    @Value("${app.firebase-configuration-file}")
    private String firebaseConfig;

    @Bean
    public FirebaseOptions options() throws IOException {
        return new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(new ClassPathResource(firebaseConfig).getInputStream()))
                .build();
    }

    @Bean
    public FirebaseApp firebaseApp(FirebaseOptions firebaseOptions) {
        return FirebaseApp.initializeApp(firebaseOptions);
    }
}
