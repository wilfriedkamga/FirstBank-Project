package com.UserManagement.business;

import com.UserManagement.dao.entities.*;
import com.UserManagement.dao.model.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

public interface IUserManagerBus {

	boolean signin(String phone,String password) throws Exception;

	User userExist(String phone) throws Exception;

	User signup(String phone, String fullname,String email, LocalDate birthDate,String gender,String password) throws Exception;

	UserLoginModel getUserLoginDetails(String phone);

	//boolean verifyPhone(String phone);

	User disActivateAccount(String phone);

	User disBlockAccount(String phone);

	User activateAccount(String phone);

    Validation VerifyAccount(String phone);

	User blockAccount(String phone);

	Validation_Email enregistrer_validation_email(User user);

	User VerifyOTPMail(VerifyOtpMailModel verifyOTPModel);

	Validation_Email VerifyEmail(String email);

    public User uploadFiles(UploadFileModel fileModel) throws Exception;

	Validation enregistrer(User user);

	User updateProfil(ProfilModel profilModel);


	User VerifyOTP(VerifyOTPModel verifyOTPModel);

	void sendSmsToApi(String phone, String message);

}