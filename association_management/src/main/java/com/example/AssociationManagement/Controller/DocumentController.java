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
import java.util.List;


@RestController
@RequestMapping("/api/associationmanagement")
public class DocumentController {

    @Autowired
    private AssociationBus associationService;

    @Autowired
    private DefaultRolesConfig defaultRolesConfig;

    /* ********************* GESTION DES DOCUMENTS **************************** */

    @PostMapping("/uploadFile")
    public ResponseEntity<DocumentDto> uploadFile(@RequestPart String nom,@RequestPart String description,@RequestPart String associationId,@RequestPart MultipartFile file) throws IOException {

        UploadFileModel uploadFileModel=new UploadFileModel();
        uploadFileModel.setNom(nom);
        uploadFileModel.setDescription(description);
        uploadFileModel.setAssociationId(associationId);
        uploadFileModel.setFile(file);
        //DocumentDto document =associationService.uploadFile(uploadFileModel);

        return null; // ResponseEntity.ok(document);
    }



    @GetMapping ("/documentsByAssociation")
    public ResponseEntity<List<DocumentDto>> getDocumentsByAssociationId(@RequestParam String associationId){

        //List<DocumentDto> documents=associationService.getDocumentsByAssociationId(associationId);
        //System.out.println(documents.size());
        return null; // ResponseEntity.ok(documents);

    }
    @DeleteMapping ("/delete_document")
    public ResponseEntity<AssociationDto> deleteDocument(@RequestParam String documentId,@RequestParam String associationId) {
        // Créer et retourner le DTO
        //AssociationDto association = associationService.deleteDocument(associationId,documentId);
        return null; // ResponseEntity.ok(association);
    }

    @PostMapping("/association/{id}/downloadFile")
    public ResponseEntity<CreateAssoDto> downloadFile(@RequestBody CreaterAssoModele creerAssoModele) {
        // Créer et retourner le DTO
        //CreateAssoDto association = associationService.createAssociation(creerAssoModele);
        return null;// ResponseEntity.ok(association);
    }


}
