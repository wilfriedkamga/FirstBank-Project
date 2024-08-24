package com.example.AssociationManagement.Controller;

import com.example.AssociationManagement.Business.AssociationBus;
import com.example.AssociationManagement.Config.DefaultRolesConfig;
import com.example.AssociationManagement.Dao.Dto.*;
import com.example.AssociationManagement.Dao.Entity.*;
import com.example.AssociationManagement.Dao.Modele.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

  // les endpoint qui concerne la gestion des associations

    @PostMapping("/create_association")
    public ResponseEntity<AssociationDto> createAssociation(@RequestBody CreaterAssoModele creerAssoModele) {
        // Créer et retourner le DTO
        AssociationDto association = associationService.createAssociation(creerAssoModele);
        return ResponseEntity.ok(association);
    }

    @PostMapping("/confirmation_create_association")
    public ResponseEntity<AssociationDto> confirmerCreationAssociation(@RequestBody ConfirmerCreationAssoModel confirmerCreationAssoModel) {
        // Créer et retourner le DTO
        AssociationDto associationDto = associationService.confirmerCreationAssociation(confirmerCreationAssoModel);
        return ResponseEntity.ok(associationDto);
    }

    @PostMapping("/initialize_association")
    public ResponseEntity<AssociationDto> ouvrirAssociation(@RequestParam String associationId) {
        // Créer et retourner le DTO
        AssociationDto associationDto = associationService.ouvrir_association(associationId);
        return ResponseEntity.ok(associationDto);
    }


    @PostMapping("/envoyerInvitation")
    public ResponseEntity<?> envoyerInvitation() {
        // Créer et retourner le DTO
        return ResponseEntity.ok(associationService.envoyerNotification("testdeResttemplate","Test de rEstemplate","237650641633","6555555553","1"));
    }

    @DeleteMapping("/delete_association_by_id")
    public ResponseEntity<?> deleteAssociation(@RequestParam String associationId) {
        Association association = associationService.deleteAssociation(associationId);
        CommonResponseModel response=new CommonResponseModel("delete operation success !","0", new AssociationDto(association));
        return ResponseEntity.ok(response);
    }


    @GetMapping("/associations_by_phone")
    public ResponseEntity<List<AssociationDto>> getAssociationsByPhone(@RequestParam String phone) {
        CommonResponseModel response=new CommonResponseModel("delete operation success !","0",null);

        List<AssociationDto> associations = associationService.getAssociationsByPhoneNumber(phone);
        return ResponseEntity.ok(associations);
    }

    @GetMapping("/association_by_id")
    public ResponseEntity<AssociationDto> getAssociationById(@RequestParam String associationId) {
        // Créer et retourner le DTO
        AssociationDto association = associationService.getAssociation(associationId);
        return ResponseEntity.ok(association);
    }

    @PutMapping("/update_association")
    public ResponseEntity<?> updateAssociation(@RequestBody UpdateAssoModel updateAssoModel) {
        CreateAssoDto association = associationService.updateAssociation(updateAssoModel);
        CommonResponseModel response=new CommonResponseModel("Association updated successfully!","0",association);
        return ResponseEntity.ok().body(association);
    }

    @PostMapping("/block_association_by_id")
    public ResponseEntity<AssociationDto> bloquerAssociation(@RequestParam String associationId) {
        // Créer et retourner le DTO
        //CreateAssoDto association = associationService.bloquerAssociation(creerAssoModele);
        return null ; // ResponseEntity.ok(association);
    }

    @PostMapping("/unlock_association_by_id")
    public ResponseEntity<AssociationDto> deBloquerAssociation(@RequestParam String associationId) {
        // Créer et retourner le DTO
        //CreateAssoDto association = associationService.bloquerAssociation(creerAssoModele);
        return null ; // ResponseEntity.ok(association);
    }

    @PostMapping("/verify_name_before_creation")
    public ResponseEntity<Boolean> verifyNameBeforeCreation(@RequestParam String associationName, @RequestParam String phoneCreator) {
        // Créer et retourner le DTO

        boolean verifyStatus = associationService.verifyNameBeforeCreation(associationName,phoneCreator);
        return ResponseEntity.ok(verifyStatus);
    }

    @PostMapping("/inviter")
    public ResponseEntity<AssociationDto> InviterMembre(@RequestParam String associationId) {
        // Créer et retourner le DTO
        AssociationDto association = associationService.getAssociation(associationId);
        return ResponseEntity.ok(association);
    }

    @PostMapping("/simple_add_member_in_association")
    public ResponseEntity<?> addMember(@RequestBody MembreCreationModel membreCreationModel) {
        Membre_Asso membre = associationService.addMember(membreCreationModel.getAssociationId(), membreCreationModel.getName(), membreCreationModel.getPhone(), membreCreationModel.getRoleLabel());
        MembreAssoDto membreAssoDto=new MembreAssoDto(membre);
        CommonResponseModel response=new CommonResponseModel(" adding operation success !","0",membreAssoDto);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/multiple_add_member_in_association")
    public ResponseEntity<?> addMemberMult(@RequestBody MembreCreationModel membreCreationModel) {
        Membre_Asso membre = associationService.addMember(membreCreationModel.getAssociationId(), membreCreationModel.getName(), membreCreationModel.getPhone(), membreCreationModel.getRoleLabel());
        MembreAssoDto membreAssoDto=new MembreAssoDto(membre);
        CommonResponseModel response=new CommonResponseModel(" adding operation success !","0",membreAssoDto);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/confirm_user_adding_in_association")
    public ResponseEntity<?> confirmUserAddingInAssociation(@RequestBody MembreCreationModel membreCreationModel) {
        Membre_Asso membre = associationService.addMember(membreCreationModel.getAssociationId(), membreCreationModel.getName(), membreCreationModel.getPhone(), membreCreationModel.getRoleLabel());
        MembreAssoDto membreAssoDto=new MembreAssoDto(membre);
        CommonResponseModel response=new CommonResponseModel(" adding operation success !","0",membreAssoDto);
        return ResponseEntity.ok().body(response);
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

    @GetMapping("/association/{id}/members")
    public ResponseEntity<List<MembreAssoDto>> getMembersByAssociationId(@PathVariable String id) {
        List<MembreAssoDto> members = associationService.getMembersByAssociationId(id);
        CommonResponseModel response=new CommonResponseModel("delete operation success !","0",null);

        return ResponseEntity.ok(members);
    }

    @PostMapping("/create_role_in_association")
    public ResponseEntity<?> createRoleInAssociation(@RequestBody RoleCreationModel roleCreationModel) {
        CommonResponseModel response=new CommonResponseModel();
        Role_Asso role = associationService.createRole(roleCreationModel.getAssociationId(), roleCreationModel.getLabel().toLowerCase(),true, roleCreationModel.getNbMaxOcc());
        response.setResponseCode("0");
        response.setMessage("sucess of creation");
        RoleAssoDto roleAssoDto=new RoleAssoDto(role.getId(),role.getLabel(),role.getNbMaxOcc());
        response.setData(roleAssoDto);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/delete_role_in_association")
    public ResponseEntity<?> deleteRole(@RequestParam String roleId) {
        associationService.deleteRole(roleId);
        String message="Error when delete";
        message="delete sucessfully";
        CommonResponseModel response=new CommonResponseModel(message,"0",null);
        return ResponseEntity.ok().body(response);

    }

    @PutMapping("/modify_member_role_in_association")
    public ResponseEntity<?> modify_member_roleInAssociation(@RequestBody UpdateAssoModel updateAssoModel) {
        CreateAssoDto association = associationService.updateAssociation(updateAssoModel);
        CommonResponseModel response=new CommonResponseModel("Association updated successfully!","0",association);
        return ResponseEntity.ok().body(association);
    }

    // Recupérer les rôles

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


    @GetMapping("/roles")
    public ResponseEntity<?> getRole(@RequestParam String associationId) {
        System.out.println("passe par les roles");


           List<Role_Asso> roles=associationService.getRoleAsso(associationId);

           List<RoleAssoDto> rolesDto = roles.stream()
                   .map(role -> new RoleAssoDto(role.getId(), role.getLabel(), role.getNbMaxOcc()))
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

    @GetMapping("/association/{id}/events")
    public ResponseEntity<List<EventDto>> getEventsByAssociationId(@PathVariable String id) {
        List<EventDto> events = associationService.getEventsByAssociationId(id);
        CommonResponseModel response=new CommonResponseModel("delete operation success !","0",null);

        return ResponseEntity.ok(events);
    }

}
