package com.example.AssociationManagement.Dao.Repository;


import com.example.AssociationManagement.Dao.Entity.Association;
import com.example.AssociationManagement.Dao.Entity.Reunion;
import com.example.AssociationManagement.Dao.Entity.Role_Asso;
import com.example.AssociationManagement.Dao.Entity.Tontine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TontineRepository extends JpaRepository<Tontine, String>{
    void deleteById(String associationId);

}