package com.example.NotificationManagement.Business;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public class DateUtils {
    public static String getTimeAgo(Date date) {
        Instant instant = date.toInstant();
        LocalDateTime dateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
        Duration duration = Duration.between(dateTime, LocalDateTime.now());

        long seconds = duration.getSeconds();
        if (seconds < 60) {
            return "il y a quelques secondes";
        } else if (seconds < 3600) {
            long minutes = seconds / 60;
            return "il y a " + minutes + " minute" + (minutes > 1 ? "s" : "");
        } else if (seconds < 86400) {
            long hours = seconds / 3600;
            return "il y a " + hours + " heure" + (hours > 1 ? "s" : "");
        } else if (seconds < 604800) {
            long days = seconds / 86400;
            return "il y a " + days + " jour" + (days > 1 ? "s" : "");
        } else if (seconds < 2592000) {
            long weeks = seconds / 604800;
            return "il y a " + weeks + " semaine" + (weeks > 1 ? "s" : "");
        } else if (seconds < 31536000) {
            long months = seconds / 2592000;
            return "il y a " + months + " mois";
        } else {
            long years = seconds / 31536000;
            return "il y a " + years + " an" + (years > 1 ? "s" : "");
        }
    }
}