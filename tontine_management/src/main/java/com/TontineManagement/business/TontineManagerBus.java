package com.TontineManagement.business;

import com.TontineManagement.dao.entities.*;
import com.TontineManagement.dao.model.TontineModel;
import com.TontineManagement.dao.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
       tontine.setNom("Les jeunes de Bandjoun");
       tontine.setDescription("Association des jeunes de bandjoun");
       tontine.setJourReunion("Lundi");
       tontine.setFrequence("Hebdomadaire");
		return tontineRepository.save(tontine);
	}

}