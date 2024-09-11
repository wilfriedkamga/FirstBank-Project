package com.example.AssociationManagement.Dao.Repository;


import com.example.AssociationManagement.Dao.Entity.Cagnotte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CagnotteRepository extends JpaRepository<Cagnotte, String> {

}
