package com.TontineManagement.dao.repositories;


import com.TontineManagement.dao.entities.Validation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ValidationRepository extends JpaRepository<Validation, Integer> {
    Optional<Validation> findByPhone(String phone);

    int deleteByPhone(String phone);


}
