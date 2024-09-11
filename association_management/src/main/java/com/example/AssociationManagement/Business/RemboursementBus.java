package com.example.AssociationManagement.Business;

import com.example.AssociationManagement.Dao.Dto.RemboursementDto;
import com.example.AssociationManagement.Dao.Entity.Remboursement;
import com.example.AssociationManagement.Dao.Repository.DetteRepository;
import com.example.AssociationManagement.Dao.Repository.RemboursementRepository;
import com.example.AssociationManagement.Dao.Entity.Dette;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RemboursementBus {

    @Autowired
    private RemboursementRepository remboursementRepository;

    @Autowired
    private DetteRepository detteRepository;

    public List<RemboursementDto> getAllRemboursements() {
        return remboursementRepository.findAll().stream()
                .map(RemboursementDto::new)
                .collect(Collectors.toList());
    }

    public Optional<RemboursementDto> getRemboursementById(String id) {
        return remboursementRepository.findById(id)
                .map(RemboursementDto::new);
    }

    public RemboursementDto createRemboursement(RemboursementDto remboursementDto) {
        Remboursement remboursement = new Remboursement();
        remboursement.setMontant(remboursementDto.getMontant());
        remboursement.setDateRemboursement(remboursementDto.getDateRemboursement());

        if (remboursementDto.getDetteId() != null) {
            Optional<Dette> dette = detteRepository.findById(remboursementDto.getDetteId());
            if (dette.isPresent()) {
                remboursement.setDette(dette.get());
            }
        }

        remboursement = remboursementRepository.save(remboursement);
        return new RemboursementDto(remboursement);
    }

    public RemboursementDto updateRemboursement(String id, RemboursementDto remboursementDto) {
        if (remboursementRepository.existsById(id)) {
            Remboursement remboursement = new Remboursement();
            remboursement.setId(id);
            remboursement.setMontant(remboursementDto.getMontant());
            remboursement.setDateRemboursement(remboursementDto.getDateRemboursement());

            if (remboursementDto.getDetteId() != null) {
                Optional<Dette> dette = detteRepository.findById(remboursementDto.getDetteId());
                if (dette.isPresent()) {
                    remboursement.setDette(dette.get());
                }
            }

            remboursement = remboursementRepository.save(remboursement);
            return new RemboursementDto(remboursement);
        }
        return null;
    }

    public void deleteRemboursement(String id) {
        remboursementRepository.deleteById(id);
    }
}
