package com.example.AssociationManagement.Config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@ConfigurationProperties(prefix = "association")
public class DefaultRolesConfig {

    private List<String> defaultRoles;
    private List<String> uniqueRoles;
    private List<String> frequenceReunion;

    public List<String> getDefaultRoles() {
        return defaultRoles;
    }

    public void setDefaultRoles(List<String> defaultRoles) {
        this.defaultRoles = defaultRoles;
    }

    public List<String> getUniqueRoles() {
        return uniqueRoles;
    }

    public void setUniqueRoles(List<String> uniqueRoles) {
        this.uniqueRoles = uniqueRoles;
    }

    public List<String> getFrequenceReunion() {
        return frequenceReunion;
    }

    public void setFrequenceReunion(List<String> frequenceReunion) {
        this.frequenceReunion = frequenceReunion;
    }
}