package com.TontineManagement.dao.repositories;

import com.TontineManagement.dao.entities.Cotisation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CotisationRepository extends JpaRepository<Cotisation, Long> {

}