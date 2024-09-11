package com.example.AssociationManagement.Controller;

import com.example.AssociationManagement.Business.DocumentBus;
import com.example.AssociationManagement.Dao.Dto.DocumentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/associations/documents")
public class DocumentController {

    @Autowired
    private DocumentBus documentBus;

    @GetMapping
    public ResponseEntity<List<DocumentDto>> getAllDocuments() {
        return new ResponseEntity<List<DocumentDto>>(documentBus.getAllDocuments(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentDto> getDocumentById(@PathVariable String id) {
        return new ResponseEntity<>(documentBus.getDocumentById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<DocumentDto> createDocument(@RequestBody DocumentDto documentDto) {
        return new ResponseEntity<>(documentBus.createDocument(documentDto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DocumentDto> updateDocument(@PathVariable String id, @RequestBody DocumentDto documentDto) {
        return new ResponseEntity<>(documentBus.updateDocument(id, documentDto), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable String id) {
        documentBus.deleteDocument(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
