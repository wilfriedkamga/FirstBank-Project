package com.UserManagement.dao.repositories;


import com.UserManagement.dao.entities.Validation_Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ValidationEmailRepository extends  JpaRepository<Validation_Email, Integer>{
    Optional<Validation_Email> findByEmail( String email);

    int deleteByEmail(String email);
}

