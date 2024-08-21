package com.example.AssociationManagement.Dao.Repository;

import com.example.AssociationManagement.Dao.Entity.Association;
import com.example.AssociationManagement.Dao.Entity.Document;
import com.example.AssociationManagement.Dao.Entity.Role_Asso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface AssociationRepository extends JpaRepository<Association, String>{
    boolean existsByName(String name);
    Optional<Association> findByNameAndPhoneCreator(String name, String phone);

}