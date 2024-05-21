package com.TontineManagement.business;

import com.TontineManagement.dao.entities.*;
import com.TontineManagement.dao.model.TontineModel;
import com.TontineManagement.dao.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class TontineManagerBus implements ITontineManagerBus {

	@Autowired
	TontineRepository tontineRepository;

	@Autowired
	DetteRepository detteRepository;

	@Autowired
	CotisationRepository cotisationRepository;

	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	CaisseRepository caisseRepository;

	@Override
	public Tontine creer(TontineModel tontineModel) throws Exception {
		Tontine tontine =new Tontine();
		tontine.setNom(tontineModel.getNom());
		tontine.setDescription(tontineModel.getDescription());
		tontine.setJourReunion(tontineModel.getJourReunion());
		tontine.setFrequence(tontineModel.getFrequence());
		return tontineRepository.save(tontine);
	}

	@Override
	public List<Tontine> getAllTontines() throws Exception {
		List<Tontine> tontineList=tontineRepository.findAll();
		return tontineList;
	}

}