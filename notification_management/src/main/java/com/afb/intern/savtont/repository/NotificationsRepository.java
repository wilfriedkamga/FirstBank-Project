package com.afb.intern.savtont.repository;

import com.afb.intern.savtont.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotificationsRepository extends JpaRepository<Notification, String> {

    @Query("SELECT n FROM Notification n JOIN Recipient r WHERE r.recipient = :recipient")
    List<Notification> findAllByRecipient(@Param("recipient") String recipient);
}
