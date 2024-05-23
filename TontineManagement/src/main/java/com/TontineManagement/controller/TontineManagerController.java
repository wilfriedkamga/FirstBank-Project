package com.TontineManagement.controller;

import com.TontineManagement.business.ITontineManagerBus;
import com.TontineManagement.config.JwtTokenUtil;

import com.TontineManagement.dao.model.CommonResponseModel;
import com.TontineManagement.dao.model.TontineModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;


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
	public ResponseEntity createAuthenticationToken(@RequestBody TontineModel tontineModel) {
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

	@GetMapping(value = "/tontines")

	public ResponseEntity getAllTontines() {
		CommonResponseModel response = new CommonResponseModel();
		try{
			response.setMessage("Success");
			response.setResponseCode("0");
			response.setData(tontineManagerBus.getAllTontines());

			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch ( Exception e) {
			response.setResponseCode("1");
			response.setMessage(e.getMessage());

			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}

	}



	}



