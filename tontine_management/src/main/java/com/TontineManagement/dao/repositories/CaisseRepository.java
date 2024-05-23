package com.TontineManagement.dao.repositories;


import com.TontineManagement.dao.entities.Caisse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CaisseRepository extends JpaRepository<Caisse, Integer> {

  Optional<Caisse> findById(String id);

}
