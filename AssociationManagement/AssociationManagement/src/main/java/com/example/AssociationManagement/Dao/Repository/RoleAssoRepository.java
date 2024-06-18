package com.example.AssociationManagement.Dao.Repository;

import com.example.AssociationManagement.Dao.Entity.Role_Asso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleAssoRepository extends JpaRepository<Role_Asso, String> {

}