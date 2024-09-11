//package com.example.AssociationManagement.Business;
//
//
//import com.example.AssociationManagement.Dao.Entity.Privilege_Asso;
//import com.example.AssociationManagement.Dao.Enumerations.PrivilegeAsso;
//import com.example.AssociationManagement.Dao.Repository.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.client.RestTemplate;
//
//import javax.annotation.PostConstruct;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//@Transactional
//public class PrivilegeAssoBus {
//
//    @Autowired
//    private PrivilegeAssoRepository privilegeRepository;
//    @Autowired
//    private AssociationRepository associationRepository;
//
//    @Autowired
//    private MembreAssoRepository membreAssoRepository;
//
//    @Autowired
//    private RoleAssoRepository roleAssoRepository;
//
//    @Autowired
//    private PrivilegeAssoRepository privilegeAssoRepository;
//
//    @Autowired
//    private DocumentRepository documentRepository;
//
//    @Autowired
//    TontineRepository tontineRepository;
//
//    @Autowired
//    private MembreTontRepository membreTontRepository;
//
//    @Autowired
//    private ReunionRepository reunionRepository;
//
//    @Autowired
//    private InvitationRepository invitationRepository;
//
//    @Autowired
//    private RestTemplate restTemplate;
//
//    @Autowired
//    private RoleTontRepository roleTontRepository;
//
//    // Méthode pour vérifier et insérer les privilèges manquants dans la base de données
//    @PostConstruct
//    public void checkAndInsertPrivileges() {
//        // Obtenir toutes les valeurs de l'énumération PrivilegeAsso
//        List<String> enumPrivileges = List.of(PrivilegeAsso.values())
//                .stream()
//                .map(Enum::name)
//                .collect(Collectors.toList());
//
//        // Obtenir tous les privilèges existants de la base de données
//        List<String> existingPrivileges = privilegeRepository.findAll()
//                .stream()
//                .map(privilege -> privilege.getLabel().name())
//                .collect(Collectors.toList());
//
//        // Filtrer les privilèges manquants
//        List<String> missingPrivileges = enumPrivileges.stream()
//                .filter(privilege -> !existingPrivileges.contains(privilege))
//                .collect(Collectors.toList());
//
//        // Insérer les privilèges manquants dans la base de données
//        for (String privilege : missingPrivileges) {
//            Privilege_Asso newPrivilege = new Privilege_Asso();
//            newPrivilege.setLabel(PrivilegeAsso.valueOf(privilege));
//            privilegeRepository.save(newPrivilege);
//        }
//    }
//}
//

package com.example.AssociationManagement.Business;

import com.example.AssociationManagement.Dao.Dto.PrivilegeAssoDto;
import com.example.AssociationManagement.Dao.Entity.Privilege_Asso;
import com.example.AssociationManagement.Dao.Repository.PrivilegeAssoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PrivilegeAssoBus {

    @Autowired
    private PrivilegeAssoRepository privilegeAssoRepository;

    public List<PrivilegeAssoDto> getAllPrivileges() {
        return privilegeAssoRepository.findAll().stream()
                .map(PrivilegeAssoDto::new)
                .collect(Collectors.toList());
    }

    public Optional<PrivilegeAssoDto> getPrivilegeById(String id) {
        return privilegeAssoRepository.findById(id)
                .map(PrivilegeAssoDto::new);
    }

    public PrivilegeAssoDto createPrivilege(PrivilegeAssoDto privilegeAssoDto) {
        Privilege_Asso privilegeAsso = new Privilege_Asso();
        privilegeAsso.setLabel(privilegeAssoDto.getLabel());
        // Convert roleIds to Role_Asso entities if needed
        Privilege_Asso savedPrivilege = privilegeAssoRepository.save(privilegeAsso);
        return new PrivilegeAssoDto(savedPrivilege);
    }

    public PrivilegeAssoDto updatePrivilege(String id, PrivilegeAssoDto privilegeAssoDto) {
        if (!privilegeAssoRepository.existsById(id)) {
            return null;
        }
        Privilege_Asso privilegeAsso = privilegeAssoRepository.findById(id).orElseThrow();
        privilegeAsso.setLabel(privilegeAssoDto.getLabel());
        // Convert roleIds to Role_Asso entities if needed
        Privilege_Asso updatedPrivilege = privilegeAssoRepository.save(privilegeAsso);
        return new PrivilegeAssoDto(updatedPrivilege);
    }

    public void deletePrivilege(String id) {
        privilegeAssoRepository.deleteById(id);
    }
}

