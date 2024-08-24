package com.afb.intern.savtont.repository;

import com.afb.intern.savtont.models.Recipient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecipientRepository extends JpaRepository<Recipient, String> {
    Recipient findByRecipientAndToken(String phoneNumber, String token);
    Optional<Recipient> findByRecipient(String recipient);
}
