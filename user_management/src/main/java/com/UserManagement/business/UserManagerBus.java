package com.UserManagement.business;

import com.UserManagement.dao.entities.*;
import com.UserManagement.dao.model.*;
import com.UserManagement.dao.repositories.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.netflix.discovery.converters.Auto;
import io.micrometer.core.instrument.config.validate.Validated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.IOUtils;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.swing.text.html.Option;
import javax.ws.rs.GET;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
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

	@Autowired
	ValidationEmailRepository validationEmailRepository;
    @Autowired
	private JavaMailSender javaMailSender;

    @Autowired
	private UploadFileRepository uploadFileRepository;

	@Value("${UPLOAD_DIR}")
	private String UPLOAD_DIR;

	@Value("${GET_IMAGE_BASE_URL}")
    private String GET_IMAGE_BASE_URL;

	@Override
	public User signin(String phone, String password) throws Exception {
		Optional<User> user = userRepository.findByPhone(phone);
//
//		if(!user.get().getIsActivated())
//			throw new IllegalAccessException ("Votre compte n'est pas activé.");

		if (!user.isPresent())
			throw new Exception("Ce compte n'existe pas dans notre base de données");

		if (!passwordEncoder.matches(password, user.get().getPassword()))
			throw new Exception("Mot de passe incorrect");

		return user.get();
	}

	@Override
	public User signup(String phone, String fullname,String email, LocalDate birthDate, String gender, String password) throws Exception {
		Optional<User> user = userRepository.findByPhone(phone);
		Optional<User> user2=userRepository.findByEmail(email);
		if (user.isPresent())
			throw new Exception("Ce numéro de télephone existe déjà dans notre base de données");
        if(user2.isPresent())
        	throw new Exception("Cette adresse mail est déjà utilisé");
		User obj = new User();
		obj.setPhone(phone);
		obj.setFullName(fullname);
		obj.setEmail(email);
		obj.setBirthDate(birthDate);
		obj.setCreationDate(LocalDateTime.now());
		obj.setGender(gender);
		obj.setPassword(passwordEncoder.encode(password));
		User user1=userRepository.save(obj);
		enregistrer(obj);

		return user1;
	}

	public void sendEmail(String to, String subject, String text) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject(subject);
		message.setText(text);
		message.setFrom("kamgajunior616@gmail.com");

		javaMailSender.send(message);
	}

	@Override
	public UserLoginModel getUserLoginDetails(String phone) {
		Optional<User> optionalUser = userRepository.findByPhone(phone);

		UserLoginModel userLoginModel = null;

		if (optionalUser.isPresent()) {
			User user = optionalUser.get();

			userLoginModel = new UserLoginModel(user.getPhone(), user.getFullName(), user.getBirthDate()
					, user.getGender(), user.getPassword(), user.getEmail(),user.isEmailIsVallid(),user.getCniRecto(),user.getCniVerso(),user.getSignature(),user.getPhoto(), user.getPrivilegelist().stream().map(x -> x.getRole()).map(x -> x.getRoleName()).collect(Collectors.toList()));
		}

		return userLoginModel;
	}


    public String getFileAsBase64(@PathVariable String filename) throws IOException {
        File file = ResourceUtils.getFile("classpath:static/" + filename);
        FileInputStream fileInputStream = new FileInputStream(file);
        byte[] fileBytes = IOUtils.toByteArray(fileInputStream);
        String base64String = Base64.getEncoder().encodeToString(fileBytes);
        return base64String;
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
	public Validation_Email VerifyEmail(String email) {
		Optional<User> user = userRepository.findByEmail(email);
		if (!user.isPresent()) {
			throw new IllegalArgumentException("User not found with mail: " + email);
		}
		User user1 = user.get();
		return enregistrer_validation_email(user1);
	}

	@Override
	public void sendSmsToApi(String phone, String message) {
		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		headers.set("X-Api-Key", "2C250CF6-0B66-41D5-A7A5-59EC8B6942E0");
		headers.set("X-Secret", "Fa20uInW2h2n3IpWs0f4NY6BRcPmC8snBioUcRJHmU9pC7");
		headers.set("Content-Type", "application/json");

		Map<String, Object> payload = new HashMap<>();
		payload.put("senderId", "FirstSaving");
		payload.put("message", message);
		payload.put("msisdn", new String[]{phone});
		payload.put("maskedMsisdn", false);
		payload.put("flag", "GSM7");

		org.springframework.http.HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

		ResponseEntity<String> response = restTemplate.exchange(
				"https://sms.lmtgroup.com/api/v1/pushes",
				HttpMethod.POST,
				request,
				String.class
		);

		System.out.println(response.getBody());
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

    public void copyMultipartFileToFile(String filePath, MultipartFile multipartFile) throws IOException {
        Path destinationPath = Path.of(filePath);
        Files.copy(multipartFile.getInputStream(), destinationPath);
        }


	@Override
	public User uploadFiles(UploadFileModel fileModel) throws IllegalArgumentException,IOException {
		String phone = fileModel.getPhone();
		Optional<User> optionalUser = userRepository.findByPhone(phone);
		if (optionalUser.isEmpty()) {
			throw new IllegalArgumentException("User not found with phone: " + phone);
		}
		User user = optionalUser.get();

		// Base directory where files will be stored
		String baseDir = UPLOAD_DIR;
        System.out.println("-*-*-*-*-*-*-*-*-*--*-*-*-*"+baseDir);
//		// Check and upload cniRecto file
		MultipartFile cniRectoFile = fileModel.getCniRecto();
		if (cniRectoFile != null && !cniRectoFile.isEmpty()) {
			String fileName = "recto_" + UUID.randomUUID().toString() +"."+ getExtension(cniRectoFile.getOriginalFilename());
			File file=new File(baseDir  + fileName);
            String filePath=baseDir + fileName;
            try {
                copyMultipartFileToFile(filePath, cniRectoFile);
            } catch (IOException e) {
                // Gérer l'exception en conséquence
            }
			user.setCniRecto(GET_IMAGE_BASE_URL + fileName);
			UploadFile uploadFile = new UploadFile(fileName, baseDir  + fileName);
			uploadFileRepository.save(uploadFile);
		}
//
		// Check and upload cniVerso file
		MultipartFile cniVersoFile = fileModel.getCniVerso();
		if (cniVersoFile != null && !cniVersoFile.isEmpty()) {

			String fileName = "verso_" + UUID.randomUUID().toString() +"."+ getExtension(cniVersoFile.getOriginalFilename());
			File file=new File(baseDir + fileName);
            String filePath=baseDir+ fileName;
			try {
                copyMultipartFileToFile(filePath, cniVersoFile);
            } catch (IOException e) {
                // Gérer l'exception en conséquence
            }
			user.setCniVerso(GET_IMAGE_BASE_URL+ fileName);
			UploadFile uploadFile = new UploadFile(fileName, baseDir + fileName);
			uploadFileRepository.save(uploadFile);
		}
////
//		// Check and upload photo file
		MultipartFile photoFile = fileModel.getPhoto();
		if (photoFile != null && !photoFile.isEmpty()) {
			String fileName = "photo_" + UUID.randomUUID().toString() +"."+ getExtension(photoFile.getOriginalFilename());
			File file =new File(baseDir + fileName);
			photoFile.transferTo(file);
			user.setPhoto(GET_IMAGE_BASE_URL + fileName);
			UploadFile uploadFile = new UploadFile(fileName, baseDir + fileName);
			uploadFileRepository.save(uploadFile);
		}
//
//		// Check and upload signature file
		MultipartFile signatureFile = fileModel.getSignature();
		if (signatureFile != null && !signatureFile.isEmpty()) {

			String fileName = "signature_" + UUID.randomUUID().toString() +"."+ getExtension(signatureFile.getOriginalFilename());
            File file =new File(baseDir+fileName);
            signatureFile.transferTo(file);
			user.setSignature(GET_IMAGE_BASE_URL+fileName);
			UploadFile uploadFile = new UploadFile(fileName, baseDir+fileName);
			uploadFileRepository.save(uploadFile);
		}

//		// Update user entity

		return userRepository.save(user);
	}



    public String getExtension(String fileName) {
        if (fileName != null && fileName.lastIndexOf('.') != -1) {
            return fileName.substring(fileName.lastIndexOf('.') + 1);
        }
        return "";
    }
	@Override
	public User VerifyOTPMail(VerifyOtpMailModel verifyOTPModel) {
		Optional<User> user = userRepository.findByEmail(verifyOTPModel.getEmail());
		if (!user.isPresent()) {
			throw new IllegalArgumentException("User not found with email: " + verifyOTPModel.getEmail());
		}

		Optional<Validation_Email> validation=validationEmailRepository.findByEmail(verifyOTPModel.getEmail());
		if (!validation.isPresent()) {
			throw new IllegalArgumentException("This code don't exist: " + verifyOTPModel.getEmail());
		}
		if(! validation.get().getCode().equals(verifyOTPModel.getCode())){
			throw new IllegalArgumentException("verification failed: Your code is " + verifyOTPModel.getCode() +"The correct code is: "+validation.get().getCode());
		}
		if(validation.get().getExpiration().isBefore(Instant.now())){
			throw new IllegalArgumentException("Delay Depasses " + verifyOTPModel.getCode());
		}
		user.get().setEmailIsVallid(true);

		return userRepository.save(user.get());
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

        if (updateProfil.getFullName() != null) {
            user1.setFullName(updateProfil.getFullName());
        }
        if (updateProfil.getBirthDate() != null) {
            user1.setBirthDate(updateProfil.getBirthDate());
        }
        if (updateProfil.getGender() != null) {
            user1.setGender(updateProfil.getGender());
        }
        if (updateProfil.getEmail() != null) {
            user1.setEmail(updateProfil.getEmail());
            user1.setEmailIsVallid(false);
        }
        if (updateProfil.getCniRecto() != null) {
            user1.setCniRecto(updateProfil.getCniRecto());
        }
        if (updateProfil.getCniVerso() != null) {
            user1.setCniVerso(updateProfil.getCniVerso());
        }
        if (updateProfil.getSignature() != null) {
            user1.setSignature(updateProfil.getSignature());
        }
        if (updateProfil.getPhoto() != null) {
            user1.setPhoto(updateProfil.getPhoto());
        }
        if (updateProfil.getNewPhone() != null) {
            user1.setPhone(updateProfil.getNewPhone());
        }
        if (updateProfil.getPassword() != null) {
            user1.setPassword(passwordEncoder.encode(updateProfil.getPassword()));
        }

        User updatedUser = userRepository.save(user1);
        return updatedUser;
    }

	@Override
	public Validation enregistrer(User user) {
		Validation validation = new Validation();
		Instant creation=Instant.now();
		Instant expiration=creation.plus(2,MINUTES);
		validation.setUser(user);
		String code=OTPGenerator(5);
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
//
//		// Envoyer le message message a user.getPhone().
	     sendSmsToApi(validation.getPhone(),message);
		return validation;
	}

	@Override
	public Validation_Email enregistrer_validation_email(User user) {
		Validation_Email validation = new Validation_Email();
		Instant creation=Instant.now();
		Instant expiration=creation.plus(2,MINUTES);
		validation.setUser(user);
		String code=OTPGenerator(5);
		validation.setEmail(user.getEmail());
		validation.setCode(code);
		String message="YOur activation code is: "+ code;
		validation.setMessage(message);
		Optional<Validation_Email> validation1=validationEmailRepository.findByEmail(user.getEmail());

		if(validation1.isPresent()){
			System.out.println("*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-Une occurence est la");
			validation1.get().setUser(validation.getUser());
			validation1.get().setActivation(validation.getActivation());
			validation1.get().setCode(validation.getCode());
			validation1.get().setExpiration(validation.getExpiration());
			validation1.get().setMessage(validation.getMessage());
			validation1.get().setCreation(validation.getCreation());
			validation=validation1.get();
		}
		validationEmailRepository.save(validation);

		// Envoyer le message message a user.getPhone().
		sendEmail(validation.getEmail(),"Validation de votre adresse email",validation.getMessage());
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


	private static String getFileExtension(File file) {
		String name = file.getName();
		int lastIndexOf = name.lastIndexOf(".");
		if (lastIndexOf == -1) {
			return ""; // empty extension
		}
		return name.substring(lastIndexOf + 1);
	}




}