
package com.example.AssociationManagement.Business;
import com.example.AssociationManagement.Dao.Dto.MembreAssoDto;
import com.example.AssociationManagement.Dao.Entity.Membre_Asso;
import com.example.AssociationManagement.Dao.Repository.MembreAssoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MembreAssoBus {

    @Autowired
    private MembreAssoRepository membreAssoRepository;

    public List<Membre_Asso> getAllMembres() {
        return membreAssoRepository.findAll();
    }

    public Optional<Membre_Asso> getMembreById(String id) {
        return membreAssoRepository.findById(id);
    }

    public Membre_Asso createMembre(MembreAssoDto dto) {
        Membre_Asso membre = new Membre_Asso();
        membre.setName(dto.getName());
        membre.setPhone(dto.getPhone());
        membre.setNumOrdre(dto.getNumOrdre());
        membre.setCreationDate(dto.getCreationDate());
        membre.setEtat(dto.getEtat());
        // Assurez-vous d'obtenir le Role_Asso et Association à partir des IDs avant de les définir
        // membre.setRole(role);
        // membre.setAssociation(association);
        return membreAssoRepository.save(membre);
    }

    public Membre_Asso updateMembre(String id, MembreAssoDto dto) {
        Optional<Membre_Asso> existingMembre = membreAssoRepository.findById(id);
        if (existingMembre.isPresent()) {
            Membre_Asso membre = existingMembre.get();
            membre.setName(dto.getName());
            membre.setPhone(dto.getPhone());
            membre.setNumOrdre(dto.getNumOrdre());
            membre.setCreationDate(dto.getCreationDate());
            membre.setEtat(dto.getEtat());
            // Mettez à jour les relations si nécessaire
            return membreAssoRepository.save(membre);
        }
        return null;
    }

    public void deleteMembre(String id) {
        membreAssoRepository.deleteById(id);
    }
}
