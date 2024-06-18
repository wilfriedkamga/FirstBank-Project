package com.TontineManagement.business;

import com.TontineManagement.dao.entities.*;
import com.TontineManagement.dao.model.*;
import com.TontineManagement.dao.repositories.*;
import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;


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

	@Autowired
	MembresCaisseRepository membresCaisseRepository;

	private static final Logger logger = LoggerFactory.getLogger(TontineManagerBus.class);

	@Override
	public Tontine creer(TontineModel tontineModel) throws Exception {

		// Verifier que les deux numeros sont bien des utilisateurs

		Tontine tontine =new Tontine();
		tontine.setNom(tontineModel.getNom());
		tontine.setDescription(tontineModel.getDescription());
		tontine.setJourReunion(tontineModel.getJourReunion());
		tontine.setFrequence(tontineModel.getFrequence());
        tontine.setCreate_par(tontineModel.getCreate_par());
        tontine.setType(tontineModel.getType());
        tontine.setId_admin1(tontineModel.getId_admin1());
        tontine.setId_admin2(tontineModel.getId_admin2());
        tontine.setId_admin3(tontineModel.getId_admin3());
		// Enregistrement de la tontine
		Tontine savedTontine = tontineRepository.save(tontine);

		// Création du premier membre de la tontine
		MembreTontineModel membreTontineModel = new MembreTontineModel();
		membreTontineModel.setNomU("Nouveau");
		membreTontineModel.setCreate_par(tontineModel.getCreate_par());
		membreTontineModel.setId_utiliateur(tontineModel.getCreate_par());
		membreTontineModel.setRole("ADMIN"); // ou tout autre rôle approprié
		membreTontineModel.setId_tontine(savedTontine.getId());

		// Creation du secon Admin
		MembreTontineModel membreTontineModel1 = new MembreTontineModel();
		membreTontineModel1.setNomU("Nouveau");
		membreTontineModel1.setCreate_par(tontineModel.getCreate_par());
		membreTontineModel1.setId_utiliateur(tontineModel.getCreate_par());
		membreTontineModel1.setRole("ADMIN"); // ou tout autre rôle approprié
		membreTontineModel1.setId_tontine(savedTontine.getId());
		addMembresTontine(membreTontineModel1);

		// Creation du secon Admin
		MembreTontineModel membreTontineModel2 = new MembreTontineModel();
		membreTontineModel2.setNomU("Nouveau");
		membreTontineModel2.setCreate_par(tontineModel.getCreate_par());
		membreTontineModel2.setId_utiliateur(tontineModel.getCreate_par());
		membreTontineModel2.setRole("ADMIN"); // ou tout autre rôle approprié
		membreTontineModel2.setId_tontine(savedTontine.getId());
		addMembresTontine(membreTontineModel2);

		return savedTontine;
	}
	public MembreTontineModel Creer_membreTontineModel(String nom, String creer_par, String id_utilisteur,String role,String id_tontine){

		MembreTontineModel membreTontineModel = new MembreTontineModel();
		membreTontineModel.setNomU(nom);
		membreTontineModel.setCreate_par(creer_par);
		membreTontineModel.setId_utiliateur(id_utilisteur);
		membreTontineModel.setRole(role); // ou tout autre rôle approprié
		membreTontineModel.setId_tontine(id_tontine);
		return membreTontineModel;
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
	public List<Caisse> getAllCaisses(String idTontine) throws Exception {

		boolean tontineExists = tontineRepository.existsById(idTontine);
		if (!tontineExists) {
			throw new IllegalArgumentException("Tontine with ID " + idTontine + " not found.");
		}

		return caisseRepository.findByTontineId(idTontine);


	}

	@Override
	public List<MembresCaisse> getAllMembreCaisse(String idCaisse) throws Exception {

		boolean CaisseExists = caisseRepository.existsById(idCaisse);
		if (!CaisseExists) {
			throw new IllegalArgumentException("Caisse with ID " + idCaisse + " not found.");
		}
		List<MembresCaisse> allMembres = getAll_in_MembresCaisse();

		return allMembres.stream()
				.filter(membre -> idCaisse.equals(membre.getId_caisse()))
				.collect(Collectors.toList());
	}

	@Override
	public List<MembresTontine> getAllMembreTontine(String idTontine) throws Exception {

		Optional<Tontine> tontine = tontineRepository.findById(idTontine);
		if (tontine.isEmpty()) {
			throw new IllegalArgumentException("Tontine with ID " + idTontine + " not found.");
		}

		List<MembresTontine> allMembres = getAll_in_MembresTontine();

		return allMembres.stream()
				.filter(membre -> idTontine.equals(membre.getId_tontine()))
				.collect(Collectors.toList());
	}



	public List<MembresCaisse> getAll_in_MembresCaisse() {
		return membresCaisseRepository.findAll();
	}

	public List<MembresTontine> getAll_in_MembresTontine() {
		return membreTontineRepository.findAll();
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
	public MembresCaisse addMembresCaisse(MembreCaisseModel membreCaisseModel) throws Exception{

		// Verification de l'existence de la caisse

		Optional<Caisse> caisse=caisseRepository.findById(membreCaisseModel.getId_caisse());
		if(caisse.isEmpty()) throw  new IllegalArgumentException("Cette caisse n'existe pas");

		// Verifier l'existence de celui qui inscrit et de son role
		//Optional<MembresTontine> membre=membreTontineRepository.findById_utiliateur(membreTontineModel.getId_utiliateur());
		//if(membre.isEmpty() /*|| membre.get().getRole()!="ADMIN"*/)throw new IllegalArgumentException("Cett utilisateur n'existe pas ou n'a pas le droit d'ajouter un -mbembre");

		// On incrémente le nombre de membres de cette caisse
		Caisse caisse1=caisse.get();
		caisse1.setNbMembres(caisse1.getNbMembres()+1);
		caisseRepository.save(caisse1);

		// verifier qu'il est membre de la tontine
		List<MembresTontine> membresTontine=membreTontineRepository.findByIdutiliateur(membreCaisseModel.getIdutiliateur());

		// On cree le nouveau membre dans membre_caisse
		MembresCaisse membresCaisse=new MembresCaisse();
		membresCaisse.setNomUtilisateur(membreCaisseModel.getNomUtilisateur());
		membresCaisse.setCreer_par(membreCaisseModel.getCreer_par());
		membresCaisse.setIdutiliateur(membreCaisseModel.getIdutiliateur());
		membresCaisse.setRole(membreCaisseModel.getRole());
		membresCaisse.setId_caisse(membreCaisseModel.getId_caisse());

		return membresCaisseRepository.save(membresCaisse);
	}



	@Override
	public Caisse createCaisse(CaisseModel caisseModel) throws Exception {
		Optional<Tontine> optionalTontine = tontineRepository.findById(caisseModel.getTontine_id());
		if (optionalTontine.isEmpty())
			throw new IllegalIdentifierException("Cette tontine n'existe pas");

			Tontine tontine = optionalTontine.get();
            int nb=tontine.getNbCaisse();
			Caisse caisse=new Caisse();
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
			caisse.setMontant(caisseModel.getMontant());
			caisse.setNbMembres(0);

			// Ajout du premier membre de la caisse
		MembreCaisseModel membreCaisseModel = new MembreCaisseModel();
		membreCaisseModel.setNomUtilisateur(caisseModel.getCreerPar());
		membreCaisseModel.setCreer_par(caisseModel.getCreerPar());
		membreCaisseModel.setIdutiliateur(caisseModel.getCreerPar());
		membreCaisseModel.setRole("ADMIN"); // ou tout autre rôle approprié
		membreCaisseModel.setId_caisse(caisse.getId());



		tontineRepository.save(tontine);

		Caisse savedCaisse = caisseRepository.save(caisse);

		addMembresCaisse(membreCaisseModel);

		return savedCaisse;
	}
	public List<CaisseDetails> convertToCaisseDetails(List<Caisse> caisses) {
		List<CaisseDetails> caisseDetailsList = new ArrayList<>();
		for (Caisse caisse : caisses) {
			CaisseDetails details = new CaisseDetails();
			details.setNom(caisse.getNom());
			details.setType(caisse.getType());
			details.setDescription(caisse.getDescription());
			details.setCreerPar(caisse.getCreerPar());
			details.setTontine_id(caisse.getTontine().getId());
			details.setNbMembres(caisse.getNbMembres());
			details.setDateCreation(caisse.getDateCreation());
			details.setMontant(caisse.getMontant());
			caisseDetailsList.add(details);
		}
		return caisseDetailsList;
	}
}

