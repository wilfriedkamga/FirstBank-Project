package com.example.documentmanagement.Controller;

import com.example.documentmanagement.Business.DocumentBus;
import com.example.documentmanagement.Dao.Entity.Document;
import com.example.documentmanagement.Dao.Modele.CommonResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Map;


@RestController
@RequestMapping("/api/documentmanagement")
public class DocumentController {
    @Autowired
    private DocumentBus documentService;

    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CommonResponseModel> uploadFile(
            @RequestPart MultipartFile file,
            @RequestParam String description,
            @RequestParam boolean visibilityAll) {

        CommonResponseModel response = new CommonResponseModel();
        try {
            Document document = documentService.uploadFile(file, description, visibilityAll);
            response.setMessage("File uploaded successfully");
            response.setResponseCode("0");
            response.setData(document);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IOException e) {
            response.setMessage("Failed to upload file");
            response.setResponseCode("1");
            response.setData(e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable String id,
            @RequestBody Map<String, String> requestBody) throws MalformedURLException {
        String destinationPath = requestBody.get("destinationPath");
        try {
            Resource resource = documentService.downloadFile(id, destinationPath);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (FileNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}