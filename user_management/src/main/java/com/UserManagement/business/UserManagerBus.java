package com.UserManagement.business;

import com.UserManagement.dao.entities.*;
import com.UserManagement.dao.model.ProfilModel;
import com.UserManagement.dao.model.UserLoginModel;
import com.UserManagement.dao.model.VerifyOTPModel;
import com.UserManagement.dao.repositories.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import io.micrometer.core.instrument.config.validate.Validated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Properties;
import java.util.Random;
import java.util.stream.Collectors;



import static java.time.temporal.ChronoUnit.MINUTES;


@Service
@Transactional
public class UserManagerBus  implements IUserManagerBus {

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PrivilegeRepository privilegeRepository;

	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	ValidationRepository validationRepository;

	@Override
	public User signin(String phone, String password) throws Exception {
		Optional<User> user = userRepository.findByPhone(phone);

		if(!user.get().getActivated())
			throw new IllegalAccessException ("Votre compte n'est pas activé.");

		if (!user.isPresent())
			throw new Exception("Ce compte n'existe pas dans notre base de données");

		if (!passwordEncoder.matches(password, user.get().getPassword()))
			throw new Exception("Mot de passe incorrect");

		return user.get();
	}

	@Override
	public User signup(String phone, String fullname, LocalDate birthDate, String gender, String password) throws Exception {
		Optional<User> user = userRepository.findByPhone(phone);
		if (user.isPresent())
			throw new Exception("Ce numéro de télephone existe déjà dans notre base de données");

		User obj = new User();
		obj.setPhone(phone);
		obj.setFullName(fullname);
		obj.setBirthDate(birthDate);
		obj.setCreationDate(LocalDateTime.now());
		obj.setGender(gender);
		obj.setPassword(passwordEncoder.encode(password));
        enregistrer(obj);
		return userRepository.save(obj);
	}

	@Override
	public UserLoginModel getUserLoginDetails(String phone) {
		Optional<User> optionalUser = userRepository.findByPhone(phone);

		UserLoginModel userLoginModel = null;

		if (optionalUser.isPresent()) {
			User user = optionalUser.get();

			userLoginModel = new UserLoginModel(user.getPhone(), user.getFullName(), user.getBirthDate()
					, user.getGender(), user.getPassword(), user.getEmail(), user.getIdCardImage(), user.getPhoto(), user.getPrivilegelist().stream().map(x -> x.getRole()).map(x -> x.getRoleName()).collect(Collectors.toList()));
		}

		return userLoginModel;
	}

	@Override
	public boolean userExist(String phone) throws Exception {
		Optional<User> optionalUser = userRepository.findByPhone(phone);

		if (optionalUser.isPresent())
			return true;
		else return false;
	}

	@Override
	public User activateAccount(String phone) {
		Optional<User> user = userRepository.findByPhone(phone);
		if (!user.isPresent()) {
			throw new IllegalArgumentException("User not found with phone number: " + phone);
		}

		User user1 = user.get();
		user1.setActivated(true);
		User updatedUser = userRepository.save(user1);
		return updatedUser;
	}

	@Override
	public Validation VerifyAccount(String phone) {
		Optional<User> user = userRepository.findByPhone(phone);
		if (!user.isPresent()) {
			throw new IllegalArgumentException("User not found with phone number: " + phone);
		}
		User user1 = user.get();
		return enregistrer(user1);
	}

	@Override
	public User VerifyOTP(VerifyOTPModel verifyOTPModel) {
		Optional<User> user = userRepository.findByPhone(verifyOTPModel.getPhone());
		if (!user.isPresent()) {
			throw new IllegalArgumentException("User not found with phone number: " + verifyOTPModel.getPhone());
		}

		Optional<Validation> validation=validationRepository.findByPhone(verifyOTPModel.getPhone());
		if (!validation.isPresent()) {
			throw new IllegalArgumentException("This code don't exist: " + verifyOTPModel.getPhone());
		}
        if(! validation.get().getCode().equals(verifyOTPModel.getCode())){
        	throw new IllegalArgumentException("verification failed: Your code is " + verifyOTPModel.getCode() +"The correct code is: "+validation.get().getCode());
		}
		if(validation.get().getExpiration().isBefore(Instant.now())){
			throw new IllegalArgumentException("Delay Depasses " + verifyOTPModel.getCode());
		}

		activateAccount(verifyOTPModel.getPhone());
		Optional<User> user1 = userRepository.findByPhone(verifyOTPModel.getPhone());
		return user1.get();
	}

	@Override
	public User disActivateAccount(String phone) {
		Optional<User> user = userRepository.findByPhone(phone);
		if (!user.isPresent()) {
			throw new IllegalArgumentException("User not found with phone number: " + phone);
		}

		User user1 = user.get();
		user1.setActivated(false);
		User updatedUser = userRepository.save(user1);
		return updatedUser;
	}

	@Override
	public User blockAccount(String phone) {
		Optional<User> user = userRepository.findByPhone(phone);
		if (!user.isPresent()) {
			throw new IllegalArgumentException("User not found with phone number: " + phone);
		}


		User user1 = user.get();

		user1.setBlocked(true);
		User updatedUser = userRepository.save(user1);
		return updatedUser;
	}

	@Override
	public User disBlockAccount(String phone) {
		Optional<User> user = userRepository.findByPhone(phone);
		if (!user.isPresent()) {
			throw new IllegalArgumentException("User not found with phone number: " + phone);
		}

		User user1 = user.get();
		user1.setBlocked(false);
		User updatedUser = userRepository.save(user1);
		return updatedUser;
	}

	@Override
	public User updateProfil(ProfilModel updateProfil) {
		Optional<User> user = userRepository.findByPhone(updateProfil.getPhone());
		if (!user.isPresent()) {
			throw new IllegalArgumentException("User not found with phone number: " + updateProfil.getPhone());
		}

		User user1 = user.get();
		user1.setFullName(updateProfil.getFullName());
		user1.setBirthDate(updateProfil.getBirthDate());
		user1.setGender(updateProfil.getGender());
		user1.setEmail(updateProfil.getEmail());
		user1.setIdCardImage(updateProfil.getIdCardImage());
		user1.setIdCardExpirationDate(updateProfil.getIdCardExpirationDate());
		user1.setSignature(updateProfil.getSignature());
		user1.setPhoto(updateProfil.getPhoto());
		user1.setPhone(updateProfil.getNewPhone());
		user1.setPassword(passwordEncoder.encode(updateProfil.getPassword()));
		User updatedUser = userRepository.save(user1);
		return updatedUser;
	}

	@Override
	public Validation enregistrer(User user) {
		Validation validation = new Validation();
		Instant creation=Instant.now();
		Instant expiration=creation.plus(2,MINUTES);
		validation.setUser(user);
		String code="12345";//OTPGenerator(5);
        validation.setPhone(user.getPhone());
		validation.setCode(code);
		String message="YOur activation code is: "+ code;
		validation.setMessage(message);

		Optional<Validation> validation1=validationRepository.findByPhone(user.getPhone());

		if(validation1.isPresent()){
			System.out.println(validation1.get().getId()+"  "+validation1.get().getPhone());
			validationRepository.deleteByPhone(user.getPhone());
		}
        validationRepository.save(validation);
		// Envoyer le message message a user.getPhone().
		return validation;
	}

	public  String OTPGenerator(int nbdigit) {
		if (nbdigit <= 0) {
			throw new IllegalArgumentException("Le nombre de chiffres doit être supérieur à zéro.");
		}

		Random random = new Random();
		StringBuilder otp = new StringBuilder();

		for (int i = 0; i < nbdigit; i++) {
			int digit = random.nextInt(10); // Génère un chiffre aléatoire entre 0 et 9
			otp.append(digit);
		}

		return otp.toString();
	}





}