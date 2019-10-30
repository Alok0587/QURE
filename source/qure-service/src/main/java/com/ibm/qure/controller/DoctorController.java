package com.ibm.qure.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.ibm.qure.exceptions.ApplicationException;
import com.ibm.qure.model.Doctor;
import com.ibm.qure.model.ResponseMessage;
import com.ibm.qure.repository.DoctorRepository;
import com.ibm.qure.repository.PatientRepository;
import com.ibm.qure.security.UserRepository;
import com.ibm.qure.security.Users;
import com.ibm.qure.service.DoctorService;
import com.ibm.qure.exceptions.QureApplicationException;

@RestController
@CrossOrigin("*")
@RequestMapping("/doctors")
public class DoctorController {

	 private static Logger log=LoggerFactory.getLogger(DoctorController.class);
	@Autowired
	DoctorService doctorService;
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	DoctorRepository doctorRepo;
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	//USER Authentication 
	@PostMapping("/auth")
	@CrossOrigin("*")
	public Principal authenticate(Principal user)
	{	System.out.println("inside authenticaion of doctor");
		System.out.println("LoggedIn User: " + user);
//		return (Principal) patientRepo.findByEmail(user.getName());
		return user;
		
	}

	// List All Doctors GET /doctors or List Doctors by location
		@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
		@CrossOrigin("*")
		public List<Doctor> getAllDoctors(@RequestParam(name = "city", required = false) Optional<String> city,@RequestParam(name = "specialization", required = false) Optional<String> specialization) {
			System.out.println("Inside doc filtr controller");
			if(city.isPresent()) {
				if(specialization.isPresent()) {
					System.out.println("Inside doc filtr 1");
					System.out.println("city and spec is "+city);
					System.out.println("city and spec is "+specialization);
					return doctorService.getByCityAndSpecialization(city,specialization);
				}
				else {
					System.out.println("Inside doc filtr 2");
					return doctorService.getByLocation(city);
				}
			}
			
//			else if (city.isPresent()) {
//				System.out.println("Inside doc filtr 2");
//				return doctorService.getByLocation(city);
//			} 
			else if(specialization.isPresent()) {
				System.out.println("Inside doc filtr 3");
				return doctorService.getBySpecialization(specialization);
				
			}
			else {
				System.out.println("Inside doc filtr 4");
				return doctorService.getAll();
			}
			
		}

	// List Doctor for given Id GET /doctors/{id}
	@GetMapping(value = "/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public Doctor getDoctor(@PathVariable String id) {
		return doctorService.get(id);
	}

	// Create Doctor POST /doctors
	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> createDoctor(@RequestBody @Valid Doctor doctor)
			throws URISyntaxException, ApplicationException , QureApplicationException{
		
		
		String encodedPassword = bCryptPasswordEncoder.encode(doctor.getPassword());
		doctor.setPassword(encodedPassword);
		doctorRepo.save(doctor);
		
		Users user= new Users(doctor.getEmail(), doctor.getPassword(), doctor.getDoctorId(), "DOCTOR");
		System.out.println(user.getUsername());
		System.out.println(user.getPassword());
		userRepo.save(user);

		ResponseMessage resMsg;
		

		boolean x= doctorService.create(doctor);

		if(x)
		{
			resMsg = new ResponseMessage("Success", new String[] { "Doctor created successfully" });
		}
		else
		{
			resMsg = new ResponseMessage("Failure", new String[] { "Unable to create doctor" });
		}
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(doctor.getDoctorId()).toUri();

		return ResponseEntity.created(location).body(resMsg);
	}

	// Update Doctor PUT /doctors/{id}
	@PutMapping(value = "/{id}")
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> updateDoctor(@PathVariable String id, @RequestBody Doctor updatedDoctor)
			throws URISyntaxException, ApplicationException,QureApplicationException {
		updatedDoctor.setDoctorId(id);
		
		boolean x= doctorService.update(updatedDoctor);
		ResponseMessage resMsg;
     if(x) {
		resMsg = new ResponseMessage("Success", new String[] { "Doctor updated successfully" });
     }
     else {
    	 resMsg = new ResponseMessage("Success", new String[] { "Doctor update Failed" }); 
     }
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(updatedDoctor.getDoctorId()).toUri();

		return ResponseEntity.created(location).body(resMsg);
	}

	// Delete Doctor DELETE /doctors/{id}
	@DeleteMapping("/{id}")
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> deleteDoctor(@PathVariable String id)
			throws URISyntaxException, ApplicationException,QureApplicationException {
		 boolean x= doctorService.delete(id);
		ResponseMessage resMsg;
  if(x) {
		resMsg = new ResponseMessage("Success", new String[] { "Doctor deleted successfully" });
  }
  else
  {
	  resMsg = new ResponseMessage("Failure", new String[] { "Failed to delete doctor" });
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
		log.error("Error Occured:",e.getMessage(),e);
		ResponseMessage resMsg = new ResponseMessage("Failure", new String[] { e.getMessage() },
				ExceptionUtils.getStackTrace(e));
		return ResponseEntity.badRequest().body(resMsg);
	}

}