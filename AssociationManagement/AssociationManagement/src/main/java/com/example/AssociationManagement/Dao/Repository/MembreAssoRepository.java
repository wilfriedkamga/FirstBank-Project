package com.example.AssociationManagement.Dao.Repository;

import com.example.AssociationManagement.Dao.Entity.Membre_Asso;
import com.example.AssociationManagement.Dao.Entity.Privilege_Asso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface MembreAssoRepository extends JpaRepository<Membre_Asso, String> {
    List<Membre_Asso> findByPhone(String phoneNumber);
}