package com.TontineManagement.dao.repositories;

import com.TontineManagement.dao.entities.MembresTontine;
import com.TontineManagement.dao.entities.Tontine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface MembreTontineRepository extends JpaRepository<MembresTontine, String> {

    Optional<MembresTontine> findByIdutiliateur(String id_utilisateur);

}