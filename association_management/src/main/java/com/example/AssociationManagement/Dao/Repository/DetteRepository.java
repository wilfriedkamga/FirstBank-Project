package com.example.AssociationManagement.Dao.Repository;


import com.example.AssociationManagement.Dao.Entity.Dette;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetteRepository extends JpaRepository<Dette, String> {
}
