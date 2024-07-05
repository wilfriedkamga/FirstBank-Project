package com.example.NotificationManagement.Repository;

import com.example.NotificationManagement.Entity.Notification2;
import com.example.NotificationManagement.Entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.NotificationManagement.Entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification2, String> {



}