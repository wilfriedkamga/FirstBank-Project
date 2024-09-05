package com.example.AssociationManagement.Business;


import com.example.AssociationManagement.Dao.Entity.Privilege_Asso;
import com.example.AssociationManagement.Dao.Enumerations.PrivilegeAsso;
import com.example.AssociationManagement.Dao.Repository.PrivilegeAssoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PrivilegeBus {

    @Autowired
    private PrivilegeAssoRepository privilegeRepository;

    // Méthode pour vérifier et insérer les privilèges manquants dans la base de données
    @PostConstruct
    public void checkAndInsertPrivileges() {
        // Obtenir toutes les valeurs de l'énumération PrivilegeAsso
        List<String> enumPrivileges = List.of(PrivilegeAsso.values())
                .stream()
                .map(Enum::name)
                .collect(Collectors.toList());

        // Obtenir tous les privilèges existants de la base de données
        List<String> existingPrivileges = privilegeRepository.findAll()
                .stream()
                .map(privilege -> privilege.getLabel().name())
                .collect(Collectors.toList());

        // Filtrer les privilèges manquants
        List<String> missingPrivileges = enumPrivileges.stream()
                .filter(privilege -> !existingPrivileges.contains(privilege))
                .collect(Collectors.toList());

        // Insérer les privilèges manquants dans la base de données
        for (String privilege : missingPrivileges) {
            Privilege_Asso newPrivilege = new Privilege_Asso();
            newPrivilege.setLabel(PrivilegeAsso.valueOf(privilege));
            privilegeRepository.save(newPrivilege);
        }
    }
}

