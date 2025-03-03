package com.UserManagement.controller;

import com.UserManagement.business.IUserManagerBus;
import com.UserManagement.config.JwtTokenUtil;
import com.UserManagement.dao.dto.DownloadimageDto;
import com.UserManagement.dao.entities.User;
import com.UserManagement.dao.entities.Validation;
import com.UserManagement.dao.entities.Validation_Email;
import com.UserManagement.dao.model.*;

import com.netflix.discovery.converters.Auto;
import com.sun.jna.platform.unix.Resource;
import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ResourceLoader;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.regex.Pattern;



@RestController
@RequestMapping(value = "/api/usermanagement")
@CrossOrigin
public class UserManagerController {

	@Autowired
	IUserManagerBus usermanagerBus;
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;


	private  ResourceLoader resourceLoader;

	@Autowired
	private UserDetailsService jwtInMemoryUserDetailsService;


	@PostMapping(value = "/signin")
	public ResponseEntity createAuthenticationToken(@RequestBody SigninModel authenticationRequest)  {
		CommonResponseModel response = new CommonResponseModel();

		try {
			authenticate(authenticationRequest.getPhone(), authenticationRequest.getPassword());
			final UserDetails userDetails = jwtInMemoryUserDetailsService
					.loadUserByUsername(authenticationRequest.getPhone());
			final String token = jwtTokenUtil.generateToken(userDetails);

			response.setMessage("Success");
			response.setResponseCode("0");
			response.setData(new JwtResponse(token, usermanagerBus.getUserLoginDetails(authenticationRequest.getPhone()/*,authenticationRequest.getPassword()*/)));

			return new ResponseEntity(response, HttpStatus.OK);

		}catch (Exception e){
			response.setResponseCode("1");
			response.setMessage(e.getMessage());

			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);

	}}

	public void authenticate(String username, String password) throws Exception {
		Objects.requireNonNull(username);
		Objects.requireNonNull(password);

		try {
            System.out.println("authenticate methode: passe ici 1");
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            System.out.println("authenticate methode: passe ici 2");
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}

	@PostMapping(value = "/testPassword")
	public ResponseEntity TestPassword(@RequestBody SigninModel signinModel) {
		CommonResponseModel response = new CommonResponseModel();
		try{
			response.setMessage("Success");
			response.setResponseCode("0");
			response.setData(usermanagerBus.signin(signinModel.getPhone(),signinModel.getPassword()));

			return new ResponseEntity(response, HttpStatus.OK);

		} catch ( Exception e) {
			response.setResponseCode("1");
			response.setMessage(e.getMessage());
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
	}

	@PostMapping(value = "/signup")
	public ResponseEntity signup(@RequestBody SignupModel signupModel){

		CommonResponseModel response = new CommonResponseModel();

		try{
			response.setMessage("Success");
			response.setResponseCode("0");
			System.out.println("Voici votre nom complet"+signupModel.getFullname());
			usermanagerBus.signup(signupModel.getPhone(),signupModel.getFullname(),signupModel.getEmail(),signupModel.getBirthDate(),signupModel.getGender(), signupModel.getPassword());
			System.out.println("Passe bien par ici1 apres signup");
			 //Authentifier l'utilisateur
            System.out.println(signupModel.getPhone()+" "+signupModel.getPassword());
			authenticate(signupModel.getPhone(), signupModel.getPassword());
            System.out.println("Passe bien par ici1");

			final UserDetails userDetails = jwtInMemoryUserDetailsService
					.loadUserByUsername(signupModel.getPhone());
            System.out.println("Passe bien par ici2");

			final String token = jwtTokenUtil.generateToken(userDetails);
            System.out.println("Passe bien par ici3");
			response.setData(new JwtResponse(token, usermanagerBus.getUserLoginDetails(signupModel.getPhone())));
            System.out.println("Passe bien par ici4");

			return new ResponseEntity(response, HttpStatus.OK);

		} catch (Exception e) {
			response.setResponseCode("1");
			response.setMessage(e.getMessage());

			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}

	}
	@PostMapping(value = "/userExist")
	public ResponseEntity FindUser(@RequestBody UserExistModel userExistModel) throws Exception{
        System.out.println(userExistModel.getPhone());
		CommonResponseModel response = new CommonResponseModel();

        try{
			User user=usermanagerBus.userExist(userExistModel.getPhone());
			response.setMessage("User Exist");
			response.setResponseCode("0");

			response.setData(user);
			return new ResponseEntity(response, HttpStatus.OK);

		}
        catch (IllegalIdentifierException e){
			response.setMessage("User not  Exist");
			response.setResponseCode("1");
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);

		}
	}

	@PostMapping(value = "/sendSMS")
	public ResponseEntity sendSMS(@RequestBody String phone,String message) throws Exception{
        System.out.println(phone);
		CommonResponseModel response = new CommonResponseModel();
		User heExist=usermanagerBus.userExist(phone);

		if(heExist!=null){
			response.setMessage("Message send successfully");
			response.setResponseCode("0");
            usermanagerBus.sendSmsToApi(phone,message);
			return new ResponseEntity(response, HttpStatus.OK);
		}
		else{
			response.setMessage("User not  Exist");
			response.setResponseCode("1");
			return new ResponseEntity<>(response, HttpStatus.OK);
		}
	}
		@PostMapping("/blockaccount")
		public ResponseEntity blockAccount(@RequestBody UserExistModel userExistModel) {

			CommonResponseModel response = new CommonResponseModel();

			try {
				response.setMessage("User have been blocked successfully");
				response.setResponseCode("0");
				User blockedUser = usermanagerBus.blockAccount(userExistModel.getPhone());
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
			User blockedUser = usermanagerBus.activateAccount(userExistModel.getPhone());
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
            Validation validation = usermanagerBus.VerifyAccount(userExistModel.getPhone());
            response.setData(validation);
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (IllegalArgumentException e) {
            response.setMessage("User not exist");
            response.setResponseCode("1");
            response.setData(e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);

        }
    }


	@PostMapping("/SendOtpMail")
	public ResponseEntity sendOTPEmail(@RequestBody SendOtpMailModel sendOtpMailModel) {

		CommonResponseModel response = new CommonResponseModel();


		try {
			response.setMessage("OTP has been sent successfully");
			response.setResponseCode("0");
			Validation_Email validation = usermanagerBus.VerifyEmail(sendOtpMailModel.getEmail());
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
			User user = usermanagerBus.VerifyOTP(verifyOTPModel);
			response.setData(user);
			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (IllegalArgumentException e) {
			response.setMessage("OTP Verification failed");
			response.setResponseCode("1");
			response.setData(e.getMessage());
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);

		}
	}

	@PostMapping("/verifyOTPMail")
	public ResponseEntity VerifyOTPMail(@RequestBody VerifyOtpMailModel verifyOTPModel){
		CommonResponseModel response = new CommonResponseModel();

		try {
			response.setMessage("OTP Verification Successes");
			response.setResponseCode("0");
			User user = usermanagerBus.VerifyOTPMail(verifyOTPModel);
			//response.setData(user);
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
			User blockedUser = usermanagerBus.disActivateAccount(userExistModel.getPhone());
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
			User blockedUser = usermanagerBus.disBlockAccount(userExistModel.getPhone());
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
			User updateUser=usermanagerBus.updateProfil(profilModel);
			response.setData(updateUser);
			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (IllegalArgumentException e) {
			response.setMessage("User not exist");
			response.setResponseCode("1");
			response.setData(e.getMessage());
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);

		}
	}

	@PostMapping(path="/uploadFile",consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity uploadFile(@RequestPart String phone,@RequestPart MultipartFile cniRecto,
									 @RequestPart MultipartFile cniVerso,@RequestPart MultipartFile photo
	,@RequestPart MultipartFile signature) throws Exception {

		CommonResponseModel response = new CommonResponseModel();

		try {
			response.setMessage("Upload file success profil has been updated successfully");
			response.setResponseCode("0");
			UploadFileModel uploadFileModel=new UploadFileModel();
			uploadFileModel.setPhone(phone);
			uploadFileModel.setCniRecto(cniRecto);
			uploadFileModel.setCniVerso(cniVerso);
			uploadFileModel.setPhoto(photo);
			uploadFileModel.setSignature(signature);
			User updateUser=usermanagerBus.uploadFiles(uploadFileModel);
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



