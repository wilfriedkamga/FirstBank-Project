package com.example.AssociationManagement.Business;

import com.example.AssociationManagement.CustomException.AssociationAlreadyExistsException;
import com.example.AssociationManagement.Dao.Dto.AssociationDto;
import com.example.AssociationManagement.Dao.Dto.CreateAssoDto;
import com.example.AssociationManagement.Dao.Dto.MembreAssoDto;
import com.example.AssociationManagement.Dao.Dto.RoleAssoDto;
import com.example.AssociationManagement.Dao.Entity.*;
import com.example.AssociationManagement.Dao.Modele.CommonResponseModel;
import com.example.AssociationManagement.Dao.Modele.CreerAssoModele;
import com.example.AssociationManagement.Dao.Modele.UpdateAssoModel;
import com.example.AssociationManagement.Dao.Repository.AssociationRepository;
import com.example.AssociationManagement.Dao.Repository.MembreAssoRepository;
import com.example.AssociationManagement.Dao.Repository.MembreAssoTempRepository;
import com.example.AssociationManagement.Dao.Repository.RoleAssoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class AssociationBus {

    @Autowired
    private AssociationRepository associationRepository;

    @Autowired
    private MembreAssoRepository membreAssoRepository;

    @Autowired
    private MembreAssoTempRepository membreAssoTempRepository;

    @Autowired
    private RoleAssoRepository roleAssoRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${usermanagement.api.url}")
    private String userManagementApiUrl;

    @Value("${sms.api.url}")
    private String smsApiUrl;


    public CreateAssoDto createAssociation(CreerAssoModele creerAssoModele) {
        if (associationRepository.existsByName(creerAssoModele.getName())) {
            throw new AssociationAlreadyExistsException("An association with the name " + creerAssoModele.getName() + " already exists.");
        }

        // Création de l'objet Association
        Association association = new Association();
        association.setName(creerAssoModele.getName());
        association.setFrequenceReunion(creerAssoModele.getFrequenceReunion());
        association.setJourReunion(creerAssoModele.getJourReunion());
        association.setCreationDate(LocalDate.now());
//
        // Sauvegarde de l'association pour générer l'ID et mettre à jour l'objet association
        association = associationRepository.save(association);

        // Création des rôles de base et les ajout à l'association
        createRole(association, "President");
        createRole(association, "Tresorier");
        createRole(association, "Secretaire");

//         //Traiter les membres après que les rôles de base sont créés
        processMembre(association, creerAssoModele.getPhoneAdmin1(), "President");
        processMembre(association, creerAssoModele.getPhoneAdmin2(), "Tresorier");
        processMembre(association, creerAssoModele.getPhoneAdmin3(), "Secretaire");

        List<RoleAssoDto> roles = association.getRoles().stream()
                .map(role -> new RoleAssoDto(role.getId(), role.getLabel()))
                .collect(Collectors.toList());

        List<MembreAssoDto> membres = association.getMembres().stream()
                .map(membre -> new MembreAssoDto(membre.getId(), membre.getName(), membre.getPhone(), membre.getCreationDate(), membre.getRole().getLabel()))
                .collect(Collectors.toList());

        // Créer et retourner le DTO
        CreateAssoDto createAssoDto = new CreateAssoDto(association.getId(), association.getName(), association.getFrequenceReunion(), association.getJourReunion(), association.getCreationDate(), roles, membres);

        return createAssoDto;


    }

    private Role_Asso createRole(Association association, String roleName) {
        Role_Asso role = new Role_Asso();
        role.setLabel(roleName);
        role.setAssociation(association);
        roleAssoRepository.save(role);


        association.getRoles().add(role);
        associationRepository.save(association);

        return role;
    }

    public List<AssociationDto> getAssociationsByPhoneNumber(String phoneNumber) {
        List<Membre_Asso> membres = membreAssoRepository.findByPhone(phoneNumber);
        return membres.stream()
                .flatMap(membre -> membre.getAssociations().stream())
                .distinct()
                .map(association -> new AssociationDto(
                        association.getId(),
                        association.getName(),
                        association.getFrequenceReunion(),
                        association.getJourReunion(),
                        association.getCreationDate(),
                        association.getNbMembers(),
                        association.getNbTontines()
                ))
                .collect(Collectors.toList());
    }

    private void processMembre(Association association, String phone, String roleName) {
        String url = userManagementApiUrl + "/userExist";
        Map<String, String> requestBody = Map.of("phone", phone);
        ResponseEntity<CommonResponseModel> responseEntity = restTemplate.postForEntity(url, requestBody, CommonResponseModel.class);
        CommonResponseModel response = responseEntity.getBody();


        Role_Asso role = association.getRoles().stream()
                .filter(r -> r.getLabel().equals(roleName))
                .findFirst()
                .orElse(null);

        if (response != null && "0".equals(response.getResponseCode())) {
            // User exists, extract user details
            @SuppressWarnings("unchecked")
            Map<String, Object> userDetails = (Map<String, Object>) response.getData();
            String userName = (String) userDetails.get("fullName");
            System.out.println("Voici les username de cet utilisateur" + userName);

            Membre_Asso membre = new Membre_Asso();
            membre.setName(userName);
            membre.setPhone(phone);
            membre.setCreationDate(LocalDate.now());
            membre.getAssociations().add(association);
            membre.setRole(role);
            membre = membreAssoRepository.save(membre);

            association.getMembres().add(membre);
            association.setNbMembers( association.getMembres().size());
            association.setNbTontines( association.getNbTontines()+1);
            associationRepository.save(association);
        } else {
            // User does not exist, send SMS invitation
            String message = "Please create an account using this link: <link>";
            sendSms(message, phone);
            System.out.println("passe dans les numeros indisponibles...");

            Membre_Asso_Temp membreTemp = new Membre_Asso_Temp();
            membreTemp.setName(phone); // Storing phone as name temporarily
            membreTemp.setPhone(phone);
            membreTemp.setCreationDate(LocalDate.now());
            membreTemp.getAssociations().add(association);
            membreTemp.setRole(role);
            membreTemp = membreAssoTempRepository.save(membreTemp);

        }
    }

    public boolean deleteAssociation(String id) {
        Association association = associationRepository.findById(id).orElse(null);
        if (association != null && association.isDeletable()) {
            associationRepository.delete(association);
            return true;
        }
        return false;
    }

    public Role_Asso createRole(String associationId, String label) {
        Association association = associationRepository.findById(associationId).orElse(null);
        if (association == null) {
            throw new RuntimeException("Association not found");
        }

        Role_Asso role = new Role_Asso();
        role.setLabel(label);
        role.setAssociation(association);
        role.setIsDeletable(true); // Or set based on your business logic

        roleAssoRepository.save(role);

        association.getRoles().add(role);
        associationRepository.save(association);

        return role;
    }


    public boolean deleteRole(String roleId) {

        return false;
    }

    public Membre_Asso addMember(String associationId, String name, String phone, String roleLabel) {
        return null;
    }

    public boolean deleteMember(String memberId) {
        Membre_Asso membre = membreAssoRepository.findById(memberId).orElse(null);
        if (membre != null) {
            membreAssoRepository.delete(membre);
            return true;
        }
        return false;
    }

    public Association updateAssociation(UpdateAssoModel updateAssoModel) {
        Association association = associationRepository.findById(updateAssoModel.getId()).orElse(null);
        if (association == null) {
            throw new RuntimeException("Association not found");
        }

        association.setName(updateAssoModel.getName());
        association.setFrequenceReunion(updateAssoModel.getFrequenceReunion());
        association.setJourReunion(updateAssoModel.getJourReunion());
        association.setModeReunion(updateAssoModel.getModeReunion());

        return associationRepository.save(association);
    }



    private void sendSms(String message, String phone) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Api-Key", "2C250CF6-0B66-41D5-A7A5-59EC8B6942E0");
        headers.set("X-Secret", "Fa20uInW2h2n3IpWs0f4NY6BRcPmC8snBioUcRJHmU9pC7");
        headers.set("Content-Type", "application/json");

        Map<String, Object> payload = new HashMap<>();
        payload.put("senderId", "FirstSaving");
        payload.put("message", message);
        payload.put("msisdn", new String[]{phone});
        payload.put("maskedMsisdn", false);
        payload.put("flag", "GSM7");

        org.springframework.http.HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                "https://sms.lmtgroup.com/api/v1/pushes",
                HttpMethod.POST,
                request,
                String.class
        );

        System.out.println(response.getBody());
    }

}
