package com.example.AssociationManagement.Business;
import com.example.AssociationManagement.Dao.Dto.SanctionDto;
import com.example.AssociationManagement.Dao.Entity.Sanction;
import com.example.AssociationManagement.Dao.Repository.SanctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SanctionBus {

    @Autowired
    private SanctionRepository sanctionRepository;

    @Autowired
    private MembreTontBus membreTontBus; // Assuming you have a service to manage Membre_Tont

    public List<Sanction> getAllSanctions() {
        return sanctionRepository.findAll();
    }

    public Optional<Sanction> getSanctionById(String id) {
        return sanctionRepository.findById(id);
    }

    public Sanction createSanction(SanctionDto sanctionDto) {
        Sanction sanction = new Sanction();
        sanction.setMontant(sanctionDto.getMontant());
        sanction.setDelayDate(sanctionDto.getDelayDate());
        sanction.setStartDate(sanctionDto.getStartDate());
        sanction.setEtat(sanctionDto.getEtat());

        // Set Membre_Tont reference
        if (sanctionDto.getMembreTontId() != null) {
            sanction.setMembre_tont(membreTontBus.getMembreTontById(sanctionDto.getMembreTontId()).orElse(null));
        }

        return sanctionRepository.save(sanction);
    }

    public Sanction updateSanction(String id, SanctionDto sanctionDto) {
        Optional<Sanction> existingSanctionOpt = sanctionRepository.findById(id);

        if (existingSanctionOpt.isPresent()) {
            Sanction existingSanction = existingSanctionOpt.get();
            existingSanction.setMontant(sanctionDto.getMontant());
            existingSanction.setDelayDate(sanctionDto.getDelayDate());
            existingSanction.setStartDate(sanctionDto.getStartDate());
            existingSanction.setEtat(sanctionDto.getEtat());

            // Set Membre_Tont reference
            if (sanctionDto.getMembreTontId() != null) {
                existingSanction.setMembre_tont(membreTontBus.getMembreTontById(sanctionDto.getMembreTontId()).orElse(null));
            }

            return sanctionRepository.save(existingSanction);
        } else {
            return null; // Or throw an exception if preferred
        }
    }

    public void deleteSanction(String id) {
        sanctionRepository.deleteById(id);
    }
}
