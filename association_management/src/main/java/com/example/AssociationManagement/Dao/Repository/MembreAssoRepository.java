package com.example.AssociationManagement.Dao.Repository;

import com.example.AssociationManagement.Dao.Entity.Association;
import com.example.AssociationManagement.Dao.Entity.Membre_Asso;
import com.example.AssociationManagement.Dao.Entity.Privilege_Asso;
import com.example.AssociationManagement.Dao.Entity.Role_Asso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface MembreAssoRepository extends JpaRepository<Membre_Asso, String> {
    List<Membre_Asso> findByPhone(String phoneNumber);
    //boolean existsByAssociationsAndRole(Association association, Role_Asso role);
    //@Query("SELECT ma FROM Membre_Asso ma WHERE ma.phone = :phone AND ma.role = :role AND :association MEMBER OF ma.associations")
    //Membre_Asso findByPhoneAndRoleAndAssociation(@Param("phone") String phone, @Param("role") Role_Asso role, @Param("association") Association association);
    List<Membre_Asso> findByPhoneAndAndAssociation_Id(String phone, String associationId);
    Membre_Asso findByIdAndAndAssociation_Id(String memberId, String associationId);
    List<Membre_Asso> findByRole(Role_Asso role);


}
