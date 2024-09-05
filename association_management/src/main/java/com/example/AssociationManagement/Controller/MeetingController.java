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
public class MeetingController {

    @Autowired
    private AssociationBus associationService;

    @Autowired
    private DefaultRolesConfig defaultRolesConfig;

    @PostMapping("/create_meeting_online")
    public Reunion createReunionEnLIgne(@PathVariable String associationId, @RequestBody Reunion reunion) {
        return null; // associationService.createReunion(associationId, reunion);
    }

    @PostMapping("/create_meeting_present")
    public Reunion createReunionEnPresentiel(@PathVariable String associationId, @RequestBody Reunion reunion) {
        return null; // associationService.createReunion(associationId, reunion);
    }

    @PostMapping("/send_message_during_the_meeting")
    public Reunion sendMessageDuringMeeting(@PathVariable String associationId, @RequestBody Reunion reunion) {
        return null; // associationService.createReunion(associationId, reunion);
    }

    @PostMapping("/start_meeting")
    public Reunion debuterReunion(@PathVariable String associationId, @RequestBody Reunion reunion) {
        return null ; // associationService.createReunion(associationId, reunion);
    }

    @PostMapping("/end_meeting")
    public Reunion arreterReunion(@PathVariable String associationId, @RequestBody Reunion reunion) {
        return null; //associationService.createReunion(associationId, reunion);
    }

    @PostMapping("/generate_report_meeting")
    public Reunion genererRapportReunion(@PathVariable String associationId, @RequestBody Reunion reunion) {
        return null; // associationService.createReunion(associationId, reunion);
    }

    @PostMapping("/participate_to_meeting")
    public Reunion participerAUneReunion(@PathVariable String associationId, @RequestBody Reunion reunion) {
        return null; // associationService.createReunion(associationId, reunion);
    }

    @PostMapping("/go_out_to_meeting")
    public Reunion seRetirerDUneReunion(@PathVariable String associationId, @RequestBody Reunion reunion) {
        return null; // associationService.createReunion(associationId, reunion);
    }

    // Tontine et réunions

    @PostMapping("/cotiser_to_meeting")
    public Reunion CotiserDansUneReunion(@PathVariable String associationId, @RequestBody Reunion reunion) {
        return null; // associationService.createReunion(associationId, reunion);
    }

    @PostMapping("/create_cagnote_during_meeting")
    public Reunion CreerCagnotteDansUneReunion(@PathVariable String associationId, @RequestBody Reunion reunion) {
        return null; // associationService.createReunion(associationId, reunion);
    }


    @PostMapping("/valider_cagnote_during_meeting")
    public Reunion ValiderCagnotteDansUneReunion(@PathVariable String associationId, @RequestBody Reunion reunion) {
        return null; // associationService.createReunion(associationId, reunion);
    }

    @PostMapping("/create_dept_during_meeting")
    public Reunion creerDetteDansUneReunion(@PathVariable String associationId, @RequestBody Reunion reunion) {
        return null; //associationService.createReunion(associationId, reunion);
    }

    @PostMapping("/validate_dept_during_meeting")
    public Reunion validerDetteDansUneReunion(@PathVariable String associationId, @RequestBody Reunion reunion) {
        return null; //associationService.createReunion(associationId, reunion);
    }

    @PostMapping("/receiving_dept_during_meeting")
    public Reunion recevoirDetteDansUneReunion(@PathVariable String associationId, @RequestBody Reunion reunion) {
        return null ; // associationService.createReunion(associationId, reunion);
    }

    @PostMapping("/create_sanction_during_meeting")
    public Reunion CreerSanctionDansUneReunion(@PathVariable String associationId, @RequestBody Reunion reunion) {
        return null; //associationService.createReunion(associationId, reunion);
    }

    @PostMapping("/validate_sanction_during_meeting")
    public Reunion validerSanctionDansUneReunion(@PathVariable String associationId, @RequestBody Reunion reunion) {
        return null; // associationService.createReunion(associationId, reunion);
    }
    @GetMapping("/association/{id}/reunions")
    public ResponseEntity<?> getReunionsByAssociationId(@PathVariable String id) {
        //List<ReunionDto> reunions = associationService.getReunionsByAssociationId(id);
        CommonResponseModel response=new CommonResponseModel("delete operation success !","0",null);

        return ResponseEntity.ok(response);
    }



}

