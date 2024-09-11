package com.example.AssociationManagement.Business;

import com.example.AssociationManagement.Config.DefaultRolesConfig;
import com.example.AssociationManagement.CustomException.AssociationAlreadyExistsException;
import com.example.AssociationManagement.CustomException.AssociationNotFoundException;
import com.example.AssociationManagement.Dao.Dto.*;
import com.example.AssociationManagement.Dao.Entity.*;
import com.example.AssociationManagement.Dao.Enumerations.*;
import com.example.AssociationManagement.Dao.Modele.*;
import com.example.AssociationManagement.Dao.Repository.*;
import com.example.AssociationManagement.HelperClass.DefaultRole;
import com.example.AssociationManagement.HelperClass.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import javax.management.relation.Role;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@Transactional
public class AssociationBus {

    @Autowired
    private AssociationRepository associationRepository;

    @Autowired
    private MembreAssoRepository membreAssoRepository;

    @Autowired
    private RoleAssoRepository roleAssoRepository;

    @Autowired
    private PrivilegeAssoRepository privilegeAssoRepository;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    TontineRepository tontineRepository;

    @Autowired
    private MembreTontRepository membreTontRepository;

    @Autowired
    private ReunionRepository reunionRepository;

    @Autowired
    private InvitationRepository invitationRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    MembreAssoBus membreAssoService;

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


    public Membre_Asso addMemberInCreation2(AddMemberAssociaitonModel model){
        Association association=associationRepository.findById(model.getAssociationId()).orElse(null);
        if(association==null)throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données");
        if(userHasAccount(model.getPhone()).getResponseCode()!="0"){
            if(association==null)throw new AssociationNotFoundException("Cette utilisateur n'existe pas dans notre base de donn");

        };
        return addMemberInCreation(model.getPhone(),model.getFullName(),association,model.getRole());
    }

    public Membre_Asso addMemberInCreation(String phone, String fullName, Association association, String roleLabel){
        List<Membre_Asso> membres=membreAssoRepository.findByPhoneAndAndAssociation_Id(phone, association.getId());
        for(Membre_Asso membre:membres){
            if(membre!=null && membre.getEtat()!=EtatMembre.SUPPRIME)throw new AssociationNotFoundException("Ce membre existe deja dans cette associaiton");

        }
        Membre_Asso membre_asso2=new Membre_Asso();
        membre_asso2.setName(fullName);
        membre_asso2.setPhone(phone);
        membre_asso2.setNumOrdre(association.getMembres().size()+1);
        membre_asso2.setCreationDate(LocalDate.now());
        membre_asso2.setRole(roleAssoRepository.findByLabelAndAssociation_Id(roleLabel, association.getId()));
        membre_asso2.setAssociation(association);
        membre_asso2.setEtat(EtatMembre.INVITE);
        if(association.getPhoneCreator().equals(phone)){
            membre_asso2.setEtat(EtatMembre.ACTIF);
            membre_asso2= membreAssoRepository.save(membre_asso2);
            envoyerNotification("Creation d'une nouvelle association", "Vous avez initié la création de l'association : "+association.getAssoName(),"http://localhot:3000",phone,association.getPhoneCreator(),"1");

        } else{
            membre_asso2=membreAssoRepository.save(membre_asso2);
            CreateInvitation(association,membre_asso2,membre_asso2,InvitationType.CREATE_ASSOCIATION,0);
            // On lui envoi la notification pour dire qu'il est appele a integrer une assocciation
            envoyerNotification("Invitation pour une association", "Veuillez vous connecter pour repondre à l'invitation pour rejoindre l'association : "+association.getAssoName()+"","http://localhot:3000",phone,association.getPhoneCreator(),"1");
        }
        return membre_asso2;
    }

    // Creer une nouvelle association
    public AssociationDto createAssociation(CreaterAssoModele creerAssoModele) {
        // Verifions si le membre est utilisateur de l'application
        String phone1=creerAssoModele.getPhoneAdmin1();
        String phone2=creerAssoModele.getPhoneAdmin2();
        String phone3=creerAssoModele.getPhoneAdmin3();

        // On recupère chaque membre
        CommonResponseModel admin1Details=userHasAccount(phone1);
        if(!admin1Details.getResponseCode().equals("0")){
            throw new AssociationNotFoundException(admin1Details.getMessage());
        }
        CommonResponseModel admin2Details=userHasAccount(phone2);
        if(!admin2Details.getResponseCode().equals("0")){
            throw new AssociationNotFoundException(admin2Details.getMessage());
        }
        CommonResponseModel admin3Details=userHasAccount(phone3);
        if(!admin3Details.getResponseCode().equals("0")){
            throw new AssociationNotFoundException(admin3Details.getMessage());
        }

        if(phone1.equals(phone2) || phone1.equals(phone2) || phone2.equals(phone3)){
            throw new AssociationAlreadyExistsException("Les trois administrateurs doivent être diffrents");
        }
        // Verifions si le nom de cette association est valide
        Association association1 =associationRepository.findByAssoNameAndPhoneCreator(creerAssoModele.getAssociationName(),creerAssoModele.getPhoneAdmin1()).orElse(null);
        if(association1!=null && association1.getState()!=EtatAsso.SUPPRIME){
            throw new AssociationAlreadyExistsException("Vous ne pouvez pas cree deux associations avec le même nom.");
        }
        Association association=new Association();
        association.setAssoName(creerAssoModele.getAssociationName());
        association.setPhoneCreator(creerAssoModele.getPhoneAdmin1());
        association.setMeetFrequency(creerAssoModele.getMeetingFrequency());
        association.setMeetDay(creerAssoModele.getMeetingDay());
        association.setCreationDate(LocalDate.now());
        association.setState(EtatAsso.INITIE);
        association=associationRepository.save(association);

        // on cree les roles ici
        List<Role_Asso> roles = new ArrayList<>();
        for (DefaultRole defaultRole : defaultRolesConfig.getDefaultRoles()) {
            Role_Asso role = new Role_Asso();
            role.setLabel(defaultRole.getRoleName());
            role.setLabelV(defaultRole.getLabel());
            role.setNbMaxOcc(defaultRole.getMaxPeople());
            role.setDeletable(defaultRole.isDeletable());
            role.setAssociation(association);

            // Association des privilèges au rôle
            List<Privilege_Asso> privileges = new ArrayList<>();
            for (PrivilegeAsso privilegeName : defaultRole.getPrivileges()) {
                Privilege_Asso privilege = privilegeAssoRepository.findByLabel(privilegeName);
                if (privilege != null) {
                    privileges.add(privilege);
                }
            }
            role.setPrivileges(privileges);
            roles.add(role);
        }

        roleAssoRepository.saveAll(roles);

        // On ajoute les nouveau membres ( Il faut crire la methode d'ajout, c'est elle qui cree les invitation)
        // le createur

        User admin1=(User)admin1Details.getData();
        User admin2=(User)admin2Details.getData();
        User admin3=(User)admin3Details.getData();
        // admin 1
        Membre_Asso membre_asso1=addMemberInCreation(phone1,admin1.getFullName(),association,creerAssoModele.getRoleAdmin1());
        Membre_Asso membre_asso2=addMemberInCreation(phone2, admin2.getFullName(),association,creerAssoModele.getRoleAdmin2());
        Membre_Asso membre_asso3=addMemberInCreation(phone3,admin3.getFullName(),association,creerAssoModele.getRoleAdmin3());

        association.getMembres().add(membre_asso1);
        association.getMembres().add(membre_asso2);
        association.getMembres().add(membre_asso3);

        return new AssociationDto(associationRepository.save(association));
    }

    public CommonResponseModel CreateInvitation(Association association, Membre_Asso concerrnedMembre, Membre_Asso respondingMember,InvitationType type,int nbMinPos){
        Invitation invitation=new Invitation();
        invitation.setAssociation(association);
        invitation.setConcernedMember(concerrnedMembre);
        invitation.setType(type);
        invitation.setRespondingMember(respondingMember);
        invitation.setNbMinPositif(nbMinPos);
        invitation.setState(false);
        invitation.setResponse(false);
        invitation=invitationRepository.save(invitation);
        return new CommonResponseModel("sucess","0",invitation.getId());
    }

    public CommonResponseModel responseInvitation(RespondInvitationModele model){

        Invitation invitation= invitationRepository.findByTypeAndAssociationIdAndRespondingMember_Id(model.getType(),model.getAssociationId(),model.getResponderId());

        if(invitation==null){
            return new CommonResponseModel("Erreur","2","Cette invitation n'existe pas dans notre base de donnees");

        }

        if(invitation.isState()){
            return new CommonResponseModel("Erreur","1","Cette invitation a déjà été repondue");

        }

        Membre_Asso membre_asso=membreAssoRepository.findByIdAndAndAssociation_Id(model.getResponderId(), invitation.getAssociation().getId());
        if(membre_asso==null){throw new AssociationNotFoundException("Ce membre n'existe plus dans cette association");}

        if(!invitation.getRespondingMember().getId().equals(model.getResponderId())){
            return new CommonResponseModel("Echec","1","Cette invitation ne vous est pas destinée");
        }
        // creation de l'association
        if(invitation.getType()==InvitationType.CREATE_ASSOCIATION){
            invitation.setResponse(model.isResponse());
            invitation.setState(true);
            invitation =invitationRepository.save(invitation);
            if(model.isResponse()){
                membre_asso.setEtat(EtatMembre.ACTIF);
                envoyerNotification("Invitation acceptée", "L'utilisateur "+membre_asso.getName()+" a accepté l'invitation pour l'association : "+membre_asso.getAssociation().getAssoName(),"http://localhot:3000",invitation.getAssociation().getPhoneCreator(),invitation.getRespondingMember().getPhone(),"1");
                membre_asso= membreAssoRepository.save(membre_asso);
                return new CommonResponseModel("Sucess","0",new MembreAssoDto(membre_asso));
            }
            else{
                membre_asso.setEtat(EtatMembre.REFUSE);
                envoyerNotification("Invitation refusée", "L'utilisateur "+membre_asso.getName()+" a rejetté votre invitation pour l'association : "+membre_asso.getAssociation().getAssoName(),"http://localhot:3000",invitation.getAssociation().getPhoneCreator(),invitation.getRespondingMember().getPhone(),"1");
                membre_asso=membreAssoRepository.save(membre_asso);
                return new CommonResponseModel("sucess","0", new MembreAssoDto(membre_asso));
            }
        }

        if(invitation.getType()==InvitationType.CREATE_ROLE_ASSOCIATION){
            Role_Asso role=invitation.getConcernedRole();

            if(role.getState()==EtatRole.VALIDE)throw new AssociationNotFoundException("Les autres administrateurs ont déjà validé la création de ce role");

            List<Invitation> liste=invitationRepository.findAllByConcernedRole(role);
            int n=countPositifInvitation(liste);
            invitation.setResponse(model.isResponse());
            invitation.setState(true);
            invitation =invitationRepository.save(invitation);

            if(model.isResponse()){
                if(role.getNbMaxOcc()==n){
                    role.setState(EtatRole.VALIDE);
                    envoyerNotification("Validation de la creation du role", "L'admin ... a validé la création de ce role","http://localhot:3000",invitation.getAssociation().getPhoneCreator(),invitation.getRespondingMember().getPhone(),"1");
                    envoyerNotification("Sucess de l'ajout du role", "La création du role ... est terminee","http://localhot:3000",invitation.getAssociation().getPhoneCreator(),invitation.getRespondingMember().getPhone(),"1");
                }
                else{
                    envoyerNotification("Validation de la creation du role", "L'admin ... a validé la création de ce role","http://localhot:3000",invitation.getAssociation().getPhoneCreator(),invitation.getRespondingMember().getPhone(),"1");
                }

                return new CommonResponseModel("Sucess","0",invitation);
            }
            else{
                envoyerNotification("Invitation refuse", "L'admin ... a refuse l'ajout de ce rôle dans cette association","http://localhot:3000",invitation.getAssociation().getPhoneCreator(),invitation.getRespondingMember().getPhone(),"1");

                return new CommonResponseModel("Sucess","0",invitation);
            }
        }
        return null;
    }

    public CommonResponseModel cancelInvitation(CancelInvitationModel model){

        Association association=associationRepository.findById(model.getAssociationId()).orElse(null);
        if(association==null)throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données");

        Membre_Asso membre_asso=membreAssoRepository.findByIdAndAndAssociation_Id(model.getResponderId(), association.getId());
        if(membre_asso==null)throw new AssociationNotFoundException("Desole mais vous n'êtes membre de cette association");


        if(model.getType()==InvitationType.CREATE_ASSOCIATION){
            Invitation invitation= invitationRepository.findByTypeAndAssociationIdAndRespondingMember_Id(model.getType(),model.getAssociationId(),model.getResponderId());

            if(invitation.isState() && invitation.isResponse() ){ return new CommonResponseModel("Erreur","1","Cette invitation a déjà été repondue"); }
            if(invitation.isState() && !invitation.isResponse()){
                Membre_Asso membre=invitation.getRespondingMember();
                membre.setEtat(EtatMembre.SUPPRIME);
                membreAssoRepository.save(membre);
                invitationRepository.delete(invitation);
                return new CommonResponseModel("Sucess","0",new MembreAssoDto(membre));
            }

            if(!invitation.isState() && !invitation.isResponse()){
                Membre_Asso membre=invitation.getRespondingMember();
                membre.setEtat(EtatMembre.REJETTE);
                membreAssoRepository.save(membre);
                invitationRepository.delete(invitation);
                envoyerNotification("Annulation de votre invitation", "L'admin ... a annule votre invitation","http://localhot:3000",invitation.getAssociation().getPhoneCreator(),invitation.getRespondingMember().getPhone(),"1");
                return new CommonResponseModel("Sucess","0",new MembreAssoDto(membre));
            }

        }
        return null;

    }


    public int countPositifInvitation(List<Invitation> listInvitation){

        int n=0;

        for(Invitation invitation:listInvitation){
            if(invitation.isState() && invitation.isResponse()){
                n++;
            }

        }
        return n;
    }

    public CommonResponseModel envoyerNotification(String titre, String message,String lien, String phoneDestinataire,String phoneEmetteur,String withSms) {
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

    public CommonResponseModel notifierAssociation(String titre, String message,String lien,String phoneEmetteur,String withSms, String associationId) {
        // Créer le corps de la requête comme une carte (Map)
        Association association=associationRepository.findById(associationId).orElse(null);
        if(association==null)throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données");

        for(Membre_Asso membre:association.getMembres()){
            envoyerNotification(titre,message,lien,membre.getPhone(),phoneEmetteur,withSms);
        }

        return new CommonResponseModel("sucess","0","");
    }

    public CommonResponseModel notifierAssociationParPrivilege(String titre, String message,String lien,String phoneEmetteur,String withSms, String associationId,PrivilegeAsso privilege ) {
        // Créer le corps de la requête comme une carte (Map)
        Association association=associationRepository.findById(associationId).orElse(null);
        if(association==null)throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données");

        Privilege_Asso localPrivilege=privilegeAssoRepository.findByLabel(privilege);

        for(Membre_Asso membre:association.getMembres()){
            if(membre.getRole().getPrivileges().contains(localPrivilege)){
                envoyerNotification(titre,message,lien,membre.getPhone(),phoneEmetteur,withSms);
            }

        }

        return new CommonResponseModel("sucess","0","");
    }

    public CommonResponseModel notifierParListResponderInvitation(String titre, String message,String lien,String phoneEmetteur,String withSms, String associationId,List<Invitation> liste ) {
        // Créer le corps de la requête comme une carte (Map)
        Association association=associationRepository.findById(associationId).orElse(null);
        if(association==null)throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données");

        for(Invitation invitation:liste){
            envoyerNotification(titre,message,lien,invitation.getRespondingMember().getPhone(),phoneEmetteur,withSms);
        }

        return new CommonResponseModel("sucess","0","");
    }


    public CommonResponseModel notifierAssociationParRole(String titre, String message,String lien,String phoneEmetteur,String withSms, String associationId,String roleLabel ) {
        // Créer le corps de la requête comme une carte (Map)
        Association association=associationRepository.findById(associationId).orElse(null);
        if(association==null)throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données");

        for(Membre_Asso membre:association.getMembres()){
            if(membre.getRole().getLabel().equals(roleLabel)){
                envoyerNotification(titre,message,lien,membre.getPhone(),phoneEmetteur,withSms);
            }

        }

        return new CommonResponseModel("sucess","0","tous les membres concernés ont reçu l'invitation");
    }

    public Role_Asso initRole(String associationId,String label, String labelV, boolean isDeletable,int nbOccRest,List<PrivilegeAsso> labelPrivileges){

        Association association=associationRepository.findById(associationId).orElse(null);
        if(association==null)throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données");

        System.out.println("-**-*-*-*-*-*-*-*-*-*-*-*-*-*-"+associationId);
        Role_Asso role=new Role_Asso();
        role.setLabel(label);
        role.setLabelV(labelV);
        role.setAssociation(association);
        role.setNbMaxOcc(nbOccRest);
        role.setDeletable(isDeletable);
        List<Privilege_Asso> privileges=new ArrayList<Privilege_Asso>();

        for (PrivilegeAsso privilegeName :labelPrivileges) {
            Privilege_Asso privilege = privilegeAssoRepository.findByLabel(privilegeName);
            if (privilege != null) {
                privileges.add(privilege);
            }
        }
        role.setPrivileges(privileges);
        return role;
    }

    public CommonResponseModel userHasAccount (String phone){
        String url = userManagementApiUrl + "/userExist";
        Map<String, String> requestBody = Map.of("phone", phone);
        try{
            ResponseEntity<CommonResponseModel> responseEntity = restTemplate.postForEntity(url, requestBody, CommonResponseModel.class);
            CommonResponseModel response = responseEntity.getBody();

            // User exists, extract user details
            Map<String ,  Object> userDetails = (Map<String, Object>) response.getData();
            User user=new User();
            System.out.println(userDetails);
            user.setFullName((String) userDetails.get("fullName"));
            //user.setBirthDate((String) userDetails.get("birthDate"));
            user.setEmail((String) userDetails.get("email"));
            user.setGender((String) userDetails.get("gender"));
            user.setId((String) userDetails.get("id"));
            user.setCniRecto((String) userDetails.get("cniRecto"));
            user.setCniVerso((String) userDetails.get("cniVerso"));
            if( ((String)userDetails.get("isActivated")).equals("true")){
                user.setActivated(true);
            }else{user.setActivated(false);}

            if( ((String)userDetails.get("isBlocked")).equals("true")){
                user.setBlocked(true);
            }else{user.setBlocked(false);}

            user.setSignature((String) userDetails.get("signature"));
            String userName = (String) userDetails.get("fullName");
            CommonResponseModel response2=new CommonResponseModel("L'utilisateur a bien un compte.","0",user);
            return response2;
        }
        catch (HttpClientErrorException e) {
            // Capture d'autres erreurs HTTP
            CommonResponseModel response2 = new CommonResponseModel("L'utilisateur avec le telephone suivant ne possède pas de compte :"+phone,"1",e.getMessage());
            return response2;

        } catch (RestClientException e) {
            // Capture des erreurs génériques de RestTemplate, telles que les problèmes de connexion
            CommonResponseModel response2 = new CommonResponseModel("Erreur de connexion avec l'API usermanagment : Nous n'avons pas pu verifie que le telephone suivant est celui d'un utilisateur :"+phone,"2",e.getMessage());
            return response2;
        }

    }

    // Initialiser ou ouvrir l'associaiton
    public CommonResponseModel startAssociation(String associaitonId) {
        // on va rechercher les invitations de ce gar pour le moment

        Association association=associationRepository.findById(associaitonId).orElse(null);
        if(association==null)throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données");
        List<Invitation> invitationList=invitationRepository.findAllByAssociation_id(associaitonId);
        if(invitationList.size()==0){
            throw new AssociationNotFoundException("Erreur. Il y'a une incohérence dans notre base de données. Cette association n'a pas le droit d'exister.");
        }
        for(Invitation invit:invitationList){
            if(!invit.isState() && !invit.isCancelled() && invit.getType()==InvitationType.CREATE_ASSOCIATION)throw new AssociationNotFoundException("Cette association ne peut pas être ouvert. Car des invitations n'ont pas encore été repondu.");
            if(!invit.isResponse() && !invit.isCancelled()&& invit.getType()==InvitationType.CREATE_ASSOCIATION)throw new AssociationNotFoundException("Cette association ne peut pas êtreouvert. Il faut que le cota des invitations soient atteint.");
        }
        association.setAlredryOpen(true);
        association.setState(EtatAsso.OUVERT);
        return new CommonResponseModel("Sucess","0",new AssociationDto(associationRepository.save(association)));
    }

    // supprimer une associaiton
    public CommonResponseModel deleteAssociation(String associaitonId) {
        // cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles
        Association association=associationRepository.findById(associaitonId).orElse(null);
        if(association==null)throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données");

        association.setState(EtatAsso.SUPPRIME);
        return new CommonResponseModel("","",new AssociationDto(associationRepository.save(association)));
    }

    public CommonResponseModel deleteAllAssociation() {
        // cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles
        associationRepository.deleteAll();
        return new CommonResponseModel("Success","0",null);
    }

    // Modifier une association
    public CommonResponseModel updateAssociation(UpdateAssoModel updateAssoModel) {
        // cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles
        Association association=associationRepository.findById(updateAssoModel.getAssociationId()).orElse(null);
        if(association==null)throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données");

        association.setAssoName(updateAssoModel.getName());
        association.setMeetDay(updateAssoModel.getMeetDay());
        association.setMeetFrequency(updateAssoModel.getMeetFrequency());
        association.setMeetMode(updateAssoModel.getMeetType());

        return new CommonResponseModel("","",new AssociationDto(associationRepository.save(association)));

    }
    // Lister les associations d'un telephone
    public CommonResponseModel getAssociationsByPhone(String phone) {
        //cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles

        List<Membre_Asso> membres=membreAssoRepository.findByPhone(phone);
        if(membres.size()==0){throw new AssociationNotFoundException("Cette utilisateur n'a pas d'association");}
        List<AssociationDto> associations=new ArrayList<>();
        for(Membre_Asso membre:membres){
            if(membre.getAssociation().getState()!=EtatAsso.SUPPRIME && membre.getEtat()!=EtatMembre.SUPPRIME && membre.getEtat()!=EtatMembre.REFUSE) {associations.add(new AssociationDto(membre.getAssociation()));}
        }
        if(associations.size()==0)return new CommonResponseModel("Vous n'avez pas d'association","0",associations);
        CommonResponseModel response=new CommonResponseModel("","0",associations);
        return response ;
    }

    public CommonResponseModel getAssociationsByPhoneAndState(String phone, EtatAsso state) {
        //cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles

        List<Membre_Asso> membres=membreAssoRepository.findByPhone(phone);
        if(membres.size()==0){throw new AssociationNotFoundException("Cette utilisateur n'a pas d'association");}
        List<AssociationDto> associations=new ArrayList<>();
        for(Membre_Asso membre:membres){
            if(membre.getAssociation().getState()==state ) {associations.add(new AssociationDto(membre.getAssociation()));}
        }
        if(associations.size()==0)return new CommonResponseModel("Vous n'avez pas d'association","0",associations);
        CommonResponseModel response=new CommonResponseModel("","0",associations);
        return response ;
    }

    public CommonResponseModel getAllAssociations() {
        //cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles
        List<AssociationDto> liste=associationRepository.findAll().stream().map((asso)->new AssociationDto(asso)).collect(Collectors.toList());
        return new CommonResponseModel("Sucess","0",liste) ;
    }



    public CommonResponseModel getMemberByPhoneAndAssociation(String phone, String associationId) {
        //cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles

        Association association=associationRepository.findById(associationId).orElse(null);
        if(association==null)throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données");

        if(userHasAccount(phone).getResponseCode()!="0"){ throw new AssociationNotFoundException("Cette utilisateur n'existe pas dans notre base de donn");

        };

        List<Membre_Asso> membres=membreAssoRepository.findByPhoneAndAndAssociation_Id(phone, associationId);
        System.out.println("-*-*-*-*-*-*-*-*-*-*-"+phone+"-*-*-*-*-*-*-*-*-"+associationId);
        if(membres.size()==0){throw new AssociationNotFoundException("Cette utilisateur n'est pas dans cette association");}
        for(Membre_Asso membre:membres){
            if(membre.getEtat()!=EtatMembre.SUPPRIME ) { return new CommonResponseModel("votre message","0",new MembreAssoDto((membre)));}
        }
        CommonResponseModel response=new CommonResponseModel("error","1","Cette utilisateur n'est pas dans cette association");
        return response ;
    }

    // Afficher les details d'une associaiton
    public CommonResponseModel getAssociationById(String associaitonId) {
        // cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles
        Association association=associationRepository.findById(associaitonId).orElse(null);
        if(association==null)throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données");

        return new CommonResponseModel("Sucess","0",new AssociationDto(association));
    }
    // Suspendre une association
    public CommonResponseModel suspendAssociation(String associaitonId) {
        // cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles
        Association association=associationRepository.findById(associaitonId).orElse(null);
        if(association==null)throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données");

        association.setState(EtatAsso.BLOQUE);
        return new CommonResponseModel("Sucess","0",new AssociationDto(associationRepository.save(association)));
    }

    // debloquer une association
    public CommonResponseModel resumeAssociation(String associaitonId) {
        // cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles
        Association association=associationRepository.findById(associaitonId).orElse(null);
        if(association==null)throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données");

        association.setState(EtatAsso.OUVERT);
        return new CommonResponseModel("Sucess","0",new AssociationDto(associationRepository.save(association)));

    }

    // verifier le nom avant creation de l'associaiton une association
    public CommonResponseModel verifyNameBeforeCreation(String name, String phone) {
        // cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles
        Association association1 =associationRepository.findByAssoNameAndPhoneCreator(name,phone).orElse(null);
        if(association1!=null && association1.getState()!=EtatAsso.SUPPRIME){
            return new CommonResponseModel("sucess","0",false);        }

        return new CommonResponseModel("sucess","0",true);
    }


    /***********Gestion des roles de l'association*/

    public boolean verifyPermissions(String memberId,List<PrivilegeAsso> listePermissions){

        Membre_Asso membreCall=membreAssoRepository.findById(memberId).orElse(null);
        if(membreCall==null)throw new AssociationNotFoundException("Desolé, ce membre n'existe pas dans notre base de données.");
        boolean test=false;
        for(Privilege_Asso priv:membreCall.getRole().getPrivileges()){
            if(listePermissions.contains(priv.getLabel())){
                test=true;
            }
        }

        return test;
    }

    public CommonResponseModel createRoleInAssociation(CreateAssoRoleModel model) {
        // cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles

        Membre_Asso membreCall=membreAssoRepository.findById(model.getId_Caller()).orElse(null);
        if(membreCall==null)throw new AssociationNotFoundException("Desolé, ce membre n'existe pas dans notre base de données.");

        List<PrivilegeAsso> authorizePrivilege=List.of(PrivilegeAsso.ADMIN);
        boolean verification=verifyPermissions(model.getId_Caller(),authorizePrivilege);
        if(!verification) throw new AssociationNotFoundException("Désolé, vous n'avez pas les permissions pour créer un role dans cette association.");

        Association association=associationRepository.findById(model.getAssociationId()).orElse(null);
        if(association==null)throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données");

        if(!association.isAlredryOpen()) throw new AssociationAlreadyExistsException("Aucune opération n'est possible dans une association qui est en cours de création");

        Role_Asso role=new Role_Asso();
        role.setLabel(model.getLabel());
        role.setLabelV(model.getLabelV());
        role.setNbMaxOcc(model.getNbMaxOcc());

        List<Privilege_Asso> listPrivileges=new ArrayList<>();
        for(PrivilegeAsso priv:model.getPrivilegeLIst()){
            if(privilegeAssoRepository.findByLabel(priv)!=null){
                listPrivileges.add(privilegeAssoRepository.findByLabel(priv));
            }

        }
        role.setPrivileges(listPrivileges);
        role.setState(EtatRole.INITIE);
        role.setAssociation(association);

        Role_Asso role1=roleAssoRepository.save(role);

        if(role1.getNbMaxOcc()!=0){

            List<Membre_Asso> valideur=new ArrayList<>();

            for(PrivilegeAsso priv:authorizePrivilege){
                Privilege_Asso priv2=privilegeAssoRepository.findByLabel(priv);
                for(Membre_Asso membre:association.getMembres()){
                    if(membre.getRole().getPrivileges().contains(priv2)){
                        valideur.add(membre);
                    }
                }
            }
            for(Membre_Asso membre:valideur){
                CreateInvitation(association,membre,membre,InvitationType.CREATE_ROLE_ASSOCIATION,2);
                envoyerNotification("Création d'un nouveau role", "Demande de confirmation de la création d'un nouveau role dans votre associaiton ","http://localhot:3000",membre.getPhone(),membreCall.getPhone(),"0");
            }
        }
        else{
            // notifier tous les membres de l'association de l'ajout d'un nouveau role
            role.setState(EtatRole.VALIDE);
            roleAssoRepository.save(role);
            notifierAssociation("Création d'un nouveau role","Un nouveau role a été ajouté dans votre association","",membreCall.getPhone(),"1",association.getId());
        }

        return new CommonResponseModel("sucess","0",role1);
    }

    // ajouter un role dans une association une association
    public RoleAssoDto addRoleInAssociation(CreateAssoRoleModel model) {
        // cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles
        Role_Asso role=initRole(model.getAssociationId(),model.getLabel(),model.getLabelV(),true,model.getNbMaxOcc(),model.getPrivilegeLIst());
        role.setState(EtatRole.INITIE);
        Role_Asso role2=addPrivilegesToRole(role,model.getPrivilegeLIst());
        return new RoleAssoDto(roleAssoRepository.save(role2)) ;
    }

    public Role_Asso addPrivilegesToRole(Role_Asso role, List<PrivilegeAsso> privileges){

        List<Privilege_Asso> listPrivileges=new ArrayList<>();
        for(PrivilegeAsso priv:privileges){
            if(privilegeAssoRepository.findByLabel(priv)!=null){
                listPrivileges.add(privilegeAssoRepository.findByLabel(priv));
            }

        }
        role.setPrivileges(listPrivileges);

        return role;
    }

    // modifier un role dans une association ( nom du role,ses privilleges)
    public RoleAssoDto updateRoleInAssociation(UpdateRoleModel model) {
        // cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles

        if(model.getRoleId()!=null){

            Role_Asso role=roleAssoRepository.findById(model.getRoleId()).orElse(null);
            role.setLabelV(model.getLabelV());

            return new RoleAssoDto(roleAssoRepository.save(addPrivilegesToRole(role,model.getPrivilegeList()))); }

        else if (model.getAssociationId()!=null && model.getLabel()!=null){

            Role_Asso role=roleAssoRepository.findByLabelAndAssociation_Id(model.getLabel(),model.getAssociationId());
            role.setLabelV(model.getLabelV());

            return new RoleAssoDto(roleAssoRepository.save(addPrivilegesToRole(role,model.getPrivilegeList()))); }

        else{ throw new AssociationNotFoundException("Nous n'avons pas trouve de role avec les identifiants entres"); }

    }

    // modifier un role dans une association ( nom du role,ses privilleges)
    public CommonResponseModel deleteRoleById(String roleId) {
        // cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles
        Role_Asso role=roleAssoRepository.findById(roleId).orElse(null);
        if(role==null)throw new AssociationNotFoundException("Ce role n'existe pas dans notre base de donnees");
        roleAssoRepository.delete(role);
        return new CommonResponseModel("Sucess de la suppression","0","none");
}

    public CommonResponseModel deleteRoleByLabel(String label,String associationId) {
        // cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles

        Role_Asso role=roleAssoRepository.findByLabelAndAssociation_Id(label,associationId);

        if(role==null)throw new AssociationNotFoundException("Ce role n'existe pas dans notre base de donnees");

        roleAssoRepository.delete(role);

        return new CommonResponseModel("Sucess de la suppression","0","none");
    }

    // recuperer les roles d'une association
    public List<RoleAssoDto> getRoleByAssociaitonId(String associaitonId) {
        // cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles
        Association association=associationRepository.findById(associaitonId).orElse(null);
        if(association==null)throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données");
        List<RoleAssoDto> listRole=new ArrayList<>();
        for(Role_Asso role:association.getRoles()){
            listRole.add(new RoleAssoDto(role));
        }

        return listRole;
    }

    // recuperer les roles d'une association
    public RoleAssoDto getRoleByAssociationandPhone(String associaitonId,String phone) {
        // cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles
        Association association=associationRepository.findById(associaitonId).orElse(null);
        if(association==null)throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données");
        List<Membre_Asso> membres=membreAssoRepository.findByPhoneAndAndAssociation_Id(phone, associaitonId);

        for(Membre_Asso membre:membres ){
            if(membre.getEtat()==EtatMembre.ACTIF){
               return new RoleAssoDto(membre.getRole());
            }
        }

        throw new AssociationAlreadyExistsException("Nous n'avons pas pu recuperer le role de ce membre");
    }

    // recuperer les roles d'une association
    public RoleAssoDto getRoleByMemberId(String memberId) {

        Membre_Asso membre=membreAssoRepository.findById(memberId).orElse(null);
        if(membre==null)throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données");
        return new RoleAssoDto(membre.getRole());
    }

    // ajouter les privilleges a un role
    public Role_Asso addPrivilegeRoleInAssociation(CreateAssoRoleModel createAssoRoleModel) {
        // cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles

        return null;
    }

    // retirer les privilleges a un role
    public Role_Asso removePrivilegeRoleInAssociation(CreateAssoRoleModel createAssoRoleModel) {
        // cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles

        return null;
    }

    // retirer les privilleges a un role
    public Membre_Asso addManyMemberInAssociation(MembreCreationModel createAssoRoleModel) {
        // cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles

        return null;
    }
    // retirer les privilleges a un role
    public CommonResponseModel getMembersByAssociationId(String associationId) {

        Association association=associationRepository.findById(associationId).orElse(null);
        if(association==null)throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données");

        List<Membre_Asso> liste = association.getMembres();
        List<MembreAssoDto> assoMemberLIst=new ArrayList<>();

        for(Membre_Asso membre:liste){
            assoMemberLIst.add(new MembreAssoDto(membre));
        }
        return new CommonResponseModel("sucess","0",assoMemberLIst);
    }

    public CommonResponseModel getMeetingsAssociation(String associationId) {

        Association association=associationRepository.findById(associationId).orElse(null);
        if(association==null)throw new AssociationNotFoundException("Cette association n'existe pas dans notre base de données");

        return new CommonResponseModel("sucess","0",null);
    }

    // retirer les privilleges a un role
    public boolean deleteMemberInAssociation(String associationId) {
        // cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles

        return false;
    }

    // modifier les roles d'un membre d'une association
    public Role_Asso modifyMemberRoleInAssociaiton(CreateAssoRoleModel createAssoRoleModel) {
        // cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles

        return null;
    }

//    public CommonResponseModel getMembreByAssociation(String id) {
//        // cette methode va mettre l'etat a supprime, mettre l'etat de tout ses membres a inactif,ainsi que de ses roles
//        return new CommonResponseModel("","",membreAssoService.getMembreAssoByAssociation(id));
//    }




    // modifier les roles d'un membre d'une association
    public CommonResponseModel getMemberDetails(String phone) {

        List<Membre_Asso> membres=membreAssoRepository.findByPhone(phone);
        if(membres.size()==0){throw new AssociationNotFoundException("Cette utilisateur n'a pas d'association");}

        List<AssociationDto> associations=new ArrayList<>();
        for(Membre_Asso membre:membres){
            if(membre.getAssociation().getState()!=EtatAsso.SUPPRIME) {associations.add(new AssociationDto(membre.getAssociation()));}
        }
        MemberDetailsDto memberDetailsDto=new MemberDetailsDto(associations.size(),0,0,0,0);
        CommonResponseModel response=new CommonResponseModel("","",memberDetailsDto);
        return response ;

    }
}
