package com.example.AssociationManagement.Dao.Repository;

import com.example.AssociationManagement.Dao.Entity.Document;
import com.example.AssociationManagement.Dao.Entity.Membre_Asso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, String> {
    List<Document> findByAssociation_Id(String associationId);
}
