package com.TontineManagement.dao.repositories;

import com.TontineManagement.dao.entities.MembresCaisse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;


@Repository
public interface MembresCaisseRepository extends JpaRepository<MembresCaisse, String> {



}