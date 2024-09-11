package com.example.AssociationManagement.Business;
import com.example.AssociationManagement.Dao.Dto.TontineDto;
import com.example.AssociationManagement.Dao.Entity.Tontine;
import com.example.AssociationManagement.Dao.Repository.TontineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TontineBus {

    @Autowired
    private TontineRepository tontineRepository;

    public List<Tontine> getAllTontines() {
        return tontineRepository.findAll();
    }

    public Optional<Tontine> getTontineById(String id) {
        return tontineRepository.findById(id);
    }

    public Tontine createTontine(TontineDto tontineDTO) {
        Tontine tontine = new Tontine();
        tontine.setTontineName(tontineDTO.getTontineName());
        tontine.setCreationDate(tontineDTO.getCreationDate());
        tontine.setType(tontineDTO.getType());
        tontine.setAmount(tontineDTO.getAmount());
        tontine.setPurpose(tontineDTO.getPurpose());
        tontine.setStartDate(tontineDTO.getStartDate());
        tontine.setEndDate(tontineDTO.getEndDate());
        tontine.setPhoneValidator1(tontineDTO.getPhoneValidator1());
        tontine.setPhoneValidator2(tontineDTO.getPhoneValidator2());
        tontine.setPhoneCreator(tontineDTO.getPhoneCreator());
        // Associer l'association ici si nécessaire
        return tontineRepository.save(tontine);
    }

    public Tontine updateTontine(String id, TontineDto  tontineDTO) {
        Optional<Tontine> optionalTontine = tontineRepository.findById(id);
        if (optionalTontine.isPresent()) {
            Tontine tontine = optionalTontine.get();
            tontine.setTontineName(tontineDTO.getTontineName());
            tontine.setCreationDate(tontineDTO.getCreationDate());
            tontine.setType(tontineDTO.getType());
            tontine.setAmount(tontineDTO.getAmount());
            tontine.setPurpose(tontineDTO.getPurpose());
            tontine.setStartDate(tontineDTO.getStartDate());
            tontine.setEndDate(tontineDTO.getEndDate());
            tontine.setPhoneValidator1(tontineDTO.getPhoneValidator1());
            tontine.setPhoneValidator2(tontineDTO.getPhoneValidator2());
            tontine.setPhoneCreator(tontineDTO.getPhoneCreator());
            // Mettre à jour l'association ici si nécessaire
            return tontineRepository.save(tontine);
        } else {
            return null;
        }
    }

    public void deleteTontine(String id) {
        tontineRepository.deleteById(id);
    }
}
