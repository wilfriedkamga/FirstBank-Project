package com.TontineManagement.dao.repositories;

import com.TontineManagement.dao.entities.Dette;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetteRepository extends JpaRepository<Dette, Integer> {

}