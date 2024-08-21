package com.example.NotificationManagement.Repository;

import com.example.NotificationManagement.Entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, String> {
   public Optional<Utilisateur> findByPhone(String phone);

    Optional<Utilisateur> findByPhoneAndAccesstoken(String phone, String accessToken);
    Optional<Utilisateur> findByAccesstoken(String accessToken);
}