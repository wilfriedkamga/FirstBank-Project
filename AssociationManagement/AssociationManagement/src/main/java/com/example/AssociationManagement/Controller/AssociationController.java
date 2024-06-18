package com.example.AssociationManagement.Controller;
import com.example.AssociationManagement.Business.AssociationBus;
import com.example.AssociationManagement.Dao.Dto.AssociationDto;
import com.example.AssociationManagement.Dao.Dto.CreateAssoDto;
import com.example.AssociationManagement.Dao.Entity.Association;
import com.example.AssociationManagement.Dao.Entity.Membre_Asso;
import com.example.AssociationManagement.Dao.Entity.Role_Asso;
import com.example.AssociationManagement.Dao.Modele.CreerAssoModele;
import com.example.AssociationManagement.Dao.Modele.MembreCreationModel;
import com.example.AssociationManagement.Dao.Modele.RoleCreationModel;
import com.example.AssociationManagement.Dao.Modele.UpdateAssoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/associationmanagement")
public class AssociationController {

    @Autowired
    private AssociationBus associationService;

    @PostMapping("/create")
    public ResponseEntity<CreateAssoDto> createAssociation(@RequestBody CreerAssoModele creerAssoModele) {
        System.out.println("-*-*-*-*-*-*-*-Passe bien par ici-*-*-*-*");
        // Créer et retourner le DTO
        CreateAssoDto association = associationService.createAssociation(creerAssoModele);
        return ResponseEntity.ok(association);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAssociation(@PathVariable String id) {
        boolean isDeleted = associationService.deleteAssociation(id);
        if (isDeleted) {
            return ResponseEntity.ok().body("Association deleted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Association cannot be deleted.");
        }
    }

    @PostMapping("/create-role")
    public ResponseEntity<?> createRole(@RequestBody RoleCreationModel roleCreationModel) {
        Role_Asso role = associationService.createRole(roleCreationModel.getAssociationId(), roleCreationModel.getLabel());
        return ResponseEntity.ok().body("Role created successfully with ID: " + role.getId());
    }

    @DeleteMapping("/delete-role/{roleId}")
    public ResponseEntity<?> deleteRole(@PathVariable String roleId) {
        boolean isDeleted = associationService.deleteRole(roleId);
        if (isDeleted) {
            return ResponseEntity.ok().body("Role deleted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Role cannot be deleted.");
        }
    }

    @PostMapping("/add-member")
    public ResponseEntity<?> addMember(@RequestBody MembreCreationModel membreCreationModel) {
        Membre_Asso membre = associationService.addMember(membreCreationModel.getAssociationId(), membreCreationModel.getName(), membreCreationModel.getPhone(), membreCreationModel.getRoleLabel());
        return ResponseEntity.ok().body("Member added successfully with ID: " + membre.getId());
    }

    @DeleteMapping("/delete-member/{memberId}")
    public ResponseEntity<?> deleteMember(@PathVariable String memberId) {
        boolean isDeleted = associationService.deleteMember(memberId);
        if (isDeleted) {
            return ResponseEntity.ok().body("Member deleted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Member cannot be deleted.");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateAssociation(@RequestBody UpdateAssoModel updateAssoModel) {
        Association association = associationService.updateAssociation(updateAssoModel);
        return ResponseEntity.ok("Association updated successfully.");
    }

    @GetMapping("/associations-by-phone")
    public ResponseEntity<List<AssociationDto>> getAssociationsByPhone(@RequestParam String phone) {
        List<AssociationDto> associations = associationService.getAssociationsByPhoneNumber(phone);
        return ResponseEntity.ok(associations);
    }

}
