package com.TontineManagement.controller;

import com.TontineManagement.business.ITontineManagerBus;
import com.TontineManagement.config.JwtTokenUtil;

import com.TontineManagement.dao.entities.Caisse;
import com.TontineManagement.dao.entities.Tontine;
import com.TontineManagement.dao.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(value = "/api/tontinemanagement")
@CrossOrigin
public class TontineManagerController {

	@Autowired
	ITontineManagerBus tontineManagerBus;
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;



	@PostMapping(value = "/createTontine")
	public ResponseEntity createTontine(@RequestBody TontineModel tontineModel) {
		CommonResponseModel response = new CommonResponseModel();
		try{
			response.setMessage("Success");
			response.setResponseCode("0");
			response.setData(tontineManagerBus.creer(tontineModel));

			return new ResponseEntity(response, HttpStatus.OK);

		} catch ( Exception e) {
			response.setResponseCode("1");
			response.setMessage(e.getMessage());

			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}

	}

	@PostMapping(value = "/deleteTontine")
	public ResponseEntity deleteTontine(@RequestBody String id) {
		System.out.println(id);
		CommonResponseModel response = new CommonResponseModel();
		try{

			response.setMessage("Tontine supprimer avec succèss");
			response.setResponseCode("0");
			response.setData(tontineManagerBus.deleteTontine(id));

			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch ( Exception e) {
			response.setResponseCode("1");
			response.setMessage(e.getMessage());

			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}

	}

	@GetMapping(value = "/tontines")

	public ResponseEntity getAllTontines() {
		CommonResponseModel response = new CommonResponseModel();
		try{
			response.setMessage("Success");
			response.setResponseCode("0");
			response.setData(convertTontineListToModelList(tontineManagerBus.getAllTontines()));
			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch ( Exception e) {
			response.setResponseCode("1");
			response.setMessage(e.getMessage());

			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
	}

		@PostMapping(value = "/createCaisse")
		public ResponseEntity createCaisse(@RequestBody CaisseModel caisseModel) {

			CommonResponseModel response = new CommonResponseModel();
			try{
				response.setMessage("Success de la creation de la caisse dans la tontine " +
						"dont l'id est : ");
				response.setResponseCode("0");
				Caisse caisse=tontineManagerBus.createCaisse(caisseModel);
				CaisseDetails caisseDetails=new CaisseDetails(caisseModel,caisse.getNbMembres(),caisse.getDateCreation());
				response.setData(caisseDetails);
				return new ResponseEntity<>(response, HttpStatus.OK);

			} catch ( Exception e) {
				response.setResponseCode("1");
				response.setMessage(e.getMessage());

				return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
			}

		}

	@PostMapping(value = "/ajout_membre_tontine")
	public ResponseEntity upDateCaisse(@RequestBody MembreTontineModel membreTontineModel) {

		CommonResponseModel response = new CommonResponseModel();
		try{
			response.setMessage("Success de la mise a jour de la caisse");
			response.setResponseCode("0");
			response.setData(tontineManagerBus.addMembresTontine(membreTontineModel));
			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch ( Exception e) {
			response.setResponseCode("1");
			response.setMessage(e.getMessage());

			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}

	}

	public List<TontineModel> convertTontineListToModelList(List<Tontine> tontineList) {
		List<TontineModel> tontineModelList = new ArrayList<>();

		for (Tontine tontine : tontineList) {
			TontineModel tontineModel = new TontineModel();
			tontineModel.setNom(tontine.getNom());
			tontineModel.setDescription(tontine.getDescription());
			tontineModel.setType(tontine.getType());
			tontineModel.setFrequence(tontine.getFrequence());
			tontineModel.setJourReunion(tontine.getJourReunion());
			tontineModel.setCreate_par(tontine.getCreate_par());
			tontineModel.setDateCreation(tontine.getDateCreation());
			tontineModel.setNbCaisse(tontine.getNbCaisse());
			tontineModel.setNbMembre(tontine.getNbMembre());
			tontineModel.setProchaineReunion(tontine.getProchaineReunion());
			tontineModel.setId(tontine.getId());

			tontineModelList.add(tontineModel);
		}

		return tontineModelList;
	}

	}







