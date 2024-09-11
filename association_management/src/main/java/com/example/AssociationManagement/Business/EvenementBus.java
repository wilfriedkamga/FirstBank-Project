package com.example.AssociationManagement.Business;

import com.example.AssociationManagement.Dao.Dto.EvenementDto;
import com.example.AssociationManagement.Dao.Entity.Evenement;
import com.example.AssociationManagement.Dao.Repository.EvenementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EvenementBus {

    @Autowired
    private EvenementRepository evenementRepository;

    // Convertir un événement en DTO
    private EvenementDto convertToDto(Evenement evenement) {
        return new EvenementDto(evenement);
    }

    // Convertir une liste d'événements en liste de DTO
    private List<EvenementDto> convertToDtoList(List<Evenement> evenements) {
        return evenements.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<EvenementDto> getAllEvenements() {
        return convertToDtoList(evenementRepository.findAll());
    }

    public Optional<EvenementDto> getEvenementById(String id) {
        return evenementRepository.findById(id).map(this::convertToDto);
    }

    public EvenementDto createEvenement(EvenementDto evenementDto) {
        Evenement evenement = new Evenement();
        evenement.setDescription(evenementDto.getDescription());
        evenement.setDateEcheance(evenementDto.getDateEcheance());
        // Vous devez gérer les associations ici, par exemple :
        // evenement.setAssociation(new Association(evenementDto.getAssociationId()));
        // evenement.setMembreAsso(new Membre_Asso(evenementDto.getMembreAssoId()));
        return convertToDto(evenementRepository.save(evenement));
    }

    public EvenementDto updateEvenement(String id, EvenementDto evenementDto) {
        return evenementRepository.findById(id)
                .map(evenement -> {
                    evenement.setDescription(evenementDto.getDescription());
                    evenement.setDateEcheance(evenementDto.getDateEcheance());
                    // Vous devez gérer les associations ici, par exemple :
                    // evenement.setAssociation(new Association(evenementDto.getAssociationId()));
                    // evenement.setMembreAsso(new Membre_Asso(evenementDto.getMembreAssoId()));
                    return convertToDto(evenementRepository.save(evenement));
                }).orElse(null);
    }

    public void deleteEvenement(String id) {
        evenementRepository.deleteById(id);
    }
}
