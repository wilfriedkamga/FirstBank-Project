package com.example.AssociationManagement.Dao.Repository;


import com.example.AssociationManagement.Dao.Entity.Membre_Tont;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MembreTontRepository extends JpaRepository<Membre_Tont, String> {
    List<Membre_Tont> findByPhone(String phone);
}