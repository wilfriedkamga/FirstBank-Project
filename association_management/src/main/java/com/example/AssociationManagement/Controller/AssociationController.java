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


    /**
     * Crée une nouvelle association.
     *
     * @param creerAssoModele Le modèle de création d'association.
     * @return Le DTO de l'association créée.
     */

    @PostMapping("/create_association")
    public ResponseEntity<CommonResponseModel> createAssociation(@RequestBody CreaterAssoModele creerAssoModele) {
        AssociationDto association = associationService.createAssociation(creerAssoModele);
        CommonResponseModel response=new CommonResponseModel("Sucess","0",association);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/invite_member")
    public ResponseEntity<CommonResponseModel> inviterMember(@RequestBody AddMemberAssociaitonModel model) {
        CommonResponseModel response=new CommonResponseModel("Sucess","0",new MembreAssoDto(associationService.addMemberInCreation2(model)));
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


    /**
     * Initialise une association existante.
     *
     * @param associationId L'ID de l'association à initialiser.
     * @return Le DTO de l'association après initialisation.
     */

    @PostMapping("/initialize_association")
    public ResponseEntity<CommonResponseModel> ouvrirAssociation(@RequestParam String associationId) {
        // Créer et retourner le DTO
        CommonResponseModel response = associationService.startAssociation(associationId);
        return ResponseEntity.ok(response);
    }

    /**
     * Supprimer une association existante.
     *
     * @param associationId L'ID de l'association à initialiser.
     * @return Le DTO de l'association après suppression.
     */

    @DeleteMapping("/delete_association_by_id")
    public ResponseEntity<?> deleteAssociation(@RequestParam String associationId) {
        CommonResponseModel response = associationService.deleteAssociation(associationId);
        return ResponseEntity.ok(response);
    }


    /**
     * Initialise une association existante.
     *
     * @param updateAssoModel L'ID de l'association à initialiser.
     * @return Le DTO de l'association après mise àjour.
     */
    @PutMapping("/update_association")
    public ResponseEntity<CommonResponseModel> updateAssociation(@RequestBody UpdateAssoModel updateAssoModel) {
        CommonResponseModel response = associationService.updateAssociation(updateAssoModel);
        return ResponseEntity.ok().body(response);
    }

    /**
     * Initialise une association existante.
     *
     * @param phone telephone d'un utilisateur et retourne ses associations.
     * @return Le DTO de l'association après initialisation.
     */
    @GetMapping("/associations_by_phone")
    public ResponseEntity<CommonResponseModel> getAssociationsByPhone(@RequestParam String phone) {
        CommonResponseModel response = associationService.getAssociationsByPhone(phone);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/member_by_phone_and_association")
    public ResponseEntity<CommonResponseModel> getCurrentMemberInAssociation(@RequestParam String phone,@RequestParam String associationId) {
        CommonResponseModel response = associationService.getMemberByPhoneAndAssociation(phone,associationId);
        return ResponseEntity.ok(response);
    }

    /**
     * Recuperer les infromations sur une association..
     *
     * @param associationId L'ID de l'association à initialiser.
     * @return Le DTO de l'association après initialisation.
     */
    @GetMapping("/association_by_id")
    public ResponseEntity<CommonResponseModel> getAssociationById(@RequestParam String associationId) {
        CommonResponseModel response = associationService.getAssociationById(associationId);
        return ResponseEntity.ok(response);
    }


    /**
     * Initialise une association existante.
     *
     * @param associationId L'ID de l'association à initialiser.
     * @return Le DTO de l'association après initialisation.
     */
    @PostMapping("/suspend_association_by_id")
    public ResponseEntity<CommonResponseModel> suspendAssociation(@RequestParam String associationId) {
        CommonResponseModel response=associationService.suspendAssociation(associationId);
        return ResponseEntity.ok(response);
    }

    /**
     * Initialise une association existante.
     *
     * @param associationId L'ID de l'association à initialiser.
     * @return Le DTO de l'association après initialisation.
     */
    @PostMapping("/resume_association_by_id")
    public ResponseEntity<CommonResponseModel> resumeAssociation(@RequestParam String associationId) {
        // Créer et retourner le DTO
        CommonResponseModel response=associationService.resumeAssociation(associationId);
        return ResponseEntity.ok(response);

    }
    /**
     * Initialise une association existante.
     *
     * @param
     * @return Le DTO de l'association après initialisation.
     */
    @PostMapping("/verify_name_before_creation")
    public ResponseEntity<CommonResponseModel> verifyNameBeforeCreation(@RequestParam String associationName, @RequestParam String phoneCreator) {
        // Créer et retourner le DTO

        CommonResponseModel response= associationService.verifyNameBeforeCreation(associationName,phoneCreator);
        return ResponseEntity.ok(response);
    }





    // Nous passons à la gestion des roles au sein de notre associaiton

    /**
     * Initialise une association existante.
     *
     * @param createAssoRoleModel L'ID de l'association à initialiser.
     * @return Le DTO de l'association après initialisation.
     */

    @PostMapping("/ajouter_role_in_association")
    public ResponseEntity<?> addRoleInAssociation(@RequestBody CreateAssoRoleModel createAssoRoleModel) {
        CommonResponseModel response=new CommonResponseModel();
        AssociationDto associationDto = associationService.addRoleInAssociation(createAssoRoleModel);
        return ResponseEntity.ok().body(response);
    }

    /**
     * Initialise une association existante.
     *
     * @param updateAssoModel L'ID de l'association à initialiser.
     * @return Le DTO de l'association après mise àjour.
     */
    @PutMapping("/update_role_association")
    public ResponseEntity<?> updateRoleAssoModel(@RequestBody CreateAssoRoleModel updateAssoModel) {
        AssociationDto association = associationService.updateRoleInAssociation(updateAssoModel);
        CommonResponseModel response=new CommonResponseModel("Association updated successfully!","0",association);
        return ResponseEntity.ok().body(association);
    }

    /**
     * Initialise une association existante.
     *
     * @param roleId L'ID de l'association à initialiser.
     * @return Le DTO de l'association après initialisation.
     */
    @DeleteMapping("/delete_role_in_association")
    public ResponseEntity<?> deleteRole(@RequestParam String roleId) {
        associationService.deleteRole(roleId);

        CommonResponseModel response=new CommonResponseModel("","0",null);
        return ResponseEntity.ok().body(response);

    }

    /**
     * Initialise une association existante.
     *
     * @param associationId L'ID de l'association à initialiser.
     * @return Le DTO de l'association après initialisation.
     */
    @GetMapping("/roles")
    public ResponseEntity<?> getRole(@RequestParam String associationId) {
        List<Role_Asso> roles=associationService.getRoleByAssociaitonId(associationId);
        return ResponseEntity.ok().body(null);
    }

    /**
     * Initialise une association existante.
     *
     * @param createAssoRoleModel L'ID de l'association à initialiser.
     * @return Le DTO de l'association après initialisation.
     */

    @PostMapping("/ajouter_privillege_role_in_association")
    public ResponseEntity<?> addPrivillegeToRole(@RequestBody CreateAssoRoleModel createAssoRoleModel) {
        CommonResponseModel response=new CommonResponseModel();
        Role_Asso role = associationService.addPrivilegeRoleInAssociation(createAssoRoleModel);
        response.setResponseCode("0");
        return ResponseEntity.ok().body(response);
    }

    /**
     * Initialise une association existante.
     *
     * @param createAssoRoleModel L'ID de l'association à initialiser.
     * @return Le DTO de l'association après initialisation.
     */

    @PostMapping("/retirer_privillege_role_in_association")
    public ResponseEntity<?> removePrivillegeToRole(@RequestBody CreateAssoRoleModel createAssoRoleModel) {
        CommonResponseModel response=new CommonResponseModel();
        Role_Asso role = associationService.removePrivilegeRoleInAssociation(createAssoRoleModel);
        return ResponseEntity.ok().body(response);
    }


    // Nous passons à la gestion des membres de l'association

    /**
     * Crée une nouvelle association.
     *
     * @param phone Le modèle de création d'association.
     * @return Le DTO de l'association créée.
     */

    @PostMapping("/user_has_account")
    public ResponseEntity<Object> userHasAccount(@RequestParam String phone) {

        Object objet = associationService.userHasAccount(phone);
        return ResponseEntity.ok(objet);
    }

    /**
     * Initialise une association existante.
     *
     * @param membreCreationModel L'ID de l'association à initialiser.
     * @return Le DTO de l'association après initialisation.
     */
    @PostMapping("/simple_add_member_in_association")
    public ResponseEntity<?> addMember(@RequestBody MembreCreationModel membreCreationModel) {
        Membre_Asso membre = associationService.addOneMemberInAssociation(membreCreationModel);
        MembreAssoDto membreAssoDto=new MembreAssoDto(membre);
        CommonResponseModel response=new CommonResponseModel(" adding operation success !","0",membreAssoDto);
        return ResponseEntity.ok().body(response);
    }

    /**
     * Initialise une association existante.
     *
     * @param membreCreationModel L'ID de l'association à initialiser.
     * @return Le DTO de l'association après initialisation.
     */
    @PostMapping("/multiple_add_member_in_association")
    public ResponseEntity<?> addMemberMult(@RequestBody MembreCreationModel membreCreationModel) {
        Membre_Asso membre = associationService.addManyMemberInAssociation(membreCreationModel);
        MembreAssoDto membreAssoDto=new MembreAssoDto(membre);
        CommonResponseModel response=new CommonResponseModel(" adding operation success !","0",membreAssoDto);
        return ResponseEntity.ok().body(response);
    }


    /**
     * Initialise une association existante.
     *
     * @param id L'ID de l'association à initialiser.
     * @return Le DTO de l'association après initialisation.
     */
    @GetMapping("/association/{id}/members")
    public ResponseEntity<CommonResponseModel> getMembersByAssociationId(@PathVariable String id) {
        CommonResponseModel response = associationService.getMembersByAssociationId(id);
        return ResponseEntity.ok(response);
    }


    /**
     * Initialise une association existante.
     *
     * @param memberId L'ID de l'association à initialiser.
     * @return Le DTO de l'association après initialisation.
     */
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

    /**
     * Initialise une association existante.
     *
     * @param updateAssoModel L'ID de l'association à initialiser.
     * @return Le DTO de l'association après initialisation.
     */

    @PutMapping("/modify_member_role_in_association")
    public ResponseEntity<?> modify_member_roleInAssociation(@RequestBody CreateAssoRoleModel updateAssoModel) {
        Role_Asso association = associationService.modifyMemberRoleInAssociaiton(updateAssoModel);
        CommonResponseModel response=new CommonResponseModel("Association updated successfully!","0",association);
        return ResponseEntity.ok().body(association);
    }


    /**
     * Initialise une association existante.
     *
     * @param phone L'ID de l'association à initialiser.
     * @return Le DTO de l'association après initialisation.
     */

    @GetMapping("/member-details")
    public ResponseEntity<CommonResponseModel> getMemberDetails(@RequestParam String phone) {
        CommonResponseModel response= associationService.getMemberDetails(phone);
        return ResponseEntity.ok(response);
    }


    /**
     * Initialise une association existante.
     *
     * @param
     * @return Le DTO de l'association après initialisation.
     */

    @GetMapping("/getDefaultRoles")
    public ResponseEntity<?> getDefaultRolesAsso() {

        CommonResponseModel response=new CommonResponseModel("sucess de l'opération","0",null);
        return ResponseEntity.ok().body(response);
    }

    /**
     * Initialise une association existante.
     *
     * @param
     * @return Le DTO de l'association après initialisation.
     */
    @GetMapping("/default-frequencies")
    public ResponseEntity<?> getDefaultFrequencies() {
        CommonResponseModel response=new CommonResponseModel("sucess de l'opération","0",defaultRolesConfig.getDefaultRoles());
        return  ResponseEntity.ok().body(response);
    }
}
