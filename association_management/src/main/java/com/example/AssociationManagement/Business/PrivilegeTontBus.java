package com.example.AssociationManagement.Business;
import com.example.AssociationManagement.Dao.Dto.PrivilegeTontDto;
import com.example.AssociationManagement.Dao.Entity.Privilege_Tont;
import com.example.AssociationManagement.Dao.Repository.PrivilegeTontRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrivilegeTontBus {

    @Autowired
    private PrivilegeTontRepository privilegeTontRepository;

    // Méthode pour obtenir tous les privilèges
    public List<Privilege_Tont> getAllPrivileges() {
        return privilegeTontRepository.findAll();
    }

    // Méthode pour obtenir un privilège par ID
    public Optional<Privilege_Tont> getPrivilegeById(String id) {
        return privilegeTontRepository.findById(id);
    }

    // Méthode pour créer un nouveau privilège
    public Privilege_Tont createPrivilege(PrivilegeTontDto privilegeTontDto) {
        Privilege_Tont privilegeTont = new Privilege_Tont();
        //privilegeTont.setLabel(privilegeTontDto.getLabel());
        // Autres champs à initialiser si nécessaire
        return privilegeTontRepository.save(privilegeTont);
    }

    // Méthode pour mettre à jour un privilège existant
    public Privilege_Tont updatePrivilege(String id, PrivilegeTontDto privilegeTontDto) {
        return privilegeTontRepository.findById(id).map(existingPrivilegeTont -> {
            //existingPrivilegeTont.setLabel(privilegeTontDto.getLabel());
            // Mettre à jour les autres champs si nécessaire
            return privilegeTontRepository.save(existingPrivilegeTont);
        }).orElse(null);
    }

    // Méthode pour supprimer un privilège par ID
    public void deletePrivilege(String id) {
        privilegeTontRepository.deleteById(id);
    }
}
