package com.example.AssociationManagement.Controller;
import com.example.AssociationManagement.Business.AssociationBus;
import com.example.AssociationManagement.Config.DefaultRolesConfig;
import com.example.AssociationManagement.Dao.Dto.*;
import com.example.AssociationManagement.Dao.Entity.*;
import com.example.AssociationManagement.Dao.Modele.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/associationmanagement")
public class AssociationController {

    @Autowired
    private AssociationBus associationService;

    @Autowired
    private DefaultRolesConfig defaultRolesConfig;

    @PostMapping("/create")
    public ResponseEntity<CreateAssoDto> createAssociation(@RequestBody CreerAssoModele creerAssoModele) {
        System.out.println("-*-*-*-*-*-*-*-Passe bien par ici-*-*-*-*");
        // Créer et retourner le DTO
        CreateAssoDto association = associationService.createAssociation(creerAssoModele);
        return ResponseEntity.ok(association);
    }

    @GetMapping("/getAssociation")
    public ResponseEntity<AssociationDto> getAssociation(@RequestParam String associationId) {
        System.out.println("-*-*-*-*-*-*-*-Passe bien par ici-*-*-*-*");
        // Créer et retourner le DTO
        AssociationDto association = associationService.getAssociation(associationId);
        return ResponseEntity.ok(association);
    }

    @GetMapping("/getDefaultRoles")
    public ResponseEntity<?> getDefaultRolesAsso() {
        List<String> defaultRoles = defaultRolesConfig.getDefaultRoles();
        List<String> uniqueRoles = defaultRolesConfig.getUniqueRoles();
        List<String> allRoles = new ArrayList<>(defaultRoles);
        allRoles.addAll(uniqueRoles);
        CommonResponseModel response=new CommonResponseModel("sucess de l'opération","0",allRoles);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/default-frequencies")
    public ResponseEntity<?> getDefaultFrequencies() {
        CommonResponseModel response=new CommonResponseModel("sucess de l'opération","0",defaultRolesConfig.getFrequenceReunion());
        return  ResponseEntity.ok().body(response);
    }

    @PostMapping("/create-role")
    public ResponseEntity<?> createRole(@RequestBody RoleCreationModel roleCreationModel) {
            CommonResponseModel response=new CommonResponseModel();
            Role_Asso role = associationService.createRole(roleCreationModel.getAssociationId(), roleCreationModel.getLabel().toLowerCase(),true, roleCreationModel.getNbMaxOcc());
            response.setResponseCode("0");
            response.setMessage("sucess of creation");
            RoleAssoDto roleAssoDto=new RoleAssoDto(role.getId(),role.getLabel(),role.getNbMaxOcc());
            response.setData(roleAssoDto);
            return ResponseEntity.ok().body(response);
    }

    @GetMapping("/roles")
    public ResponseEntity<?> getRole(@RequestParam String associationId) {
        System.out.println("passe par les roles");


           List<Role_Asso> roles=associationService.getRoleAsso(associationId);

           List<RoleAssoDto> rolesDto = roles.stream()
                   .map(role -> new RoleAssoDto(role.getId(), role.getLabel().toUpperCase(), role.getNbMaxOcc()))
                   .collect(Collectors.toList());
           return ResponseEntity.ok().body(rolesDto);
    }
    @GetMapping("/details")
    public ResponseEntity<?> getDetails(@RequestParam String associationId) {

        List<Role_Asso> roles=associationService.getRoleAsso(associationId);

        List<RoleAssoDto> rolesDto = roles.stream()
                .map(role -> new RoleAssoDto(role.getId(), role.getLabel().toUpperCase(), role.getNbMaxOcc()))
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
    @PostMapping("/createTontine")
    public ResponseEntity<?> createTontine(@RequestBody CreateTontineModele createTontineModel) {
        CommonResponseModel response=new CommonResponseModel("Success de la création","0",associationService.createTontine(createTontineModel));
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/tontine/{tontineId}")
    public void deleteTontine(@PathVariable String tontineId) {
        associationService.deleteTontine(tontineId);
    }

    @PutMapping("/tontine/{tontineId}")
    public Tontine modifyTontine(@PathVariable String tontineId, @RequestBody Tontine tontineDetails) {
        return associationService.modifyTontine(tontineId, tontineDetails);
    }

    @PostMapping("/tontine/{tontineId}/member")
    public Membre_Tont addMemberToTontine(@PathVariable String tontineId, @RequestBody Membre_Tont membreTont) {
        return associationService.addMemberToTontine(tontineId, membreTont);
    }

    @PostMapping("/tontine/{tontineId}/members")
    public void addMembersToTontine(@PathVariable String tontineId, @RequestBody List<Membre_Tont> membresTont) {
        associationService.addMembersToTontine(tontineId, membresTont);
    }


    @PostMapping("/{associationId}/reunion")
    public Reunion createReunion(@PathVariable String associationId, @RequestBody Reunion reunion) {
        return associationService.createReunion(associationId, reunion);
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
        CommonResponseModel response=new CommonResponseModel("delete operation success !","0",null);
        return ResponseEntity.ok(memberDetails);
    }

    @PostMapping("/add-member")
    public ResponseEntity<?> addMember(@RequestBody MembreCreationModel membreCreationModel) {
        System.out.println("Voici ce que je demande de faire");
        Membre_Asso membre = associationService.addMember(membreCreationModel.getAssociationId(), membreCreationModel.getName(), membreCreationModel.getPhone(), membreCreationModel.getRoleLabel());
        System.out.println("Voici les tests passe par ici 3");
        MembreAssoDto membreAssoDto=new MembreAssoDto(membre.getId(),membre.getName(),membre.getPhone(),membre.getCreationDate(),membre.getRole().getLabel());
        CommonResponseModel response=new CommonResponseModel(" adding operation success !","0",membreAssoDto);
        return ResponseEntity.ok().body(response);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAssociation(@PathVariable String id) {
        boolean isDeleted = associationService.deleteAssociation(id);
        CommonResponseModel response=new CommonResponseModel("delete operation success !","0",null);

        if (isDeleted) {
            return ResponseEntity.ok().body("Association deleted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Association cannot be deleted.");
        }
    }



    @DeleteMapping("/delete-member/{memberId}")
    public ResponseEntity<?> deleteMember(@PathVariable String memberId) {
        boolean isDeleted = associationService.deleteMember(memberId);
        CommonResponseModel response=new CommonResponseModel("delete operation success !","0",null);

        if (isDeleted) {
            return ResponseEntity.ok().body("Member deleted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Member cannot be deleted.");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateAssociation(@RequestBody UpdateAssoModel updateAssoModel) {
        CreateAssoDto association = associationService.updateAssociation(updateAssoModel);
        CommonResponseModel response=new CommonResponseModel("Association updated successfully!","0",association);
        return ResponseEntity.ok().body(association);
    }

    @GetMapping("/associations-by-phone")
    public ResponseEntity<List<AssociationDto>> getAssociationsByPhone(@RequestParam String phone) {
        CommonResponseModel response=new CommonResponseModel("delete operation success !","0",null);

        List<AssociationDto> associations = associationService.getAssociationsByPhoneNumber(phone);
        return ResponseEntity.ok(associations);
    }

    @GetMapping("/association/{id}/tontines")
    public ResponseEntity<List<TontineDto>> getTontinesByAssociationId(@PathVariable String id) {
        CommonResponseModel response=new CommonResponseModel("delete operation success !","0",null);

        List<TontineDto> tontines = associationService.getTontinesByAssociationId(id);
        return ResponseEntity.ok(tontines);
    }

    @GetMapping("/association/{id}/members")
    public ResponseEntity<List<MembreAssoDto>> getMembersByAssociationId(@PathVariable String id) {
        List<MembreAssoDto> members = associationService.getMembersByAssociationId(id);
        CommonResponseModel response=new CommonResponseModel("delete operation success !","0",null);

        return ResponseEntity.ok(members);
    }

    @GetMapping("/association/{id}/reunions")
    public ResponseEntity<List<ReunionDto>> getReunionsByAssociationId(@PathVariable String id) {
        List<ReunionDto> reunions = associationService.getReunionsByAssociationId(id);
        CommonResponseModel response=new CommonResponseModel("delete operation success !","0",null);

        return ResponseEntity.ok(reunions);
    }

    @GetMapping("/association/{id}/events")
    public ResponseEntity<List<EventDto>> getEventsByAssociationId(@PathVariable String id) {
        List<EventDto> events = associationService.getEventsByAssociationId(id);
        CommonResponseModel response=new CommonResponseModel("delete operation success !","0",null);

        return ResponseEntity.ok(events);
    }

    // Gérer les aspects concernants les tontines

    @PostMapping("/tontine/create")
    public ResponseEntity<CreateAssoDto> createTontine(@RequestBody CreerAssoModele creerAssoModele) {
        System.out.println("-*-*-*-*-*-*-*-Passe bien par ici-*-*-*-*");
        // Créer et retourner le DTO
        CreateAssoDto association = associationService.createAssociation(creerAssoModele);
        return ResponseEntity.ok(association);
    }



}
