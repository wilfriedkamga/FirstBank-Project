package com.example.AssociationManagement.Business;
import com.example.AssociationManagement.Dao.Dto.CotisationDto;
import com.example.AssociationManagement.Dao.Entity.Cotisation;
import com.example.AssociationManagement.Dao.Entity.Membre_Tont;
import com.example.AssociationManagement.Dao.Entity.Reunion;
import com.example.AssociationManagement.Dao.Repository.CotisationRepository;
import com.example.AssociationManagement.Dao.Repository.MembreTontRepository;
import com.example.AssociationManagement.Dao.Repository.ReunionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CotisationBus {

    @Autowired
    private CotisationRepository cotisationRepository;

    @Autowired
    private ReunionRepository reunionRepository;

    @Autowired
    private MembreTontRepository membreTontRepository;

    public List<Cotisation> findAll() {
        return cotisationRepository.findAll();
    }

    public Optional<Cotisation> findById(String id) {
        return cotisationRepository.findById(id);
    }

    public Cotisation save(CotisationDto cotisationDTO) {
        Optional<Reunion> reunion = reunionRepository.findById(cotisationDTO.getReunionId());
        Optional<Membre_Tont> membreTont = membreTontRepository.findById(cotisationDTO.getMembreTontId());

        if (reunion.isPresent() && membreTont.isPresent()) {
            Cotisation cotisation = new Cotisation();
            cotisation.setAmount(cotisationDTO.getAmount());
            cotisation.setMode(cotisationDTO.getMode());
            cotisation.setState(cotisationDTO.getState());
            cotisation.setReunion(reunion.get());
            cotisation.setMembre_tont(membreTont.get());
            return cotisationRepository.save(cotisation);
        } else {
            throw new IllegalArgumentException("Reunion or Membre_Tont not found");
        }
    }

    public Cotisation update(CotisationDto cotisationDTO, String id) {
        Optional<Cotisation> existingCotisation = cotisationRepository.findById(id);
        if (existingCotisation.isPresent()) {
            Cotisation cotisation = existingCotisation.get();
            cotisation.setAmount(cotisationDTO.getAmount());
            cotisation.setMode(cotisationDTO.getMode());
            cotisation.setState(cotisationDTO.getState());

            Optional<Reunion> reunion = reunionRepository.findById(cotisationDTO.getReunionId());
            Optional<Membre_Tont> membreTont = membreTontRepository.findById(cotisationDTO.getMembreTontId());

            if (reunion.isPresent() && membreTont.isPresent()) {
                cotisation.setReunion(reunion.get());
                cotisation.setMembre_tont(membreTont.get());
                return cotisationRepository.save(cotisation);
            }
        }
        return null;
    }

    public void deleteById(String id) {
        cotisationRepository.deleteById(id);
    }
}
