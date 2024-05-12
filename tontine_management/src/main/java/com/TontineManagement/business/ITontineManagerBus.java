package com.TontineManagement.business;

import com.TontineManagement.dao.entities.*;
import com.TontineManagement.dao.model.ProfilModel;
import com.TontineManagement.dao.model.UserLoginModel;
import com.TontineManagement.dao.model.VerifyOTPModel;

import java.time.LocalDate;

public interface ITontineManagerBus {

	User signin(String phone,String password) throws Exception;

	boolean userExist(String phone) throws Exception;

	User signup(String phone, String fullname, LocalDate birthDate,String gender,String password) throws Exception;

	UserLoginModel getUserLoginDetails(String phone);

	//boolean verifyPhone(String phone);

	User disActivateAccount(String phone);

	User disBlockAccount(String phone);

	User activateAccount(String phone);

    Validation VerifyAccount(String phone);

	User blockAccount(String phone);

	Validation enregistrer(User user);

	User updateProfil(ProfilModel profilModel);


	User VerifyOTP(VerifyOTPModel verifyOTPModel);

}