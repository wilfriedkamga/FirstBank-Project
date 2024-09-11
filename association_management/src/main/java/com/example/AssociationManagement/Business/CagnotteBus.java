package com.example.AssociationManagement.Business;

import com.example.AssociationManagement.Dao.Dto.CagnotteDto;
import com.example.AssociationManagement.Dao.Entity.Cagnotte;
import com.example.AssociationManagement.Dao.Entity.Membre_Tont;
import com.example.AssociationManagement.Dao.Entity.Reunion;
import com.example.AssociationManagement.Dao.Repository.CagnotteRepository;
import com.example.AssociationManagement.Dao.Repository.MembreTontRepository;
import com.example.AssociationManagement.Dao.Repository.ReunionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CagnotteBus {

    @Autowired
    private CagnotteRepository cagnotteRepository;

    @Autowired
    private MembreTontRepository membreTontRepository;

    @Autowired
    private ReunionRepository reunionRepository;

    public List<CagnotteDto> getAllCagnottes() {
        List<Cagnotte> cagnottes = cagnotteRepository.findAll();
        return cagnottes.stream().map(CagnotteDto::new).collect(Collectors.toList());
    }

    public Optional<CagnotteDto> getCagnotteById(String id) {
        Optional<Cagnotte> cagnotte = cagnotteRepository.findById(id);
        return cagnotte.map(CagnotteDto::new);
    }

    public CagnotteDto createCagnotte(CagnotteDto cagnotteDto) {
        Membre_Tont membre = membreTontRepository.findById(cagnotteDto.getMembreId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid membre ID"));

        Reunion reunion = reunionRepository.findById(cagnotteDto.getReunionId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid reunion ID"));

        Cagnotte cagnotte = new Cagnotte(cagnotteDto.getMontant(), cagnotteDto.getModePaiement(), membre, reunion);
        Cagnotte savedCagnotte = cagnotteRepository.save(cagnotte);

        return new CagnotteDto(savedCagnotte);
    }

    public CagnotteDto updateCagnotte(String id, CagnotteDto cagnotteDto) {
        Optional<Cagnotte> existingCagnotte = cagnotteRepository.findById(id);
        if (existingCagnotte.isPresent()) {
            Cagnotte cagnotte = existingCagnotte.get();
            Membre_Tont membre = membreTontRepository.findById(cagnotteDto.getMembreId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid membre ID"));
            Reunion reunion = reunionRepository.findById(cagnotteDto.getReunionId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid reunion ID"));

            cagnotte.setMontant(cagnotteDto.getMontant());
            cagnotte.setModePaiement(cagnotteDto.getModePaiement());
            cagnotte.setMembre(membre);
            cagnotte.setReunion(reunion);

            Cagnotte updatedCagnotte = cagnotteRepository.save(cagnotte);
            return new CagnotteDto(updatedCagnotte);
        } else {
            throw new IllegalArgumentException("Cagnotte not found");
        }
    }

    public void deleteCagnotte(String id) {
        cagnotteRepository.deleteById(id);
    }
}
