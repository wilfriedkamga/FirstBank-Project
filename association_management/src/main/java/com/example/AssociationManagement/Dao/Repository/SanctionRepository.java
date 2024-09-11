package com.example.AssociationManagement.Dao.Repository;

import com.example.AssociationManagement.Dao.Entity.Role_Tont;
import com.example.AssociationManagement.Dao.Entity.Sanction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface SanctionRepository extends JpaRepository<Sanction, String> {

}