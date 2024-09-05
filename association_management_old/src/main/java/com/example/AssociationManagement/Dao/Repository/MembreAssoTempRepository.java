package com.example.AssociationManagement.Dao.Repository;


import com.example.AssociationManagement.Dao.Entity.Association;
import com.example.AssociationManagement.Dao.Entity.Membre_Asso_Temp;
import com.example.AssociationManagement.Dao.Entity.Role_Asso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MembreAssoTempRepository extends JpaRepository<Membre_Asso_Temp, String> {

}