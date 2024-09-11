package com.example.AssociationManagement.Business;


import com.example.AssociationManagement.CustomException.AssociationAlreadyExistsException;
import com.example.AssociationManagement.Dao.Enumerations.EtatReunion;
import com.example.AssociationManagement.Dao.Modele.CreateReunionModel;
import com.example.AssociationManagement.Dao.Repository.AssociationRepository;
import com.example.AssociationManagement.Dao.Repository.ReunionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.AssociationManagement.Dao.Dto.ReunionDto;
import com.example.AssociationManagement.Dao.Entity.Association;
import com.example.AssociationManagement.Dao.Entity.Reunion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReunionBus {

    @Autowired
    private ReunionRepository reunionRepository;

    @Autowired
    private AssociationRepository associationRepository;

    public ReunionDto createReunion(CreateReunionModel model) {
        Optional<Association> association = associationRepository.findById(model.getAssociationId());
        if (!association.isPresent()) {
            throw new IllegalArgumentException("L'association n'existe pas.");
        }

        Reunion reunion = new Reunion();
        reunion.setDateSeance(model.getDateSeance());
        reunion.setHeureDebut(model.getHeureDebut());
        reunion.setHeureFin(model.getHeureFin());
        reunion.setState(model.getState());
        reunion.setType(model.getType());
        reunion.setAssociation(association.get());

        reunion = reunionRepository.save(reunion);

        return new ReunionDto(reunion);
    }

    public List<ReunionDto> getAllReunions() {
        List<ReunionDto> liste=new ArrayList<>();
        List<Reunion> liste1=reunionRepository.findAll();
        for(Reunion meet:liste1){
            liste.add(new ReunionDto(meet));
        }
        return liste;
    }

    public ReunionDto getOneMeet(String id) {
        List<ReunionDto> liste=new ArrayList<>();
        Reunion meet=reunionRepository.findById(id).orElse(null);

        if(meet==null){ throw new AssociationAlreadyExistsException("Cette reunion n'existe pas !!!");
        }

        return new ReunionDto(meet);
    }




    public ReunionDto startReunion(String reunionId) {
        Reunion reunion = getReunionById(reunionId);
        reunion.setState(EtatReunion.COMMENCEE);
        reunionRepository.save(reunion);

        return new ReunionDto(reunion);
    }

    public ReunionDto endReunion(String reunionId) {
        Reunion reunion = getReunionById(reunionId);
        reunion.setState(EtatReunion.TERMINER);
        reunionRepository.save(reunion);

        return new ReunionDto(reunion);
    }

    public ReunionDto editReunion(String id,CreateReunionModel model) {
        Reunion reunion = getReunionById(id);

        reunion.setDateSeance(model.getDateSeance());
        reunion.setHeureDebut(model.getHeureDebut());
        reunion.setHeureFin(model.getHeureFin());
        reunion.setType(model.getType());
        reunion.setState(model.getState());

        reunion = reunionRepository.save(reunion);

        return new ReunionDto(reunion);
    }

    public void deleteReunion(String id) {
        Reunion reunion = getReunionById(id);
        reunionRepository.delete(reunion);
    }

    private Reunion getReunionById(String id) {
        return reunionRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Réunion non trouvée."));
    }
}

