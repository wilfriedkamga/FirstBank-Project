package com.example.AssociationManagement.Controller;

import com.example.AssociationManagement.Business.AssociationBus;
import com.example.AssociationManagement.Business.TontineBus;
import com.example.AssociationManagement.Config.DefaultRolesConfig;
import com.example.AssociationManagement.Dao.Dto.*;
import com.example.AssociationManagement.Dao.Entity.*;
import com.example.AssociationManagement.Dao.Enumerations.EtatAsso;
import com.example.AssociationManagement.Dao.Modele.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Path;


@RestController
@RequestMapping("/api/associations")
public class AssociationController {

    @Autowired
    private AssociationBus associationService;

    @Autowired
    private TontineBus tontineService;

    @Autowired
    private DefaultRolesConfig defaultRolesConfig;


    /**
     * Crée une nouvelle association.
     *
     * @param creerAssoModele Le modèle de création d'association.
     * @return Le DTO de l'association créée.
     */

    @PostMapping("/")
    public ResponseEntity<CommonResponseModel> createAssociation(@RequestBody CreaterAssoModele creerAssoModele) {
        AssociationDto association = associationService.createAssociation(creerAssoModele);
        CommonResponseModel response=new CommonResponseModel("Sucess","0",association);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAssociation(@PathVariable String id) {
        CommonResponseModel response = associationService.deleteAssociation(id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/")
    public ResponseEntity<?> deleteAllAssociation() {
        CommonResponseModel response = associationService.deleteAllAssociation();
        return ResponseEntity.ok(response);
    }



    @PatchMapping("/")
    public ResponseEntity<CommonResponseModel> updateAssociation(@RequestBody UpdateAssoModel updateAssoModel) {
        CommonResponseModel response = associationService.updateAssociation(updateAssoModel);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponseModel> getAssociationById(@PathVariable String id) {
        CommonResponseModel response = associationService.getAssociationById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/")
    public ResponseEntity<CommonResponseModel> getAllAssociations(@PathVariable String id) {
        CommonResponseModel response = associationService.getAllAssociations();
        return ResponseEntity.ok(response);
    }

//    @GetMapping("/{id}/membres")
//    public ResponseEntity<CommonResponseModel> getMembresByAssociation(@PathVariable String id) {
//        CommonResponseModel response = associationService.getMembreByAssociation(id);
//        return ResponseEntity.ok(response);
//    }

    @GetMapping("/{id}/reunions")
    public ResponseEntity<CommonResponseModel> getMeetingsByAssociation(@PathVariable String id) {
        CommonResponseModel response = associationService.getMeetingsAssociation(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/suspend")
    public ResponseEntity<CommonResponseModel> suspendAssociation(@PathVariable String id) {
        CommonResponseModel response=associationService.suspendAssociation(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/resume")
    public ResponseEntity<CommonResponseModel> resumeAssociation(@PathVariable String id) {
        // Créer et retourner le DTO
        CommonResponseModel response=associationService.resumeAssociation(id);
        return ResponseEntity.ok(response);

    }

    @GetMapping("/phone/{phone}")
    public ResponseEntity<CommonResponseModel> getAssociationsByPhone(@PathVariable String phone) {
        CommonResponseModel response = associationService.getAssociationsByPhone(phone);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/phone/{phone}/state/{state}")
    public ResponseEntity<CommonResponseModel> getAssociationsByPhoneAndState(@PathVariable String phone,@PathVariable EtatAsso state) {
        CommonResponseModel response = associationService.getAssociationsByPhoneAndState(phone,state);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<CommonResponseModel> getMembersByAssociationId(@PathVariable String id) {
        CommonResponseModel response = associationService.getMembersByAssociationId(id);
        return ResponseEntity.ok(response);
    }


    @PostMapping("/initialize/{id}")
    public ResponseEntity<CommonResponseModel> ouvrirAssociation(@PathVariable String id) {
        // Créer et retourner le DTO
        CommonResponseModel response = associationService.startAssociation(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/test-name")
    public ResponseEntity<CommonResponseModel> verifyNameBeforeCreation(@RequestParam String associationName, @RequestParam String phoneCreator) {
        // Créer et retourner le DTO
        CommonResponseModel response= associationService.verifyNameBeforeCreation(associationName,phoneCreator);
        return ResponseEntity.ok(response);
    }



    @PostMapping("/user_has_account")
    public ResponseEntity<Object> userHasAccount(@RequestParam String phone) {
        Object objet = associationService.userHasAccount(phone);
        return ResponseEntity.ok(objet);
    }

//    @PostMapping("/multiple_add_member_in_association")
//    public ResponseEntity<?> addMemberMult(@RequestBody MembreCreationModel membreCreationModel) {
//        Membre_Asso membre = associationService.addManyMemberInAssociation(membreCreationModel);
//        MembreAssoDto membreAssoDto=new MembreAssoDto(membre);
//        CommonResponseModel response=new CommonResponseModel(" adding operation success !","0",membreAssoDto);
//        return ResponseEntity.ok().body(response);
//    }



    @GetMapping("/member_by_phone_and_association")
    public ResponseEntity<CommonResponseModel> getCurrentMemberInAssociation(@RequestParam String phone,@RequestParam String associationId) {
        CommonResponseModel response = associationService.getMemberByPhoneAndAssociation(phone,associationId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/answer_invitation")
    public ResponseEntity<CommonResponseModel> respondeInvitation(@RequestBody RespondInvitationModele respondInvitationModele) {
        CommonResponseModel commonResponseModel = associationService.responseInvitation(respondInvitationModele);
        return ResponseEntity.ok(commonResponseModel);
    }

    @PostMapping("/cancel_invitation")
    public ResponseEntity<CommonResponseModel> cancelInvitation(@RequestBody CancelInvitationModel model) {
        CommonResponseModel commonResponseModel = associationService.cancelInvitation(model);
        return ResponseEntity.ok(commonResponseModel);
    }

    @DeleteMapping("/delete-member/{memberId}")
    public ResponseEntity<?> deleteMember(@PathVariable String memberId) {
        boolean isDeleted = associationService.deleteMemberInAssociation(memberId);
        CommonResponseModel response=new CommonResponseModel("delete operation success !","0",null);

        if (isDeleted) {
            return ResponseEntity.ok().body("Member deleted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Member cannot be deleted.");
        }
    }

    @PutMapping("/modify_member_role_in_association")
    public ResponseEntity<?> modify_member_roleInAssociation(@RequestBody CreateAssoRoleModel updateAssoModel) {
        Role_Asso association = associationService.modifyMemberRoleInAssociaiton(updateAssoModel);
        CommonResponseModel response=new CommonResponseModel("Association updated successfully!","0",association);
        return ResponseEntity.ok().body(association);
    }

    @GetMapping("/member-details")
    public ResponseEntity<CommonResponseModel> getMemberDetails(@RequestParam String phone) {
        CommonResponseModel response= associationService.getMemberDetails(phone);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getDefaultRoles")
    public ResponseEntity<?> getDefaultRolesAsso() {

        CommonResponseModel response=new CommonResponseModel("sucess de l'opération","0",null);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/default-frequencies")
    public ResponseEntity<?> getDefaultFrequencies() {
        CommonResponseModel response=new CommonResponseModel("sucess de l'opération","0",defaultRolesConfig.getDefaultRoles());
        return  ResponseEntity.ok().body(response);
    }
}
