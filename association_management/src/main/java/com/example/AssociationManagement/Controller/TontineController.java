package com.example.AssociationManagement.Controller;


import com.example.AssociationManagement.Business.AssociationBus;
import com.example.AssociationManagement.Config.DefaultRolesConfig;
import com.example.AssociationManagement.Dao.Dto.*;
import com.example.AssociationManagement.Dao.Entity.*;
import com.example.AssociationManagement.Dao.Modele.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/associationmanagement")
public class TontineController {

    @Autowired
    private AssociationBus associationService;

    @Autowired
    private DefaultRolesConfig defaultRolesConfig;

    @PostMapping("/createTontine")
    public ResponseEntity<?> createTontine(@RequestBody CreateTontineModele createTontineModel) {
        CommonResponseModel response=new CommonResponseModel("Success de la création","0",associationService.createTontine(createTontineModel));
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/delete_tontine")
    public void deleteTontine(@PathVariable String tontineId) {
        associationService.deleteTontine(tontineId);
    }


    @PutMapping("/update_tontine")
    public Tontine modifyTontine(@PathVariable String tontineId, @RequestBody Tontine tontineDetails) {
        return associationService.modifyTontine(tontineId, tontineDetails);
    }

    @PostMapping("/simple_add_member_in_tontine")
    public Membre_Tont simpleAddMemberToTontine(@PathVariable String tontineId, @RequestBody Membre_Tont membreTont) {
        return associationService.addMemberToTontine(tontineId, membreTont);
    }

    @PostMapping("/tontine/{tontineId}/members")
    public void addMembersToTontine(@PathVariable String tontineId, @RequestBody List<Membre_Tont> membresTont) {
        associationService.addMembersToTontine(tontineId, membresTont);
    }

    @PostMapping("/multiple_add_member_in_tontine")
    public Membre_Tont MulitpleAddMemberToTontine(@PathVariable String tontineId, @RequestBody Membre_Tont membreTont) {
        return associationService.addMemberToTontine(tontineId, membreTont);
    }

    @PostMapping("/change_nb_occurence_member_in_tontine")
    public Membre_Tont changerNbOccurenceMemberInTontine(@PathVariable String tontineId, @RequestBody Membre_Tont membreTont) {
        return associationService.addMemberToTontine(tontineId, membreTont);
    }

    @PostMapping("/increment_nb_occurence_member_in_tontine")
    public Membre_Tont incrementNbOccurenceMemberInTontine(@PathVariable String tontineId, @RequestBody Membre_Tont membreTont) {
        return associationService.addMemberToTontine(tontineId, membreTont);
    }

    @PostMapping("/decrement_nb_occurence_member_in_tontine")
    public Membre_Tont decrementNbOccurenceMemberInTontine(@PathVariable String tontineId, @RequestBody Membre_Tont membreTont) {
        return associationService.addMemberToTontine(tontineId, membreTont);
    }

    @GetMapping("/get_tontines_by_association")
    public ResponseEntity<List<TontineDto>> getTontinesByAssociationId(@RequestParam String associationId) {
        List<TontineDto> tontines = associationService.getTontinesByAssociationId(associationId);
        CommonResponseModel response=new CommonResponseModel("Sucess of operation","0",tontines);
        return ResponseEntity.ok(tontines);
    }

    @GetMapping("/get_details_tontines_by_associations")
    public ResponseEntity<List<TontineDto>> getTontinesDetailsId(@PathVariable String associationId) {
        List<TontineDto> tontines = associationService.getTontinesByAssociationId(associationId);
        CommonResponseModel response=new CommonResponseModel("Sucess of operation","0",tontines);
        return ResponseEntity.ok(tontines);
    }

    @GetMapping("/get_dept_from_tontines")
    public ResponseEntity<List<TontineDto>> getDeptDetTontine(@PathVariable String associationId) {
        List<TontineDto> tontines = associationService.getTontinesByAssociationId(associationId);
        CommonResponseModel response=new CommonResponseModel("Sucess of operation","0",tontines);
        return ResponseEntity.ok(tontines);
    }

    @GetMapping("/get_sanction_from_tontines")
    public ResponseEntity<List<TontineDto>> getSanctionDetTontine(@PathVariable String associationId) {
        List<TontineDto> tontines = associationService.getTontinesByAssociationId(associationId);
        CommonResponseModel response=new CommonResponseModel("Sucess of operation","0",tontines);
        return ResponseEntity.ok(tontines);
    }


}
