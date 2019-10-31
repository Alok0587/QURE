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
		System.out.println("inside authenticaion");
		System.out.println("LoggedIn User: " + user);
//		return (Principal) patientRepo.findByEmail(user.getName());
		return user;

	}

	// List All Patients GET /Patients
	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public List<Patient> getAllPatients() {
		return patientService.getAll();
	}

	// List Patient for given Id GET /Patients/{id}
	@GetMapping(value = "/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public Patient getPatient(@PathVariable String id) {
		return patientService.get(id);
	}

	// Create Patient POST /Patients
	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> createPatient(@RequestBody @Valid Patient patient)
			throws URISyntaxException, ApplicationException, QureApplicationException {

		String encodedPassword = bCryptPasswordEncoder.encode(patient.getPassword());
		patient.setPassword(encodedPassword);
		patientRepo.save(patient);
		messageService.sendSMS(patient.getPhone(), patient.getName());

		ResponseMessage resMsg;
		Users user = new Users(patient.getEmail(), patient.getPassword(), patient.getPatientId(), "PATIENT");
		System.out.println(user.getUsername());
		System.out.println(user.getPassword());
		userRepo.save(user);
		resMsg = new ResponseMessage("Success", new String[] { "Patient created successfully" });

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(patient.getPatientId()).toUri();

		return ResponseEntity.created(location).body(resMsg);
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
			resMsg = new ResponseMessage("Success", new String[] { "Patient updated successfully" });
		} else {
			resMsg = new ResponseMessage("Failure", new String[] { "Patient failed to update" });
		}
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(updatedPatient.getPatientId()).toUri();

		return ResponseEntity.created(location).body(resMsg);
	}

	// Delete Patient DELETE /Patients/{id}
	@DeleteMapping("/{id}")
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> deletePatient(@PathVariable String id)
			throws URISyntaxException, ApplicationException, QureApplicationException {

		boolean x = patientService.delete(id);
		ResponseMessage resMsg;
		if (x) {
			resMsg = new ResponseMessage("Success", new String[] { "Patient deleted successfully" });
		} else {
			resMsg = new ResponseMessage("Failure", new String[] { "Patient failed to  delete" });
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
		log.error("Error Occured:", e.getMessage(), e);
		ResponseMessage resMsg = new ResponseMessage("Failure", new String[] { e.getMessage() },
				ExceptionUtils.getStackTrace(e));
		return ResponseEntity.badRequest().body(resMsg);
	}

}