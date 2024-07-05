package com.example.AssociationManagement.Business;

import com.example.AssociationManagement.Config.DefaultRolesConfig;
import com.example.AssociationManagement.CustomException.AssociationAlreadyExistsException;
import com.example.AssociationManagement.CustomException.AssociationNotFoundException;
import com.example.AssociationManagement.CustomException.RoleAlreadyExistException;
import com.example.AssociationManagement.Dao.Dto.*;
import com.example.AssociationManagement.Dao.Entity.*;
import com.example.AssociationManagement.Dao.Modele.*;
import com.example.AssociationManagement.Dao.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.text.Normalizer;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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
    TontineRepository tontineRepository;

    @Autowired
    private MembreTontRepository membreTontRepository;

    @Autowired
    private ReunionRepository reunionRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private RoleTontRepository roleTontRepository;

    @Value("${usermanagement.api.url}")
    private String userManagementApiUrl;
    @Value("${notificationmanagement.api.url}")
    private String notificationManagementApiUrl;



    @Value("${sms.api.url}")
    private String smsApiUrl;

    @Autowired
    private DefaultRolesConfig defaultRolesConfig;


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
        association.setNbTontines(1);

        // Sauvegarde de l'association pour générer l'ID et mettre à jour l'objet association
        Association association2 = associationRepository.save(association);

        // Ajouter le rôle "créateur" aux rôles par défaut
        List<String> defaultRoles = defaultRolesConfig.getDefaultRoles();
        List<String> uniqueRoles = defaultRolesConfig.getUniqueRoles();



        // Création des rôles de base et les ajout à l'association
        createRole(association2.getId(), "createur", false,1);


        for (String role : defaultRoles) {
            createRole(association2.getId(), role, true,1000);

        }
//
        for (String role : uniqueRoles) {
            createRole(association2.getId(), role, false,1);

        }

        // Traiter les membres après que les rôles de base sont créés
        processMembre(association2, creerAssoModele.getPhoneAdmin1(), creerAssoModele.getRoleAdmin1());
        processMembre(association2, creerAssoModele.getPhoneAdmin2(), creerAssoModele.getRoleAdmin2());
        processMembre(association2, creerAssoModele.getPhoneAdmin3(), creerAssoModele.getRoleAdmin3());
//

        List<RoleAssoDto> roles = association.getRoles().stream()
                .map(role -> new RoleAssoDto(role.getId(), role.getLabel(), role.getNbMaxOcc()))
                .collect(Collectors.toList());

        List<MembreAssoDto> membres = association.getMembres().stream()
                .map(membre -> new MembreAssoDto(membre.getId(), membre.getName(), membre.getPhone(), membre.getCreationDate(), membre.getRole().getLabel()))
                .collect(Collectors.toList());
//
//        // Créer et retourner le DTO
        CreateAssoDto createAssoDto = new CreateAssoDto(association.getId(), association.getName(), association.getFrequenceReunion(), association.getJourReunion(), association.getCreationDate(), roles, membres);

        return createAssoDto;
    }


    public CreateAssoDto createAssociation(String associationId){
        Association association =associationRepository.findById(associationId).orElse(null);
        if(association==null){
            throw  new AssociationNotFoundException("Cette association n'existe pas dans votre systeme");
        }
        List<RoleAssoDto> roles = association.getRoles().stream()
                .map(role -> new RoleAssoDto(role.getId(), role.getLabel(),role.getNbMaxOcc()))
                .collect(Collectors.toList());

        List<MembreAssoDto> membres = association.getMembres().stream()
                .map(membre -> new MembreAssoDto(membre.getId(), membre.getName(), membre.getPhone(), membre.getCreationDate(), membre.getRole().getLabel()))
                .collect(Collectors.toList());

        CreateAssoDto asso=new CreateAssoDto(association.getId(),association.getName(),
                association.getFrequenceReunion(),association.getJourReunion(),association.getCreationDate(),roles,membres);
        return null;
    }
    public AssociationDto getAssociation(String associationId){
        Association association =associationRepository.findById(associationId).orElse(null);
        if(association==null){
            throw  new AssociationNotFoundException("Cette association n'existe pas dans votre systeme");
        }
        List<RoleAssoDto> roles = association.getRoles().stream()
                .map(role -> new RoleAssoDto(role.getId(), role.getLabel(), role.getNbMaxOcc()))
                .collect(Collectors.toList());

        List<MembreAssoDto> membres = association.getMembres().stream()
                .map(membre -> new MembreAssoDto(membre.getId(), membre.getName(), membre.getPhone(), membre.getCreationDate(), membre.getRole().getLabel()))
                .collect(Collectors.toList());

        AssociationDto associationDto=new AssociationDto(association.getId(),association.getName(),association.getFrequenceReunion(),association.getJourReunion(),association.getCreationDate(),association.getNbMembers(),association.getNbTontines());
        associationDto.setNbReunion(association.getReunions().size());
        associationDto.setNbEvenement(association.getEvenements().size());

        return associationDto;
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

    public CommonResponseModel envoyerNotification(String titre, String message, String phoneDestinataire) {
        // Créer le corps de la requête comme une carte (Map)
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);


        System.out.println("N'entre pas par ici");
        Map<String, String> requestBody = Map.of(
                "title", titre,
                "message", message,
                "phone", phoneDestinataire
        );

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<Map<String, String>>(requestBody, headers);


        // Envoyer la requête POST en utilisant postForEntity
        try {
            System.out.println("Success de la verification avant !!!"+notificationManagementApiUrl);
            ResponseEntity<CommonResponseModel> responseEntity = restTemplate.postForEntity(notificationManagementApiUrl+"/send", requestEntity, CommonResponseModel.class);
            System.out.println("Success de la verification !!!");
            return responseEntity.getBody();
        } catch (Exception e) {
            System.err.println("Échec de l'envoi de la notification: " + e.getMessage());
            return null;
        }
    }

    private void processMembre(Association association, String phone, String roleName) {
        // Vérifier si le rôle existe dans l'association
        Role_Asso role = association.getRoles().stream()
                .filter(r -> r.getLabel().equals(roleName))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Role " + roleName + " does not exist in the association."));

        // Vérifier si le rôle est unique et déjà alloué
        // Récupérer tous les membres qui ont le rôle spécifié
        List<Membre_Asso> membresAvecRole = membreAssoRepository.findByRole(role);

        // Compter ceux qui ont l'association en question
        long currentRoleCount = membresAvecRole.stream()
                .filter(membre -> membre.getAssociations().contains(association))
                .count();

        if (currentRoleCount >= role.getNbMaxOcc()) {
            throw new AssociationNotFoundException("The maximum number of occurrences for the role " + roleName + " has been reached.");
        }

        String url = userManagementApiUrl + "/userExist";
        Map<String, String> requestBody = Map.of("phone", phone);
        ResponseEntity<CommonResponseModel> responseEntity = restTemplate.postForEntity(url, requestBody, CommonResponseModel.class);
        CommonResponseModel response = responseEntity.getBody();

        if (response != null && "0".equals(response.getResponseCode())) {
            // User exists, extract user details
            @SuppressWarnings("unchecked")
            Map<String, Object> userDetails = (Map<String, Object>) response.getData();
            String userName = (String) userDetails.get("fullName");

            // Envoyer une notification pour demander d'intégrer le groupe.

            if(roleName.equals("createur"))
                envoyerNotification("Association des enfants de Dieu", "Vous avez initiez la création d'une nouvelle association", phone);

            envoyerNotification("Création d'une nouvelle tontine", "Vous avez été ajouté dans une nouvelle tontine", phone);


            // sendInvitation()
            Membre_Asso membre = new Membre_Asso();
            membre.setName(userName);
            membre.setPhone(phone);
            if(roleName.equals("createur"))
            membre.setActif(false);
            membre.setCreationDate(LocalDate.now());
            membre.getAssociations().add(association);
            membre.setRole(role);
            membre = membreAssoRepository.save(membre);

            association.getMembres().add(membre);
            association.setNbMembers(association.getMembres().size());
            associationRepository.save(association);
        } else {
            // User does not exist, send SMS invitation
            String message = "Please create an account using this link: <link>";
            sendSms(message, phone);

            Membre_Asso_Temp membreTemp = new Membre_Asso_Temp();
            membreTemp.setName("Inconnu"); // Storing phone as name temporarily
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

    public Role_Asso createRole(String associationId, String label, boolean isDeletable,int nbMaxOcc) {


        Association association = associationRepository.findById(associationId).orElse(null);
        if (association == null) {
            throw new AssociationNotFoundException("Association with id"+associationId+" don't exist");
        }

        List<Role_Asso> roles= association.getRoles();

        AtomicBoolean alreadyExist = new AtomicBoolean(false);
        roles.forEach(role->{
            if (role.getLabel().equals(removeAccentsAndLowercase(label))) {
                alreadyExist.set(true);
                System.out.println(role.getLabel()+" VS "+removeAccentsAndLowercase(label));
            } });
        if(alreadyExist.get())throw new RoleAlreadyExistException("The role with base name "+label+" Already exist in the association "+association.getName());

        Role_Asso role = new Role_Asso();
        role.setLabel(removeAccentsAndLowercase(label));
        role.setAssociation(association);
        role.setNbMaxOcc(nbMaxOcc);
        role.setIsDeletable(isDeletable); // Or set based on your business logic

        roleAssoRepository.save(role);
//
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

        Membre_Asso membreExist = association.getMembres().stream()
                .filter(r -> r.getPhone().equals(phone)).findFirst()
                .orElse(null);

        if(membreExist!=null){ throw new AssociationAlreadyExistsException("Cette utilisateur existe déjà dans cette association");}


        Role_Asso roleExist = association.getRoles().stream()
                .filter(r -> r.getLabel().equals(roleLabel.toLowerCase())).findFirst()
                .orElse(null);

        if(roleExist==null){ throw new AssociationAlreadyExistsException("Le rôle que vous avez entré n'existe pas dans cette association");}
        System.out.println("Voici les tests passe par ici 2");
        // Appeler la méthode processMembre pour ajouter le membre
        processMembre(association, phone, roleLabel.toLowerCase());
        System.out.println("Voici les tests passe par ici");

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

    public CreateAssoDto updateAssociation(UpdateAssoModel updateAssoModel) {
        Association association = associationRepository.findById(updateAssoModel.getId()).orElse(null);
        if (association == null) {
            throw new AssociationNotFoundException("Association not found");
        }

        List<RoleAssoDto> roles = association.getRoles().stream()
                .map(role -> new RoleAssoDto(role.getId(), role.getLabel(), role.getNbMaxOcc()))
                .collect(Collectors.toList());

        List<MembreAssoDto> membres = association.getMembres().stream()
                .map(membre -> new MembreAssoDto(membre.getId(), membre.getName(), membre.getPhone(), membre.getCreationDate(), membre.getRole().getLabel()))
                .collect(Collectors.toList());

        // Créer et retourner le DTO

        association.setName(updateAssoModel.getName());
        association.setFrequenceReunion(updateAssoModel.getFrequenceReunion());
        association.setJourReunion(updateAssoModel.getJourReunion());
        association.setModeReunion(updateAssoModel.getModeReunion());

        CreateAssoDto createAssoDto = new CreateAssoDto(association.getId(), updateAssoModel.getName(), updateAssoModel.getFrequenceReunion(), updateAssoModel.getJourReunion(), association.getCreationDate(), roles, membres);
        associationRepository.save(association);

        return createAssoDto;
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

        ResponseEntity<String> response = restTemplate.exchange(
                "https://sms.lmtgroup.com/api/v1/pushes",
                HttpMethod.POST,
                request,
                String.class
        );


    }



    /***********************Gestion des tontines *********************************/



    public Tontine createTontine(CreateTontineModele createTontineModel) {

        Optional<Association> association = associationRepository.findById(createTontineModel.getAssociationId());

        if (association.isEmpty()) throw new AssociationNotFoundException("Désolé, mais cette association n'existe pas");

        Tontine tontine = new Tontine();
        tontine.setAssociation(association.get());
        tontine.setName(createTontineModel.getNom());
        tontine.setDate_creation(LocalDate.now());
        tontine.setNb_membre("2");
        tontine.setType(createTontineModel.getType());
        tontine.setMontant_freq(createTontineModel.getMontant_freq());

        Tontine newTontine = tontineRepository.save(tontine);
        association.get().setNbTontines(association.get().getNbTontines() + 1);
        associationRepository.save(association.get());

        // Créer les rôles et ajouter les membres validateurs
        Role_Tont validateurRole = createRoleTontine("validateur", false, newTontine);
        createRoleTontine("membre", false, newTontine);

        addMembreTontine(newTontine.getId(), validateurRole.getId(), createTontineModel.getPhoneValidateur1());
        addMembreTontine(newTontine.getId(), validateurRole.getId(), createTontineModel.getPhoneValidateur2());

        return newTontine;
    }

    private Role_Tont createRoleTontine(String label, boolean deletable, Tontine tontine) {
        Role_Tont role = new Role_Tont();
        role.setLabel(label);
        role.setDeletable(deletable);
        role.setTontine(tontine);
        return roleTontRepository.save(role);
    }

    private void addMembreTontine(String idTontine, String idRole, String phoneMembre) {
        // Récupérer le rôle
        Optional<Role_Tont> roleOpt = roleTontRepository.findById(idRole);
        if (roleOpt.isEmpty()) {
            throw new AssociationNotFoundException("Le rôle avec l'ID " + idRole + " n'existe pas");
        }
        Role_Tont role = roleOpt.get();

        // Récupérer la tontine
        Optional<Tontine> tontineOpt = tontineRepository.findById(idTontine);
        if (tontineOpt.isEmpty()) {
            throw new AssociationNotFoundException("La tontine avec l'ID " + idTontine + " n'existe pas");
        }
        Tontine tontine = tontineOpt.get();

        // Récupérer l'association de la tontine
        Association association = tontine.getAssociation();

        // Vérifier que le membre fait partie de l'association de la tontine
        Membre_Asso membreAsso = null;
        for (Membre_Asso membre : association.getMembres()) {
            if (membre.getPhone().equals(phoneMembre)) {
                membreAsso = membre;
                break;
            }
        }
        if (membreAsso == null) {
            throw new AssociationNotFoundException("Le membre avec le numéro de téléphone " + phoneMembre + " n'appartient pas à l'association");
        }

        // Vérifier que le membre n'existe pas déjà dans les membres de la tontine



        // Créer et ajouter le nouveau membre
        Membre_Tont membreTont = new Membre_Tont();
        membreTont.getTontines().add(tontine);
        membreTont.setRole_tont(role);
        membreTont.setPhone(phoneMembre);
        membreTont.setName(membreAsso.getName());

        membreTontRepository.save(membreTont);
        tontine.getMembres_tont().add(membreTont);
        tontineRepository.save(tontine);
    }

    // Delete a Tontine
    public void deleteTontine(String tontineId) {
        Optional<Tontine> tontine = tontineRepository.findById(tontineId);
        if (tontine.isPresent() && tontine.get().isDeletable()) {
            tontineRepository.deleteById(tontineId);
        } else {
            throw new RuntimeException("Tontine is not deletable");
        }
    }

    // Modify a Tontine
    public Tontine modifyTontine(String tontineId, Tontine tontineDetails) {
        Optional<Tontine> tontine = tontineRepository.findById(tontineId);
        if (tontine.isPresent()) {
            Tontine existingTontine = tontine.get();
            if (existingTontine.isOnChangeType()) {
                existingTontine.setType(tontineDetails.getType());
            }
            existingTontine.setName(tontineDetails.getName());
            existingTontine.setMontant_freq(tontineDetails.getMontant_freq());
            return tontineRepository.save(existingTontine);
        }
        return null;
    }

    // Add a Member to a Tontine (simple)
    public Membre_Tont addMemberToTontine(String tontineId, Membre_Tont membreTont) {
        Optional<Tontine> tontine = tontineRepository.findById(tontineId);
        if (tontine.isPresent()) {
            List<Membre_Tont> existingMembers = tontine.get().getMembres_tont();
            for (Membre_Tont member : existingMembers) {
                if (member.getPhone().equals(membreTont.getPhone())) {
                    throw new RuntimeException("Member already exists in the tontine");
                }
            }
            membreTont.getTontines().add(tontine.get());
            return membreTontRepository.save(membreTont);
        }
        return null;
    }

    // Add a List of Members to a Tontine
    public void addMembersToTontine(String tontineId, List<Membre_Tont> membresTont) {
        Optional<Tontine> tontine = tontineRepository.findById(tontineId);
        if (tontine.isPresent()) {
            for (Membre_Tont membreTont : membresTont) {
                boolean exists = false;
                for (Membre_Tont member : tontine.get().getMembres_tont()) {
                    if (member.getPhone().equals(membreTont.getPhone())) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    membreTont.getTontines().add(tontine.get());
                    membreTontRepository.save(membreTont);
                } else {
                    throw new RuntimeException("Some members already exist in the tontine");
                }
            }
        }
    }


    // Create a Reunion
    public Reunion createReunion(String associationId, Reunion reunion) {
        Optional<Association> association = associationRepository.findById(associationId);
        if (association.isPresent()) {
            reunion.setAssociation(association.get());
            return reunionRepository.save(reunion);
        }
        return null;
    }



}
