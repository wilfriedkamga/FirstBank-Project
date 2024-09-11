package com.example.AssociationManagement.Business;
import com.example.AssociationManagement.Dao.Dto.MembreTontDto;
import com.example.AssociationManagement.Dao.Entity.Membre_Tont;
import com.example.AssociationManagement.Dao.Repository.MembreTontRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MembreTontBus {

    @Autowired
    private MembreTontRepository membreTontRepository;

    public List<Membre_Tont> getAllMembresTont() {
        return membreTontRepository.findAll();
    }

    public Optional<Membre_Tont> getMembreTontById(String id) {
        return membreTontRepository.findById(id);
    }

    public Membre_Tont createMembreTont(MembreTontDto membreTontDto) {
        Membre_Tont membreTont = new Membre_Tont();
        membreTont.setName(membreTontDto.getName());
        membreTont.setNbOcc(membreTontDto.getNbOcc());
        membreTont.setPhone(membreTontDto.getPhone());
        membreTont.setCreationDate(membreTontDto.getCreationDate());
        // Fetch Tontine and Role_Tont by their IDs and set them
        // membreTont.setTontines(...);
        // membreTont.setRole_tont(...);
        return membreTontRepository.save(membreTont);
    }

    public Membre_Tont updateMembreTont(String id, MembreTontDto membreTontDto) {
        Optional<Membre_Tont> optionalMembreTont = membreTontRepository.findById(id);
        if (optionalMembreTont.isPresent()) {
            Membre_Tont membreTont = optionalMembreTont.get();
            membreTont.setName(membreTontDto.getName());
            membreTont.setNbOcc(membreTontDto.getNbOcc());
            membreTont.setPhone(membreTontDto.getPhone());
            membreTont.setCreationDate(membreTontDto.getCreationDate());
            // Update Tontine and Role_Tont
            // membreTont.setTontines(...);
            // membreTont.setRole_tont(...);
            return membreTontRepository.save(membreTont);
        }
        return null;
    }

    public void deleteMembreTont(String id) {
        membreTontRepository.deleteById(id);
    }
}
