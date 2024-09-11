package com.example.AssociationManagement.Business;
import com.example.AssociationManagement.CustomException.AssociationNotFoundException;
import com.example.AssociationManagement.Dao.Dto.DocumentDto;
import com.example.AssociationManagement.Dao.Entity.Document;
import com.example.AssociationManagement.Dao.Repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class DocumentBus {

    @Autowired
    private DocumentRepository documentRepository;

    public List<DocumentDto> getAllDocuments() {
        List<Document> documents = documentRepository.findAll();
        return documents.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public DocumentDto getDocumentById(String id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new AssociationNotFoundException("Document not found with id: " + id));
        return mapToDto(document);
    }

    public DocumentDto createDocument(DocumentDto documentDto) {
        Document document = mapToEntity(documentDto);
        document = documentRepository.save(document);
        return mapToDto(document);
    }

    public DocumentDto updateDocument(String id, DocumentDto documentDto) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new AssociationNotFoundException("Document not found with id: " + id));

        document.setNom(documentDto.getNom());
        document.setNomComplet(documentDto.getNomComplet());
        document.setChemin(documentDto.getChemin());
        document.setLienTelechargement(documentDto.getLienTelechargement());
        document.setTaille(documentDto.getTaille());
        document.setDescription(documentDto.getDescription());
        document.setDate(documentDto.getDate());

        document = documentRepository.save(document);
        return mapToDto(document);
    }

    public void deleteDocument(String id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new AssociationNotFoundException("Document not found with id: " + id));
        documentRepository.delete(document);
    }

    private DocumentDto mapToDto(Document document) {
        DocumentDto documentDto = new DocumentDto();
        documentDto.setId(document.getId());
        documentDto.setNom(document.getNom());
        documentDto.setNomComplet(document.getNomComplet());
        documentDto.setChemin(document.getChemin());
        documentDto.setLienTelechargement(document.getLienTelechargement());
        documentDto.setTaille(document.getTaille());
        documentDto.setDescription(document.getDescription());
        documentDto.setDate(document.getDate());
        documentDto.setAssociationId(document.getAssociation().getId());
        return documentDto;
    }

    private Document mapToEntity(DocumentDto documentDto) {
        Document document = new Document();
        document.setNom(documentDto.getNom());
        document.setNomComplet(documentDto.getNomComplet());
        document.setChemin(documentDto.getChemin());
        document.setLienTelechargement(documentDto.getLienTelechargement());
        document.setTaille(documentDto.getTaille());
        document.setDescription(documentDto.getDescription());
        document.setDate(documentDto.getDate());
        // Gérer l'association ici
        return document;
    }
}
