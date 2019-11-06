package com.ibm.qure.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.List;

import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.ibm.qure.exceptions.QureApplicationException;
import com.ibm.qure.exceptions.ApplicationException;
import com.ibm.qure.model.Patient;
import com.ibm.qure.model.ResponseMessage;
import com.ibm.qure.repository.PatientRepository;
import com.ibm.qure.security.UserRepository;
import com.ibm.qure.security.Users;
import com.ibm.qure.service.MessageService;
import com.ibm.qure.service.PatientService;

@RestController
@RequestMapping("/patients")
public class PatientController {

	private static Logger log = LoggerFactory.getLogger(PatientController.class);
	@Autowired
	PatientService patientService;

	@Autowired
	MessageService messageService;

	@Autowired
	UserRepository userRepo;

	@Autowired
	PatientRepository patientRepo;

	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;

	// USER Authentication
	@PostMapping(value = "/auth", consumes = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public Principal authenticate(Principal user) {
		log.debug("inside authenticaion");
		log.debug("LoggedIn User: " + user);
//		return (Principal) patientRepo.findByEmail(user.getName());
		return user;

	}

	// List All Patients GET /Patients
	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public List<Patient> getAllPatients() throws QureApplicationException {
		return patientService.getAll();
	}

	// List Patient for given Id GET /Patients/{id}
	@GetMapping(value = "/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public Patient getPatient(@PathVariable String id) throws QureApplicationException {
		if(patientService.get(id) != null) {
			return patientService.get(id);
		}
		else return patientService.getById(id);
	}

	// Create Patient POST /Patients
	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> createPatient(@RequestBody @Valid Patient patient)
			throws URISyntaxException, ApplicationException, QureApplicationException {
		
		try {

		String encodedPassword = bCryptPasswordEncoder.encode(patient.getPassword());
		patient.setPassword(encodedPassword);
		
		System.out.println(patient.getEmail());
		Users existPat = userRepo.findByUsername(patient.getEmail());
		
		//System.out.println("existsXXXXXXXXXXXXXXXXXXXXXXXXXX    "+existDoc);
		
		if(existPat==null)
		{
			
			
			patientRepo.save(patient);
			messageService.sendSMS(patient.getPhone(), patient.getName());
			messageService.sendEmail(patient.getEmail(), patient.getName());
			// messageService.sendEmail(patient.getEmail());

			ResponseMessage resMsg;
			Users user = new Users(patient.getEmail(), patient.getPassword(), patient.getPatientId(), "PATIENT");
			log.debug(user.getUsername());
			log.debug(user.getPassword());
			userRepo.save(user);
			resMsg = new ResponseMessage("Success", new String[] { "Patient created successfully" });
			log.debug("Patient created successfully");
			URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(patient.getPatientId()).toUri();

			return ResponseEntity.created(location).body(resMsg);
			
			}
		
		else
		{
		//doctorRepo.save(doctor);
			System.out.println("Patient exists.");
			throw new QureApplicationException();
		
	}
	}
	
	catch (Exception e) {
		throw new QureApplicationException("The profile already exists. Please check your credentials." + e.getMessage(), e);
	}
		
	}
	// Update Patient PUT /Patients/{id}
	@PutMapping(value = "/{id}")
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> updatePatient(@PathVariable String id, @RequestBody Patient updatedPatient)
			throws URISyntaxException, ApplicationException, QureApplicationException {

		updatedPatient.setPatientId(id);
		boolean x = patientService.update(updatedPatient);
		ResponseMessage resMsg;
		if (x) {
			messageService.sendUpdateSMS(updatedPatient.getPhone());
			messageService.sendUpdateEmail(updatedPatient.getEmail());
			resMsg = new ResponseMessage("Success", new String[] { "Patient updated successfully" });
			log.debug("Patient updated successfully");
		} else {
			resMsg = new ResponseMessage("Failure", new String[] { "Patient failed to update" });
			log.debug("Patient failed to update");
		}
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(updatedPatient.getPatientId()).toUri();

		return ResponseEntity.created(location).body(resMsg);
	}
	@PutMapping
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> updatePassword(@RequestBody Patient upPatient)
			throws URISyntaxException, ApplicationException, QureApplicationException {
		
		System.out.println(upPatient.getEmail()+ "   "+ upPatient.getPassword());
		
		String encodedPassword = bCryptPasswordEncoder.encode(upPatient.getPassword());
		
		
		Patient updatedPatient = patientRepo.findByEmail(upPatient.getEmail());
		
		System.out.println(updatedPatient.getEmail());
		Users user = userRepo.findByUsername(upPatient.getEmail());
		boolean y=user.setPassword(encodedPassword);;

		boolean x = updatedPatient.setPassword(encodedPassword);
		
		userRepo.save(user);
		patientRepo.save(updatedPatient);
		System.out.println(x);
		System.out.println(updatedPatient.getPassword());
		ResponseMessage resMsg;
		if (x&&y) {
//			messageService.sendUpdateSMS(updatedPatient.getPhone());
			messageService.sendUpdateEmail(upPatient.getEmail());
			resMsg = new ResponseMessage("Success", new String[] { "Password updated successfully" });
			log.debug("Password updated successfully");
		} else {
			resMsg = new ResponseMessage("Failure", new String[] { "Password failed to update" });
			log.debug("Password failed to update");
		}
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("")
				.buildAndExpand(updatedPatient.getPatientId()).toUri();

		return ResponseEntity.created(location).body(resMsg);
	}///////////////////////////////
	
	
	@PostMapping(value = "/forgot", consumes = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> forgotPass(@RequestBody Patient patient)
			throws URISyntaxException, ApplicationException, QureApplicationException {
		System.out.println("controller");
		boolean x = false;
		try {

			Users existPat = userRepo.findByUsername(patient.getEmail());

			// System.out.println("existsXXXXXXXXXXXXXXXXXXXXXXXXXX "+existDoc);

			if (existPat == null) {

				x = false;
				throw new QureApplicationException();

			}

			else {
				x = true;

			}
		}

		catch (Exception e) {
			throw new QureApplicationException(
					"The profile doesn;t exists. Please check your credentials." + e.getMessage(), e);
		}

		ResponseMessage resMsg;

		if (x) {

			messageService.sendFogotPass(patient.getEmail(), patient.getPhone());
			System.out.println("emaili");
			resMsg = new ResponseMessage("Success", new String[] { "otp send successfully" });
		} else {
			resMsg = new ResponseMessage("Failure", new String[] { "Unable to send otp" });
		}
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/forgot")
				.buildAndExpand(patient.getPatientId()).toUri();

		return ResponseEntity.created(location).body(resMsg);
	}
	///////////////////////////

	// Delete Patient DELETE /Patients/{id}
	@DeleteMapping("/{id}")
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> deletePatient(@PathVariable String id)
			throws URISyntaxException, ApplicationException, QureApplicationException {

		String mobile = patientService.getById(id).getPhone();
		String email = patientService.getById(id).getEmail();
		messageService.sendDeleteSMS(mobile);
		messageService.sendDeleteEmail(email);

		boolean x = patientService.delete(id);
		ResponseMessage resMsg;
		if (x) {
			resMsg = new ResponseMessage("Success", new String[] { "Patient deleted successfully" });
			log.debug("Patient deleted successfully");
		} else {
			resMsg = new ResponseMessage("Failure", new String[] { "Patient failed to  delete" });
			log.debug("Patient failed to  delete");
		}
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(id).toUri();

		return ResponseEntity.created(location).body(resMsg);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResponseMessage> handleValidationExcpetion(MethodArgumentNotValidException e) {

		List<ObjectError> errors = e.getBindingResult().getAllErrors();
		int size = errors.size();
		String[] errorMsgs = new String[size];

		for (int i = 0; i < size; i++) {
			errorMsgs[i] = errors.get(i).getDefaultMessage();
		}

		ResponseMessage resMsg = new ResponseMessage("Failure", errorMsgs);
		return ResponseEntity.badRequest().body(resMsg);
	}

	@ExceptionHandler(QureApplicationException.class)
	public ResponseEntity<ResponseMessage> handleQureApplicationExcpetion(Exception e) {
		log.error("Error Occured:{}", e.getMessage(), e);
		ResponseMessage resMsg = new ResponseMessage("Failure", new String[] { e.getMessage() },
				ExceptionUtils.getStackTrace(e));
		return ResponseEntity.badRequest().body(resMsg);
	}

}