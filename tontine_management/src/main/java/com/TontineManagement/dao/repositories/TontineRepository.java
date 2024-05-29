package com.TontineManagement.dao.repositories;

import com.TontineManagement.dao.entities.Tontine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TontineRepository extends JpaRepository<Tontine, String> {

    Optional<Tontine> findById(String IdTontine);

}