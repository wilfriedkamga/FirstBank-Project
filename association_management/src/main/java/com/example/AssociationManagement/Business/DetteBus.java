package com.example.AssociationManagement.Business;

import com.example.AssociationManagement.Dao.Dto.DetteDto;
import com.example.AssociationManagement.Dao.Entity.Dette;
import com.example.AssociationManagement.Dao.Entity.Document;
import com.example.AssociationManagement.Dao.Entity.Membre_Tont;
import com.example.AssociationManagement.Dao.Repository.DetteRepository;
import com.example.AssociationManagement.Dao.Repository.DocumentRepository;
import com.example.AssociationManagement.Dao.Repository.MembreTontRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DetteBus {

    @Autowired
    private DetteRepository detteRepository;

    @Autowired
    private MembreTontRepository membreTontRepository;

    @Autowired
    private DocumentRepository documentRepository;

    public List<Dette> findAll() {
        return detteRepository.findAll();
    }

    public Optional<Dette> findById(String id) {
        return detteRepository.findById(id);
    }

    public Dette save(DetteDto detteDto) {
        Dette dette = new Dette();
        dette.setMontant(detteDto.getMontant());
        dette.setDateDelai(detteDto.getDateDelai());
        dette.setMontantNet(detteDto.getMontantNet());
        dette.setMontantARembourser(detteDto.getMontantARembourser());
        dette.setEtat(detteDto.getEtat());

        Optional<Membre_Tont> membreTont = membreTontRepository.findById(detteDto.getMembreTontId());
        Optional<Document> document = documentRepository.findById(detteDto.getDocumentId());

        if (membreTont.isPresent() && document.isPresent()) {
            dette.setMembre_tont(membreTont.get());
            dette.setDocument(document.get());
            return detteRepository.save(dette);
        } else {
            throw new IllegalArgumentException("Membre_Tont or Document not found");
        }
    }

    public Dette update(DetteDto detteDto, String id) {
        Optional<Dette> existingDette = detteRepository.findById(id);

        if (existingDette.isPresent()) {
            Dette dette = existingDette.get();
            dette.setMontant(detteDto.getMontant());
            dette.setDateDelai(detteDto.getDateDelai());
            dette.setMontantNet(detteDto.getMontantNet());
            dette.setMontantARembourser(detteDto.getMontantARembourser());
            dette.setEtat(detteDto.getEtat());

            Optional<Membre_Tont> membreTont = membreTontRepository.findById(detteDto.getMembreTontId());
            Optional<Document> document = documentRepository.findById(detteDto.getDocumentId());

            if (membreTont.isPresent() && document.isPresent()) {
                dette.setMembre_tont(membreTont.get());
                dette.setDocument(document.get());
                return detteRepository.save(dette);
            } else {
                throw new IllegalArgumentException("Membre_Tont or Document not found");
            }
        } else {
            throw new IllegalArgumentException("Dette not found");
        }
    }

    public void deleteById(String id) {
        detteRepository.deleteById(id);
    }
}
