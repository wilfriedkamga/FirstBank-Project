package com.example.AssociationManagement.Dao.Repository;

import com.example.AssociationManagement.Dao.Entity.Association;
import com.example.AssociationManagement.Dao.Entity.Invitation;
import com.example.AssociationManagement.Dao.Entity.Role_Asso;
import com.example.AssociationManagement.Dao.Enumerations.InvitationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation, String> {
  List<Invitation> findAllByAssociation_id(String associationId);
  List<Invitation> findAllByConcernedRole(Role_Asso  role);
  Invitation findByTypeAndAssociationIdAndRespondingMember_Id(InvitationType type,String associationId,String responderId0);
}