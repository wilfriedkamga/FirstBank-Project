package com.example.AssociationManagement.Business;

import com.example.AssociationManagement.Config.DefaultRolesConfig;
import com.example.AssociationManagement.Dao.Dto.AssociationDto;
import com.example.AssociationManagement.Dao.Dto.MemberDetailsDto;
import com.example.AssociationManagement.Dao.Dto.MembreAssoDto;
import com.example.AssociationManagement.Dao.Entity.Membre_Asso;
import com.example.AssociationManagement.Dao.Entity.Role_Asso;
import com.example.AssociationManagement.Dao.Modele.CreateAssoRoleModel;
import com.example.AssociationManagement.Dao.Modele.CreaterAssoModele;
import com.example.AssociationManagement.Dao.Modele.MembreCreationModel;
import com.example.AssociationManagement.Dao.Modele.UpdateAssoModel;
import com.example.AssociationManagement.Dao.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;

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
public class DocumentBus {

    @Autowired
    private AssociationRepository associationRepository;

    @Autowired
    private MembreAssoRepository membreAssoRepository;


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


    public DocumentDto uploadFile(UploadFileModel fileModel)throws IllegalArgumentException,IOException{
        String associationId=fileModel.getAssociationId();
        DocumentDto documentDto=new DocumentDto();
        Optional<Association> optionalAsso=associationRepository.findById(associationId);
        if(!optionalAsso.isPresent()){
            throw new AssociationNotFoundException("Association with id: "+associationId+" don't exist in our database !!");
        }

        Association association=optionalAsso.get();

//        List<Document> documentList=association.getDocument();
//        for(int i=0;i<documentList.size();i++){
//            if(documentList.get(i).getNom().equals(fileModel.getNom())){
//                throw new AssociationAlreadyExistsException(" Le document avec ce nom existe déjà dans cette association ");
//            }
//        }

        // Base directory where files will be stored
        String baseDir=UPLOAD_DIR;

        //		// Check and upload cniRecto file
        MultipartFile fileToUpload=fileModel.getFile();
        Document document=new Document();

        if(fileToUpload!=null&&!fileToUpload.isEmpty()){
            String fileName=fileModel.getNom()+"."+getExtension(fileToUpload.getOriginalFilename());
            // construir le chemin et le lien du fichier

            String chemin=baseDir+fileName;

            String lien=GET_IMAGE_BASE_URL+fileName;

            File file=new File(chemin);

            String encodedString=Base64.getEncoder().encodeToString(fileToUpload.getBytes());
            byte[]data=Base64.getDecoder().decode(encodedString);
            File outFile=new File(chemin);
            FileUtils.writeByteArrayToFile(outFile,data);


//            document.setNom(fileModel.getNom())*document.setDescription(fileModel.getDescription());
            document.setNomComplet(fileName);
            document.setDate(Date.from(Instant.now()));
            document.setTaille(fileToUpload.getSize()+"");
            document.setChemin(chemin);
            document.setLien_telechargement(lien);
            document.setAssociation(association);
            documentRepository.save(document);
//            association.addDocument(document);
            associationRepository.save(association);
            documentDto.setId(document.getId());
//            documentDto.setAssociationId(document.getAssociation().getAssociationId());
            documentDto.setDescription(document.getDescription());
            documentDto.setNomComplet(document.getNomComplet());
            documentDto.setNom(document.getNom());
            documentDto.setLien(document.getLien_telechargement());
            documentDto.setTaille(document.getTaille());
            documentDto.setDate(document.getDate());

        }


        return documentDto;
    }

    public String getExtension(String fileName){
        if(fileName!=null&&fileName.lastIndexOf('.')!=-1){
            return fileName.substring(fileName.lastIndexOf('.')+1);
        }
        return"";
    }

    public AssociationDto deleteDocument(String associationId,String documentId){
        Optional<Association> optionalAsso=associationRepository.findById(associationId);
        if(!optionalAsso.isPresent()){
            throw new AssociationNotFoundException("Association with id: "+associationId+" don't exist in our database !!");
        }

        Association association=optionalAsso.get();

//        List<Document> documentList=association.getDocument();

//        System.out.println("taille du document avant"+documentList.size());
//        boolean isFound=false;
//        for(int i=0;i<documentList.size();i++){
//            if(documentList.get(i).getAssociationId().equals(documentId)){
//                documentList.remove(i);
//                documentRepository.deleteById(documentId);
//                isFound=true;
//            }
//        }
//        System.out.println("taille du document apres"+documentList.size());
//        if(!isFound){throw new AssociationNotFoundException("Désolé, mais ce document n'existe pas dans cette association");}
//
//        association.setDocuments(documentList);
//        associationRepository.save(association);
//        AssociationDto associationDto=new AssociationDto();
//        associationDto.setAssociationId(association.getAssociationId());
//        associationDto.setNbDocument(association.getDocument().size());
//        associationDto.setName(association.getName());
        return null; // associationDto;
    }

    public List<DocumentDto> getDocumentsByAssociationId(String associationId){
        Association association=associationRepository.findById(associationId).orElse(null);
        List<DocumentDto> documentDtos=new ArrayList<>();
        if(association==null){
            throw new AssociationNotFoundException("Cette association n'existe pas dans votre systeme");
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
                //docDto.setAssociationId(doc.getAssociation().getAssociationId());
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
