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
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import org.apache.commons.io.FileUtils;
import java.io.File;
import java.io.IOException;
import java.text.Normalizer;
import java.time.Instant;
import java.time.LocalDate;
import java.util.*;
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
    private DocumentRepository documentRepository;

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

    @Value("${UPLOAD_DIR}")
    private String UPLOAD_DIR;

    @Value("${GET_IMAGE_BASE_URL}")
    private String GET_IMAGE_BASE_URL;



    @Value("${sms.api.url}")
    private String smsApiUrl;

    @Autowired
    private DefaultRolesConfig defaultRolesConfig;


    public AssociationDto createAssociation(CreaterAssoModele creerAssoModele) {

        if(!verifyNameBeforeCreation(creerAssoModele.getAssociationName(),creerAssoModele.getPhoneAdmin1())){
            throw new AssociationAlreadyExistsException("Vous avez déjà crée une association avec ce nom");
        }
        // Création de l'objet Association
        Association association = new Association();
        association.setName(creerAssoModele.getAssociationName());
        association.setPhoneCreator(creerAssoModele.getPhoneAdmin1());
        association.setFrequenceReunion(creerAssoModele.getMeetingFrequency());
        association.setJourReunion(creerAssoModele.getMeetingDay());
        association.setCreationDate(LocalDate.now());
        association.setState1(true);
        association.setState2(false);
        association.setState3(false);

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

        for (String role : uniqueRoles) {
            createRole(association2.getId(), role, false,1);
        }
        // Envoi des invitations aux membres

        envoyerNotification("Invitation pour une association","Vous invité à rejoindre l'association Dieu est grand",creerAssoModele.getPhoneAdmin3(),creerAssoModele.getPhoneAdmin1(),"1");
        envoyerNotification("Invitation pour une association","Vous invité à rejoindre l'association Dieu est grand",creerAssoModele.getPhoneAdmin2(),creerAssoModele.getPhoneAdmin1(), "1");
        envoyerNotification("Invitation pour une association","Vous avez initié la création de l'association Dieu est grand",creerAssoModele.getPhoneAdmin1(),creerAssoModele.getPhoneAdmin1(), "1");

        // Traiter les membres après que les rôles de base sont créés
        processMembre(association2, creerAssoModele.getPhoneAdmin1(), creerAssoModele.getRoleAdmin1(),1);
        processMembre(association2, creerAssoModele.getPhoneAdmin2(), creerAssoModele.getRoleAdmin2(),2);
        processMembre(association2, creerAssoModele.getPhoneAdmin3(), creerAssoModele.getRoleAdmin3(),3);
//
        List<RoleAssoDto> roles = association.getRoles().stream()
                .map(role -> new RoleAssoDto(role.getId(), role.getLabel(), role.getNbMaxOcc()))
                .collect(Collectors.toList());

        List<MembreAssoDto> membres = association.getMembres().stream()
                .map(membre -> new MembreAssoDto(membre))
                .collect(Collectors.toList());
//
//        // Créer et retourner le DTO
        CreateAssoDto createAssoDto = new CreateAssoDto(association.getId(), association.getName(), association.getFrequenceReunion(), association.getJourReunion(), association.getCreationDate(), roles, membres,3,1,0);

        CreateTontineModele createTontineModele=new CreateTontineModele();
        createTontineModele.setAssociationId(association2.getId());
        createTontineModele.setCreationDate(new Date());
        createTontineModele.setTontineName(creerAssoModele.getTontineName());
        createTontineModele.setPhoneValidateur1(creerAssoModele.getPhoneValidator1());
        createTontineModele.setPhoneValidateur2(creerAssoModele.getPhoneValidator2());
        createTontineModele.setPhoneCreator(creerAssoModele.getPhoneAdmin1());
        createTontineModele.setType(creerAssoModele.getType());
        createTontineModele.setAmount(creerAssoModele.getAmount());
        createTontineModele.setStartDate(creerAssoModele.getStartDate());
        createTontineModele.setEndDate(creerAssoModele.getEndDate());

        createTontine(createTontineModele);


        // Retourner AssoDto
        AssociationDto associationDto=new AssociationDto(association);

        return associationDto;
    }



    public void Inviter_dans_association(String associationId,boolean requierConfirmation, String phoneMembre, String phoneExpéditeur){
        String[] dest= new String[]{phoneMembre};
        Invitation invitation =new Invitation();
        invitation.setEmetteur(phoneExpéditeur);
        invitation.setDate(new Date());
        invitation.setMessageTitle("");
        invitation.setMesssageBody("Invitation à rejoindre l'association Etudiant polytechnique comme membre");
        invitation.setPhoneDest(dest);

        envoyerNotification(invitation.getMesssageBody(),phoneMembre,phoneExpéditeur,phoneExpéditeur, "1");


    }

    public void annuler_invitation (String invitationId, String phone){
        // Celui qui a émis une invitationpeut vouloir annuler cela, i pourra alors le faire en
        // appelant cette méthode qui va se charger de répondre à tous les administrateurs de façons appropriés
        // Et va bien sur supprimer la notification
    }

    public void repondre_invitation_par_membre(String invitationId, boolean reponse){
        // si sa reponse est vrai alors il accepte l'invitation, modifier dans l'objet invitation
        // Si la reponse est fausse, alors il refuse l'invitation, on va notifier les différents administrateurs administrateurs, pour dire que
        // ce membre a refusé.
        // On va alors supprimer l'invitation de la base de données.
    }

    public void repondre_invitation_par_validateur(String invitationId, boolean reponse, String phone){
        // si sa reponse est vrai, alors il accepte l'invitation, il va modifier dans l'invitation et on va envoyer
        // notification à celui qui a émis l'invitation.
        // Si sa réponse est fausse, alors on va notifier l'administrateur qui a notifié et aussi celui qui devait repondre
        //S'il faisait partie de ceux qui devaient absolument repondre, on va supprimer directement l'invitation,
        // Si non, si le cotar peut encore etre atteint, on va tout simplement attendre.
        //( On doit avoir ici une fonction pour determiner si le cotar peut etre atteint ou pas

    }
    public AssociationDto  confirmerCreationAssociation (ConfirmerCreationAssoModel confirmerCreationAssoModel){
        Association association =associationRepository.findById(confirmerCreationAssoModel.getAssociationId()).orElse(null);
        if(association==null){
            throw  new AssociationNotFoundException("Cette association n'existe pas dans votre systeme");
        }

        Membre_Asso membreExist = association.getMembres().stream()
                .filter(r -> r.getPhone().equals(confirmerCreationAssoModel.getIdAdmin())).findFirst()
                .orElse(null);

        if(membreExist==null){ throw new AssociationAlreadyExistsException("Cette utilisateur n'est pas membre de cette application");}

        if(association.isState3() && association.isState2() && association.isState1()){
            throw  new AssociationNotFoundException("Cette association est déjà opérationnelle");
        }

        if(membreExist.getNumOrdre()==1){association.setState1(confirmerCreationAssoModel.isReponse());}
        if(membreExist.getNumOrdre()==2){association.setState2(confirmerCreationAssoModel.isReponse());}
        if(membreExist.getNumOrdre()==3){association.setState3(confirmerCreationAssoModel.isReponse());}

        return new AssociationDto(associationRepository.save(association));
    }
    public boolean verifyNameBeforeCreation(String assoName, String phoneCreator){

        Association association =associationRepository.findByNameAndPhoneCreator(assoName,phoneCreator).orElse(null);
        if(association==null){
            return true;
        }

        return false;

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
                .map(membre -> new MembreAssoDto(membre))
                .collect(Collectors.toList());

        AssociationDto associationDto=new AssociationDto(association);//association.getId(),association.getName(),association.getFrequenceReunion(),association.getJourReunion(),association.getCreationDate(),association.getNbMembers(),association.getNbTontines(),association.getEvenements().size(),association.getReunions().size(),association.getDocument().size());


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
                .filter(association -> association.isVisibility())
                .map(association -> new AssociationDto(association))
                .collect(Collectors.toList());

    }

    public CommonResponseModel envoyerNotification(String titre, String message, String phoneDestinataire,String phoneEmetteur,String withSms) {
        // Créer le corps de la requête comme une carte (Map)
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> requestBody = Map.of(
                "title", titre,
                "message", message,
                "receiverPhone", phoneDestinataire,
                "senderPhone",phoneEmetteur,
                "withSms","1"        );

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<Map<String, String>>(requestBody, headers);
        try {
            ResponseEntity<CommonResponseModel> responseEntity = restTemplate.postForEntity(notificationManagementApiUrl+"/send", requestEntity, CommonResponseModel.class);
            return responseEntity.getBody();
        } catch (Exception e) {
            throw new IllegalArgumentException("Nous n'avons pas pu envoyer la notification",e);

        }
    }

    public AssociationDto ouvrir_association(String associationId){
        Association association =associationRepository.findById(associationId).orElse(null);
        System.out.println(associationId);
        if(association==null){
            throw  new AssociationNotFoundException("Cette association n'existe pas dans votre systeme");
        }
        if(association.isAlredryOpen()){
            throw new  AssociationAlreadyExistsException("Cette association est déjà ouverte");
        }

        association.setAlredryOpen(true);

        return new AssociationDto(associationRepository.save(association));
    }

    private void processMembre(Association association, String phone, String roleName, int numOrdre) {
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
        try{
            ResponseEntity<CommonResponseModel> responseEntity = restTemplate.postForEntity(url, requestBody, CommonResponseModel.class);
            CommonResponseModel response = responseEntity.getBody();

            // User exists, extract user details
            @SuppressWarnings("unchecked")
            Map<String, Object> userDetails = (Map<String, Object>) response.getData();
            String userName = (String) userDetails.get("fullName");

            // Envoyer une notification pour demander d'intégrer le groupe.

            //if(roleName.equals("createur"))
//
            //envoyerNotification("Création d'une nouvelle tontine", "Vous avez été ajouté dans une nouvelle tontine", phone);


            // sendInvitation()

            Membre_Asso membre = new Membre_Asso();
            membre.setName(userName);
            membre.setPhone(phone);
            membre.setNumOrdre(numOrdre);
            if(numOrdre==1){
                membre.setStateConfirmation(true);
                membre.setStatusConfirmation(true);
                membre.setIsCreator(true);
            }
            membre.setCreationDate(LocalDate.now());
            membre.getAssociations().add(association);
            membre.setRole(role);
            membre = membreAssoRepository.save(membre);

            association.getMembres().add(membre);
            association.setNbMembers(association.getMembres().size());
            associationRepository.save(association);

        }catch (HttpClientErrorException e){
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

    public Association deleteAssociation(String id) {
        Association association = associationRepository.findById(id).orElse(null);

        if(association ==null){
            throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données.");
        }

        List<String> roleIdList = new ArrayList<>();
        List<String> membreAssoList = new ArrayList<>();
        // Supprimer tous ses roles
        for(int i=0;i<association.getMembres().size();i++){
            roleIdList.add(association.getRoles().get(i).getId());
            membreAssoList.add(association.getMembres().get(i).getId());
        }
        association.setVisibility(false);

        return associationRepository.save(association);
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
        // Appeler la méthode processMembre pour ajouter le membre
        processMembre(association, phone, roleLabel.toLowerCase(),0);

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
                .map(membre -> new MembreAssoDto(membre))
                .collect(Collectors.toList());

        // Créer et retourner le DTO

        association.setName(updateAssoModel.getName());
        association.setFrequenceReunion(updateAssoModel.getFrequenceReunion());
        association.setJourReunion(updateAssoModel.getJourReunion());
        association.setModeReunion(updateAssoModel.getModeReunion());

        CreateAssoDto createAssoDto = new CreateAssoDto(association.getId(), updateAssoModel.getName(), updateAssoModel.getFrequenceReunion(), updateAssoModel.getJourReunion(), association.getCreationDate(), roles, membres,membres.size(),association.getNbTontines(),association.getNbTontines());
        associationRepository.save(association);

        return createAssoDto;
    }

    public List<TontineDto> getTontinesByAssociationId(String associationId) {
        Association association = associationRepository.findById(associationId).orElse(null);
        if (association == null) {
            throw new RuntimeException("Association not found");
        }

        List<TontineDto> tontineDtos = new ArrayList<>();
        List<String> table=new ArrayList<>();
        for (Tontine tontine : association.getTontines()) {
            TontineDto tontineDto = new TontineDto();
            tontineDto.setTontineName(tontine.getTontineName());
            tontineDto.setAmount(tontine.getAmount());
            tontineDto.setType(tontine.getType());
            tontineDto.setNbMembres(tontine.getNb_membre());
            tontineDto.setCreationDate(tontine.getCreationDate());
            tontineDto.setStartDate(tontine.getStartDate());
            tontineDto.setEndDate(tontine.getEndDate());
            tontineDto.setId(tontine.getId());
            tontineDto.setPurpose(tontine.getPurpose());
            tontineDtos.add(tontineDto);
        }

        return tontineDtos;
    }

    public List<MembreAssoDto> getMembersByAssociationId(String associationId) {
        Association association = associationRepository.findById(associationId).orElse(null);
        if (association == null) {
            throw new AssociationNotFoundException("Association not found");
        }
        return association.getMembres().stream()
                .map(member -> new MembreAssoDto(member))
                .collect(Collectors.toList());
    }

    public MembreAssoDto answerNotification(String membre_assoId, boolean answer){
        Membre_Asso membre = membreAssoRepository.findById(membre_assoId).orElse(null);
        if (membre == null) {
            throw new AssociationNotFoundException("Ce membre n'existe pas dans cette associaiton.");

        }


        membre.setStateConfirmation(true);
        membre.setStatusConfirmation(answer);

        if(!answer){
            for (Association association : membre.getAssociations()) {
            association.getMembres().remove(membre);
            associationRepository.save(association);
            membreAssoRepository.delete(membre);}
        }
        return new MembreAssoDto(membre);
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

    public Tontine createTontineInCreation(CreateTontineModele createTontineModel) {

        Optional<Association> association = associationRepository.findById(createTontineModel.getAssociationId());

        if (!association.isPresent()) throw new AssociationNotFoundException("Désolé, mais cette association n'existe pas");

        Tontine tontine = new Tontine();
        tontine.setAssociation(association.get());
        tontine.setTontineName(createTontineModel.getTontineName());
        tontine.setCreationDate(LocalDate.now());
        tontine.setNb_membre("2");
        tontine.setType(createTontineModel.getType());
        tontine.setAmount(createTontineModel.getAmount());
        Membre_Asso membre_asso=new Membre_Asso();
        List<Membre_Asso> listMembres=membreAssoRepository.findByPhone("");

        for(int i=0;i<listMembres.size();i++){
            for(int j=0;j<listMembres.get(i).getAssociations().size();j++){
                if(listMembres.get(i).getAssociations().get(j).getId().equals(createTontineModel.getAssociationId())){
                    membre_asso=listMembres.get(i);
                }
            }

        }

        Tontine newTontine = tontineRepository.save(tontine);
//        association.get().setNbTontines(association.get().getNbTontines() + 1);
//        associationRepository.save(association.get());

//        // Créer les rôles et ajouter les membres validateurs
//        Role_Tont validateurRole = createRoleTontine("validateur", false, newTontine);
//        createRoleTontine("membre", false, newTontine);
//
//        addMembreTontine(newTontine.getId(), validateurRole.getId(), createTontineModel.getPhoneValidateur1());
//        addMembreTontine(newTontine.getId(), validateurRole.getId(), createTontineModel.getPhoneValidateur2());

        return null;// newTontine;
    }


    public Tontine createTontine(CreateTontineModele createTontineModel) {

        Optional<Association> association = associationRepository.findById(createTontineModel.getAssociationId());

        if (!association.isPresent()) throw new AssociationNotFoundException("Désolé, mais cette association n'existe pas");

        Tontine tontine = new Tontine();
        tontine.setAssociation(association.get());
        tontine.setTontineName(createTontineModel.getTontineName());
        tontine.setCreationDate(LocalDate.now());
        tontine.setNb_membre("2");
        tontine.setType(createTontineModel.getType());
        tontine.setAmount(createTontineModel.getAmount());
        tontine.setPhoneValidator1(createTontineModel.getPhoneValidateur1());
        tontine.setPhoneValidator2(createTontineModel.getPhoneValidateur2());

        Membre_Asso membre_asso=new Membre_Asso();
        List<Membre_Asso> listMembres=membreAssoRepository.findByPhone("");

        for(int i=0;i<listMembres.size();i++){
            for(int j=0;j<listMembres.get(i).getAssociations().size();j++){
                if(listMembres.get(i).getAssociations().get(j).getId().equals(createTontineModel.getAssociationId())){
                    membre_asso=listMembres.get(i);
                }
            }

        }

//
        Tontine newTontine = tontineRepository.save(tontine);
        association.get().setNbTontines(association.get().getNbTontines() + 1);
        associationRepository.save(association.get());

        // Créer les rôles et ajouter les membres validateurs
        Role_Tont validateurRole = createRoleTontine("validateur", false, newTontine);
        createRoleTontine("membre", false, newTontine);

        addMembreTontine(newTontine.getId(), validateurRole.getId(), createTontineModel.getPhoneValidateur1());
        addMembreTontine(newTontine.getId(), validateurRole.getId(), createTontineModel.getPhoneValidateur2());
        addMembreTontine(newTontine.getId(), validateurRole.getId(), createTontineModel.getPhoneCreator());

        return null;// newTontine;
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
        if (!roleOpt.isPresent()) {
            throw new AssociationNotFoundException("Le rôle avec l'ID " + idRole + " n'existe pas");
        }
        Role_Tont role = roleOpt.get();

        // Récupérer la tontine
        Optional<Tontine> tontineOpt = tontineRepository.findById(idTontine);
        if (!tontineOpt.isPresent()) {
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
            existingTontine.setTontineName(tontineDetails.getTontineName());
            existingTontine.setAmount(tontineDetails.getAmount());
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

    public DocumentDto uploadFile(UploadFileModel fileModel) throws IllegalArgumentException, IOException {
        String associationId = fileModel.getAssociationId();
        DocumentDto documentDto=new DocumentDto();
        Optional<Association> optionalAsso =  associationRepository.findById(associationId);
        if (!optionalAsso.isPresent()) {
            throw new AssociationNotFoundException("Association with id: " + associationId+" don't exist in our database !!");
        }

        Association association= optionalAsso.get();

        List<Document> documentList =association.getDocument();
        for(int i=0;i<documentList.size();i++){
            if(documentList.get(i).getNom().equals(fileModel.getNom())){
                throw new AssociationAlreadyExistsException(" Le document avec ce nom existe déjà dans cette association ");
            }
        }

        // Base directory where files will be stored
        String baseDir = UPLOAD_DIR;

//		// Check and upload cniRecto file
        MultipartFile fileToUpload = fileModel.getFile();
        Document document=new Document();

        if (fileToUpload != null && !fileToUpload.isEmpty()) {
            String fileName = fileModel.getNom() +"."+ getExtension(fileToUpload.getOriginalFilename());
            // construir le chemin et le lien du fichier

            String chemin=baseDir + fileName;

            String lien=GET_IMAGE_BASE_URL+fileName;

            File file=new File(chemin);

            String encodedString = Base64.getEncoder().encodeToString(fileToUpload.getBytes());
            byte[] data = Base64.getDecoder().decode(encodedString);
            File outFile = new File(chemin);
            FileUtils.writeByteArrayToFile(outFile, data);


            document.setNom(fileModel.getNom());
            document.setDescription(fileModel.getDescription());
            document.setNomComplet(fileName);
            document.setDate(Date.from(Instant.now()));
            document.setTaille(fileToUpload.getSize()+"");
            document.setChemin(chemin);
            document.setLien_telechargement(lien);
            document.setAssociation(association);
            documentRepository.save(document);
            association.addDocument(document);
            associationRepository.save(association);
            documentDto.setId(document.getId());
            documentDto.setAssociationId(document.getAssociation().getId());
            documentDto.setDescription(document.getDescription());
            documentDto.setNomComplet(document.getNomComplet());
            documentDto.setNom(document.getNom());
            documentDto.setLien(document.getLien_telechargement());
            documentDto.setTaille(document.getTaille());
            documentDto.setDate(document.getDate());

        }


        return documentDto;
    }

    public String getExtension(String fileName) {
        if (fileName != null && fileName.lastIndexOf('.') != -1) {
            return fileName.substring(fileName.lastIndexOf('.') + 1);
        }
        return "";
    }

    public AssociationDto deleteDocument(String associationId, String documentId) {
        Optional<Association> optionalAsso =  associationRepository.findById(associationId);
        if (!optionalAsso.isPresent()) {
            throw new AssociationNotFoundException("Association with id: " + associationId+" don't exist in our database !!");
        }

        Association association= optionalAsso.get();

        List<Document> documentList =association.getDocument();

        System.out.println("taille du document avant"+documentList.size());

        boolean isFound=false;
        for(int i=0;i<documentList.size();i++){
            if(documentList.get(i).getId().equals(documentId)){
                documentList.remove(i);
                documentRepository.deleteById(documentId);
                isFound=true;
            }
        }
        System.out.println("taille du document apres"+documentList.size());
        if(!isFound){throw  new AssociationNotFoundException("Désolé, mais ce document n'existe pas dans cette association");}

        association.setDocuments(documentList);
        associationRepository.save(association);
        AssociationDto associationDto=new AssociationDto();
        associationDto.setId(association.getId());
        associationDto.setNbDocument(association.getDocument().size());
        associationDto.setName(association.getName());
        return associationDto;
    }

    public List<DocumentDto> getDocumentsByAssociationId(String associationId){
        Association association=associationRepository.findById(associationId).orElse(null);
        List<DocumentDto> documentDtos=new ArrayList<>();
        if(association==null){
            throw  new AssociationNotFoundException("Cette association n'existe pas dans votre systeme");
        }

        List<Document> listDocs=documentRepository.findByAssociation_Id(associationId);
        System.out.println(listDocs.size());
        if(listDocs.size()!=0){
            for(int i=0;i<listDocs.size();i++){
                Document doc=listDocs.get(i);
                DocumentDto docDto=new DocumentDto();
                docDto.setId(doc.getId());
                docDto.setNom(doc.getNom());
                docDto.setNomComplet(doc.getNomComplet());
                docDto.setAssociationId(doc.getAssociation().getId());
                docDto.setTaille(doc.getTaille());
                docDto.setDescription(doc.getDescription());
                docDto.setLien(doc.getLien_telechargement());
                docDto.setDate(doc.getDate());

                documentDtos.add(docDto);
            }
        }



        return documentDtos;

    }



}
