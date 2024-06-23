package com.example.AssociationManagement.Controller;
import com.example.AssociationManagement.Business.AssociationBus;
import com.example.AssociationManagement.Dao.Dto.*;
import com.example.AssociationManagement.Dao.Entity.Association;
import com.example.AssociationManagement.Dao.Entity.Membre_Asso;
import com.example.AssociationManagement.Dao.Entity.Role_Asso;
import com.example.AssociationManagement.Dao.Modele.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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

    @PostMapping("/create-role")
    public ResponseEntity<?> createRole(@RequestBody RoleCreationModel roleCreationModel) {
            CommonResponseModel response=new CommonResponseModel();
            Role_Asso role = associationService.createRole(roleCreationModel.getAssociationId(), roleCreationModel.getLabel().toLowerCase(),true);
            response.setResponseCode("0");
            response.setMessage("sucess of creation");
            RoleAssoDto roleAssoDto=new RoleAssoDto(role.getId(),role.getLabel());
            response.setData(roleAssoDto);
            return ResponseEntity.ok().body(response);
    }

    @GetMapping("/roles")
    public ResponseEntity<?> getRole(@RequestParam String associationId) {
        System.out.println("passe par les roles");


           List<Role_Asso> roles=associationService.getRoleAsso(associationId);

           List<RoleAssoDto> rolesDto = roles.stream()
                   .map(role -> new RoleAssoDto(role.getId(), role.getLabel().toUpperCase()))
                   .collect(Collectors.toList());
           return ResponseEntity.ok().body(rolesDto);
    }


    @DeleteMapping("/delete-role")
    public ResponseEntity<?> deleteRole(@RequestParam String roleId) {
        associationService.deleteRole(roleId);
        String message="Error when delete";
        message="delete sucessfully";
        CommonResponseModel response=new CommonResponseModel(message,"0",null);
        return ResponseEntity.ok().body(response);

    }
    @DeleteMapping("/delete-role2")
    public ResponseEntity<?> deleteRole2(@RequestBody DeleteRoleAssociationModel model) {
        associationService.deleteRole2(model.getAssociation_id(),model.getRole_label().toLowerCase());
        CommonResponseModel response=new CommonResponseModel("delete operation success !","0",null);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/delete-role-all")
    public ResponseEntity<?> deleteAllRole(@RequestParam String associationId) {
        associationService.deleteAllRole(associationId);
        CommonResponseModel response=new CommonResponseModel("delete operation success !","0",null);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/member-details")
    public ResponseEntity<MemberDetailsDto> getMemberDetails(@RequestParam String phone) {
        MemberDetailsDto memberDetails = associationService.getMemberDetails(phone);
        return ResponseEntity.ok(memberDetails);
    }

    @PostMapping("/add-member")
    public ResponseEntity<?> addMember(@RequestBody MembreCreationModel membreCreationModel) {

        Membre_Asso membre = associationService.addMember(membreCreationModel.getAssociationId(), membreCreationModel.getName(), membreCreationModel.getPhone(), membreCreationModel.getRoleLabel());
        System.out.println("Voici ce que je demande de faire");
        return ResponseEntity.ok().body("Member added successfully with ID: " +membre.getId());
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

    @GetMapping("/association/{id}/tontines")
    public ResponseEntity<List<TontineDto>> getTontinesByAssociationId(@PathVariable String id) {
        List<TontineDto> tontines = associationService.getTontinesByAssociationId(id);
        return ResponseEntity.ok(tontines);
    }

    @GetMapping("/association/{id}/members")
    public ResponseEntity<List<MembreAssoDto>> getMembersByAssociationId(@PathVariable String id) {
        List<MembreAssoDto> members = associationService.getMembersByAssociationId(id);
        return ResponseEntity.ok(members);
    }

    @GetMapping("/association/{id}/reunions")
    public ResponseEntity<List<ReunionDto>> getReunionsByAssociationId(@PathVariable String id) {
        List<ReunionDto> reunions = associationService.getReunionsByAssociationId(id);
        return ResponseEntity.ok(reunions);
    }

    @GetMapping("/association/{id}/events")
    public ResponseEntity<List<EventDto>> getEventsByAssociationId(@PathVariable String id) {
        List<EventDto> events = associationService.getEventsByAssociationId(id);
        return ResponseEntity.ok(events);
    }



}
