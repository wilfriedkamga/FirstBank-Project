package com.TontineManagement.business;

import com.TontineManagement.dao.entities.*;
import com.TontineManagement.dao.model.CaisseModel;
import com.TontineManagement.dao.model.MembreTontineModel;
import com.TontineManagement.dao.model.TontineModel;
import com.TontineManagement.dao.repositories.*;
import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Date;
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
	@Autowired
	MembreTontineRepository membreTontineRepository;

	private static final Logger logger = LoggerFactory.getLogger(TontineManagerBus.class);

	@Override
	public Tontine creer(TontineModel tontineModel) throws Exception {
		Tontine tontine =new Tontine();
		tontine.setNom(tontineModel.getNom());
		tontine.setDescription(tontineModel.getDescription());
		tontine.setJourReunion(tontineModel.getJourReunion());
		tontine.setFrequence(tontineModel.getFrequence());
        tontine.setCreate_par(tontineModel.getCreate_par());
		// Enregistrement de la tontine
		Tontine savedTontine = tontineRepository.save(tontine);

		// Création du premier membre de la tontine
		MembreTontineModel membreTontineModel = new MembreTontineModel();
		membreTontineModel.setNomU("Nouveau");
		membreTontineModel.setCreate_par(tontineModel.getCreate_par());
		membreTontineModel.setId_utiliateur(tontineModel.getCreate_par());
		membreTontineModel.setRole("ADMIN"); // ou tout autre rôle approprié
		membreTontineModel.setId_tontine(savedTontine.getId());

		addMembresTontine(membreTontineModel);

		return savedTontine;
	}

	@Override
	public Tontine deleteTontine(String IdTontine) throws Exception {
		Optional<Tontine> tontine=tontineRepository.findById(IdTontine);

		if(!tontine.isPresent()) throw new IllegalArgumentException("Incorrect id");
		else{ tontineRepository.deleteById(IdTontine);}
		return tontine.get();
	}

	@Override
	public List<Tontine> getAllTontines(String phoneNumber) throws Exception {
		// Récupérer toutes les occurrences de membreTontine par l'idutiliateur (le téléphone)
		List<MembresTontine> membreTontineList = membreTontineRepository.findByIdutiliateur(phoneNumber);

		// Initialiser la liste de tontines à retourner
		List<Tontine> tontineList = new ArrayList<>();

		// Pour chaque membreTontine, récupérer l'ID de la tontine et obtenir la tontine correspondante
		for (MembresTontine membreTontine : membreTontineList) {
			String idTontine = membreTontine.getId_tontine();
			Tontine tontine = tontineRepository.findById(idTontine)
					.orElseThrow(() -> new Exception("Tontine not found with id: " + idTontine));
			tontineList.add(tontine);
		}

		return tontineList;
	}

	@Override
	public MembresTontine addMembresTontine(MembreTontineModel membreTontineModel) throws Exception{

		// Verifier l'existence de l'utiliateur qui est inscrit dans

		// Verification de l'existence de la tontine
		Optional<Tontine> tontine=tontineRepository.findById(membreTontineModel.getId_tontine());
		if(tontine.isEmpty()) throw  new IllegalArgumentException("Cette tontine n'existe pas");

		// Verifier l'existence de celui qui inscrit et de son role
		//Optional<MembresTontine> membre=membreTontineRepository.findById_utiliateur(membreTontineModel.getId_utiliateur());
        //if(membre.isEmpty() /*|| membre.get().getRole()!="ADMIN"*/)throw new IllegalArgumentException("Cett utilisateur n'existe pas ou n'a pas le droit d'ajouter un -mbembre");

        // On incrémente le nombre de membres de cette tontine
        Tontine tontine1=tontine.get();
        tontine1.setNbMembre(tontine1.getNbMembre()+1);
        tontineRepository.save(tontine1);

        // On cree le nouveau membre dans membre_tontine
		MembresTontine membresTontine=new MembresTontine();
		membresTontine.setNomUtilisateur(membreTontineModel.getNomU());
		membresTontine.setCreer_par(membreTontineModel.getCreate_par());
		membresTontine.setId_utiliateur(membreTontineModel.getIdutiliateur());
		membresTontine.setRole(membreTontineModel.getRole());
		membresTontine.setId_tontine(membreTontineModel.getId_tontine());

		return membreTontineRepository.save(membresTontine);
	}

	@Override
	public Caisse createCaisse(CaisseModel caisseModel) throws Exception {
		Optional<Tontine> optionalTontine = tontineRepository.findById(caisseModel.getTontine_id());
		if (optionalTontine.isEmpty())
			throw new IllegalIdentifierException("Cette tontine n'existe pas");

			Tontine tontine = optionalTontine.get();
            int nb=tontine.getNbCaisse();
			Caisse caisse=new Caisse();
		logger.info("**********************************Ma variable  : {}", nb);

			// verification de l'unicite
		    boolean verificateur=true;

			while(verificateur){
				Optional<Caisse> optionalCaisse=caisseRepository.findById(caisse.getId());
				if(optionalCaisse.isPresent()) {caisse=new Caisse();}
				else{verificateur=false;}
			}

			caisse.setNom(caisseModel.getNom());
			caisse.setDescription(caisseModel.getDescription());
			caisse.setType(caisseModel.getType());
			caisse.setCreerPar(caisseModel.getCreerPar());
			caisse.setTontine(tontine);

			tontine.setNbCaisse( nb+1);

			tontineRepository.save(tontine);

			Caisse savedCaisse = caisseRepository.save(caisse);

		return caisse;
	}


}