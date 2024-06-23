package com.example.AssociationManagement.Business;

import com.example.AssociationManagement.CustomException.AssociationAlreadyExistsException;
import com.example.AssociationManagement.CustomException.AssociationNotFoundException;
import com.example.AssociationManagement.CustomException.RoleAlreadyExistException;
import com.example.AssociationManagement.Dao.Dto.*;
import com.example.AssociationManagement.Dao.Entity.*;
import com.example.AssociationManagement.Dao.Modele.CommonResponseModel;
import com.example.AssociationManagement.Dao.Modele.CreerAssoModele;
import com.example.AssociationManagement.Dao.Modele.UpdateAssoModel;
import com.example.AssociationManagement.Dao.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.text.Normalizer;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
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
    private MembreTontRepository membreTontRepository;

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
        createRole(association.getId(), "President", false);
        createRole(association.getId(), "Tresorier",false);
        createRole(association.getId(), "Secretaire",false);

////         //Traiter les membres après que les rôles de base sont créés
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


    public static String removeAccentsAndLowercase(String input) {
        // Normaliser le texte en décomposant les accents
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        // Utiliser une expression régulière pour supprimer les diacritiques
        String accentRemoved = normalized.replaceAll("\\p{M}", "");
        // Convertir en minuscules
        return accentRemoved.toLowerCase();
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

//
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
            //sendSms(message, phone);
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
    public List<Role_Asso> getRoleAsso(String associationId){
        Association association=associationRepository.findById(associationId).orElse(null);
        if(association==null)throw  new AssociationNotFoundException("Association with id"+associationId+" don't exist");
        return association.getRoles();
    }

    public boolean deleteAssociation(String id) {
        Association association = associationRepository.findById(id).orElse(null);
        if (association != null && association.isDeletable()) {
            associationRepository.delete(association);
            return true;
        }
        return false;
    }

    public Role_Asso createRole(String associationId, String label, boolean isDeletable) {


        Association association = associationRepository.findById(associationId).orElse(null);
        if (association == null) {
            throw new AssociationNotFoundException("Association with id"+associationId+" don't exist");
        }
        List<Role_Asso> roles= association.getRoles();

        AtomicBoolean alreadyExist = new AtomicBoolean(false);
        roles.forEach(role->{
            if (role.getLabel().equals(removeAccentsAndLowercase(label))) {
                alreadyExist.set(true);
            }});
        if(alreadyExist.get())throw new RoleAlreadyExistException("The role with base name "+label+" Already exist");

        Role_Asso role = new Role_Asso();
        role.setLabel(removeAccentsAndLowercase(label));
        role.setAssociation(association);
        role.setIsDeletable(isDeletable); // Or set based on your business logic

        roleAssoRepository.save(role);

        association.getRoles().add(role);
        associationRepository.save(association);

        return role;
    }


    public void deleteRole(String roleId) {
        Role_Asso role_asso=roleAssoRepository.findById(roleId).orElse(null);
        if(role_asso==null)throw new AssociationNotFoundException("Role with id"+roleId+"doesn't exist");
        roleAssoRepository.deleteById(roleId);

        Association association=role_asso.getAssociation();
        List<Role_Asso> roles= association.getRoles();
        AtomicBoolean roleExist=new AtomicBoolean(false);
        AtomicInteger roleIndex=new AtomicInteger(-1);
        AtomicInteger roleIndex2=new AtomicInteger(-1);
        roles.forEach(role->{
            roleIndex2.set(roleIndex.get()+1);
            if(role.getId().equals(roleId)){
                roleIndex.set(roleIndex2.get());
            }
        });

        if(roleExist.get()){
            roleAssoRepository.deleteById(roles.get(roleIndex.get()).getId());
            roles.remove(roleIndex.get());
            association.setRoles(roles);
        }
        else{ throw new AssociationNotFoundException("This role doesn't existe in our database");}

    }
    public void deleteAllRole(String associationId) {
        Association association=associationRepository.findById(associationId).orElse(null);
        if (association == null) {
            throw new AssociationNotFoundException("Association with id"+associationId+" don't exist");
        }
        List<Role_Asso> roles =association.getRoles();
        for(int i=0;i<roles.size();i++){
            if(roles.get(i).isDeletable()){
                System.out.println("Passe bien par ici "+roles.get(i).getLabel());
                roleAssoRepository.deleteById(roles.get(i).getId());
            }
        }
    }

    public void deleteRole2(String associationId, String role_label) {

        Association association=associationRepository.findById(associationId).orElse(null);
        if (association == null) {
            throw new AssociationNotFoundException("Association with id"+associationId+" don't exist");
        }
        List<Role_Asso> roles= association.getRoles();
        AtomicBoolean roleExist=new AtomicBoolean(false);
        AtomicInteger roleIndex=new AtomicInteger(-1);
        AtomicInteger roleIndex2=new AtomicInteger(-1);
        roles.forEach(role->{
            roleIndex2.set(roleIndex.get()+1);
            System.out.println("Je suis bien entré dans la partie qui semble déranger : "+role.getLabel()+" "+removeAccentsAndLowercase(role_label));
            if(role.getLabel().equals(removeAccentsAndLowercase(role_label))){
                roleExist.set(true);
                roleIndex.set(roleIndex2.get());

            }
        });
        if(roleExist.get()){
            roleAssoRepository.deleteById(roles.get(roleIndex.get()).getId());
            roles.remove(roleIndex.get());
            association.setRoles(roles);
        }
        else{ throw new AssociationNotFoundException("This role doesn't exist in our database");}

    }


    public Membre_Asso addMember(String associationId, String name, String phone, String roleLabel) {
        Association association = associationRepository.findById(associationId).orElse(null);
        if (association == null) {
            throw new AssociationNotFoundException("Association not found");
        }

        // Appeler la méthode processMembre pour ajouter le membre
        processMembre(association, phone, roleLabel);

        // Récupérer le membre ajouté pour le retourner
        // Cela suppose que le membre ajouté a été enregistré dans la base de données et peut être récupéré par son téléphone et son rôle
        Role_Asso role = roleAssoRepository.findByAssociationAndLabel(association, roleLabel);
        Membre_Asso membre = membreAssoRepository.findByPhoneAndRoleAndAssociation(phone, role, association);

        return membre;

    }

    public MemberDetailsDto getMemberDetails(String phone) {
        // Récupérer tous les membres ayant ce numéro de téléphone
        List<Membre_Asso> membres = membreAssoRepository.findByPhone(phone);

        if (membres.isEmpty()) {
            throw new AssociationNotFoundException("No member found with phone number: " + phone);
        }

        // Récupérer les Membre_Tont associés à ce membre
        List<Membre_Tont> membresTont = membreTontRepository.findByPhone(phone);

        // Calculer le nombre d'associations
        int nbAssociations = membres.stream()
                .flatMap(membre -> membre.getAssociations().stream())
                .collect(Collectors.toSet())
                .size();

        // Calculer le nombre de tontines
        int nbTontines = membres.stream()
                .flatMap(membre -> membre.getAssociations().stream())
                .mapToInt(Association::getNbTontines)
                .sum();

        // Calculer le nombre de cotisations
        int nbCotisations = membresTont.stream()
                .mapToInt(membreTont -> membreTont.getCotisations().size())
                .sum();

        // Calculer le nombre de dettes (à implémenter si la logique est définie)
        int nbDettes = 0;

        // Calculer le nombre de sanctions
        int nbSanctions = membresTont.stream()
                .mapToInt(membreTont -> membreTont.getSanctions().size())
                .sum();

        // Retourner les détails du membre
        return new MemberDetailsDto(nbAssociations, nbTontines, nbCotisations, nbDettes, nbSanctions);
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
    public List<TontineDto> getTontinesByAssociationId(String associationId) {
        Association association = associationRepository.findById(associationId).orElse(null);
        if (association == null) {
            throw new RuntimeException("Association not found");
        }
        return association.getTontines().stream()
                .map(tontine -> new TontineDto(tontine.getId(), tontine.getName(), tontine.getDate_creation()))
                .collect(Collectors.toList());
    }

    public List<MembreAssoDto> getMembersByAssociationId(String associationId) {
        Association association = associationRepository.findById(associationId).orElse(null);
        if (association == null) {
            throw new RuntimeException("Association not found");
        }
        return association.getMembres().stream()
                .map(member -> new MembreAssoDto(member.getId(), member.getName(), member.getPhone(), member.getCreationDate(), member.getRole().getLabel()))
                .collect(Collectors.toList());
    }

    public List<ReunionDto> getReunionsByAssociationId(String associationId) {
        Association association = associationRepository.findById(associationId).orElse(null);
        if (association == null) {
            throw new RuntimeException("Association not found");
        }
        return association.getReunions().stream()
                .map(reunion -> new ReunionDto(reunion.getId(), reunion.getDateSeance()))
                .collect(Collectors.toList());
    }

    public List<EventDto> getEventsByAssociationId(String associationId) {
        Association association = associationRepository.findById(associationId).orElse(null);
        if (association == null) {
            throw new RuntimeException("Association not found");
        }
        return association.getEvenements().stream()
                .map(event -> new EventDto(event.getId(), event.getDescription(), event.getDateEcheance()))
                .collect(Collectors.toList());
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

//        ResponseEntity<String> response = restTemplate.exchange(
//                "https://sms.lmtgroup.com/api/v1/pushes",
//                HttpMethod.POST,
//                request,
//                String.class
//        );


    }

}
