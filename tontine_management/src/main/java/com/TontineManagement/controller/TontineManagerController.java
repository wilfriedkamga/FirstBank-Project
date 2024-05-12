package com.TontineManagement.controller;

import com.TontineManagement.business.ITontineManagerBus;
import com.TontineManagement.config.JwtTokenUtil;
import com.TontineManagement.dao.entities.User;
import com.TontineManagement.dao.entities.Validation;
import com.TontineManagement.dao.model.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

import java.util.Objects;


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

	@Autowired
	private UserDetailsService jwtInMemoryUserDetailsService;

	@PostMapping(value = "/signin")
	public ResponseEntity createAuthenticationToken(@RequestBody SigninModel authenticationRequest) {
		CommonResponseModel response = new CommonResponseModel();
		try{
			authenticate(authenticationRequest.getPhone(), authenticationRequest.getPassword());

			final UserDetails userDetails = jwtInMemoryUserDetailsService
					.loadUserByUsername(authenticationRequest.getPhone());

			final String token = jwtTokenUtil.generateToken(userDetails);

			response.setMessage("Success");
			response.setResponseCode("0");
			response.setData(new JwtResponse(token, tontineManagerBus.signin(authenticationRequest.getPhone(),authenticationRequest.getPassword())/*,authenticationRequest.getPassword()*/));

			return new ResponseEntity(response, HttpStatus.OK);

		} catch ( Exception e) {
			response.setResponseCode("1");
			response.setMessage(e.getMessage());

			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}

	}

	public void authenticate(String username, String password) throws Exception {
		Objects.requireNonNull(username);
		Objects.requireNonNull(password);

		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}

	@PostMapping(value = "/signup")
	public ResponseEntity signup(@RequestBody SignupModel signupModel){

		CommonResponseModel response = new CommonResponseModel();

		try{
			response.setMessage("Success");
			response.setResponseCode("0");
			response.setData(tontineManagerBus.signup(signupModel.getPhone(),signupModel.getFullname(),signupModel.getBirthDate(),signupModel.getGender(), signupModel.getPassword()));

			return new ResponseEntity(response, HttpStatus.OK);

		} catch (Exception e) {
			response.setResponseCode("1");
			response.setMessage(e.getMessage());
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}

	}
	@PostMapping(value = "/userExist")
	public ResponseEntity FindUser(@RequestBody UserExistModel userExistModel) throws Exception{

		CommonResponseModel response = new CommonResponseModel();
		boolean heExist= tontineManagerBus.userExist(userExistModel.getPhone());

		if(heExist){
			response.setMessage("User Exist");
			response.setResponseCode("0");
			response.setData(tontineManagerBus.getUserLoginDetails(userExistModel.getPhone()));
			return new ResponseEntity(response, HttpStatus.OK);
		}
		else{
			response.setMessage("User not  Exist");
			response.setResponseCode("1");
			return new ResponseEntity<>(response, HttpStatus.OK);
		}
	}

	@PostMapping(value = "/sendSMS")
	public ResponseEntity sendSMS(@RequestBody String phone,String message) throws Exception{

		CommonResponseModel response = new CommonResponseModel();
		boolean heExist= tontineManagerBus.userExist(phone);

		if(heExist){
			response.setMessage("User Exist");
			response.setResponseCode("0");
			return new ResponseEntity(response, HttpStatus.OK);
		}
		else{
			response.setMessage("User not  Exist");
			response.setResponseCode("1");
			return new ResponseEntity<>(response, HttpStatus.OK);
		}}
		@PostMapping("/blockaccount")
		public ResponseEntity blockAccount(@RequestBody UserExistModel userExistModel) {

			CommonResponseModel response = new CommonResponseModel();

			try {
				response.setMessage("User have been blocked successfully");
				response.setResponseCode("0");
				User blockedUser = tontineManagerBus.blockAccount(userExistModel.getPhone());
				response.setData(blockedUser);
				return new ResponseEntity<>(response, HttpStatus.OK);

			} catch (IllegalArgumentException e) {
				response.setMessage("User not exist");
				response.setResponseCode("1");
				response.setData(e.getMessage());
				return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);

			}
		}

	@PostMapping("/activateaccount")
	public ResponseEntity activateAccount(@RequestBody UserExistModel userExistModel) {

		CommonResponseModel response = new CommonResponseModel();

		try {
			response.setMessage("User have been activated successfully");
			response.setResponseCode("0");
			User blockedUser = tontineManagerBus.activateAccount(userExistModel.getPhone());
			response.setData(blockedUser);
			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (IllegalArgumentException e) {
			response.setMessage("User not exist");
			response.setResponseCode("1");
			response.setData(e.getMessage());
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);

		}
	}
    @PostMapping("/sendOTP")
    public ResponseEntity sendOTP(@RequestBody UserExistModel userExistModel) {

        CommonResponseModel response = new CommonResponseModel();

        try {
            response.setMessage("OTP has been sent successfully");
            response.setResponseCode("0");
            Validation validation = tontineManagerBus.VerifyAccount(userExistModel.getPhone());
            response.setData(validation);
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (IllegalArgumentException e) {
            response.setMessage("User not exist");
            response.setResponseCode("1");
            response.setData(e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);

        }
    }

	@PostMapping("/verifyOTP")
	public ResponseEntity VerifyOTP(@RequestBody VerifyOTPModel verifyOTPModel){
		CommonResponseModel response = new CommonResponseModel();

		try {
			response.setMessage("OTP Verification Successes");
			response.setResponseCode("0");
			User user = tontineManagerBus.VerifyOTP(verifyOTPModel);
			response.setData(user);
			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (IllegalArgumentException e) {
			response.setMessage("OTP Verification failed");
			response.setResponseCode("1");
			response.setData(e.getMessage());
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);

		}
	}
	@PostMapping("/disactivateaccount")
	public ResponseEntity disActivateAccount(@RequestBody UserExistModel userExistModel) {

		CommonResponseModel response = new CommonResponseModel();

		try {
			response.setMessage("User have been disactivated successfully");
			response.setResponseCode("0");
			User blockedUser = tontineManagerBus.disActivateAccount(userExistModel.getPhone());
			response.setData(blockedUser);
			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (IllegalArgumentException e) {
			response.setMessage("User not exist");
			response.setResponseCode("1");
			response.setData(e.getMessage());
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);

		}
	}

	@PostMapping("/disblockaccount")
	public ResponseEntity disBlockAccount(@RequestBody UserExistModel userExistModel) {

		CommonResponseModel response = new CommonResponseModel();

		try {
			response.setMessage("User have been disblocked successfully");
			response.setResponseCode("0");
			User blockedUser = tontineManagerBus.disBlockAccount(userExistModel.getPhone());
			response.setData(blockedUser);
			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (IllegalArgumentException e) {
			response.setMessage("User not exist");
			response.setResponseCode("1");
			response.setData(e.getMessage());
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);

		}
	}
	@PostMapping("/updateprofil")
	public ResponseEntity updateProfil(@RequestBody ProfilModel profilModel) {

		CommonResponseModel response = new CommonResponseModel();

		try {
			response.setMessage("User profil has been updated successfully");
			response.setResponseCode("0");
			User updateUser= tontineManagerBus.updateProfil(profilModel);
			response.setData(updateUser);
			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (IllegalArgumentException e) {
			response.setMessage("User not exist");
			response.setResponseCode("1");
			response.setData(e.getMessage());
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);

		}
	}

	}



