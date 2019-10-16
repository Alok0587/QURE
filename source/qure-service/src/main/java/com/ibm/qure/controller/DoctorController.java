package com.ibm.qure.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

import com.ibm.qure.exceptions.ApplicationException;
import com.ibm.qure.model.Doctor;
import com.ibm.qure.model.ResponseMessage;
import com.ibm.qure.service.DoctorService;



@RestController
@RequestMapping("/doctors")
public class DoctorController {

	@Autowired
	DoctorService doctorService;

	// List All Doctors GET /doctors
	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public List<Doctor> getAllDoctors() {

		return doctorService.getAll();
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
	public ResponseEntity<ResponseMessage> createDoctor(@RequestBody @Valid Doctor Doctor)
			throws URISyntaxException, ApplicationException {

		ResponseMessage resMsg;

		// Exception Handling moved to @ExceptionHandler
//		try {
		doctorService.create(Doctor);
	

		resMsg = new ResponseMessage("Success", new String[] {"Doctor created successfully"});

		// Build newly created Employee resource URI - Employee ID is always 0 here.
		// Need to get the new Employee ID.
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(Doctor.getDoctorId()).toUri();

		return ResponseEntity.created(location).body(resMsg);

	}

	// Update Doctor PUT /doctors/{id}
	@PutMapping(value = "/{id}")
	@CrossOrigin("*")
	public String updateDoctor(@PathVariable String id, @RequestBody Doctor updatedDoctor) {
		updatedDoctor.setDoctorId(id);
		doctorService.update(updatedDoctor);
		return "Doctor updated successfully";
	}

	// Delete Doctor DELETE /doctors/{id}
	@DeleteMapping("/{id}")
	@CrossOrigin("*")
	public String deleteDoctor(@PathVariable String id) {
		doctorService.delete(id);
		return "Doctor deleted successfully";
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResponseMessage> handleValidationExcpetion(MethodArgumentNotValidException e) {

		List<ObjectError> errors = e.getBindingResult().getAllErrors();
		int size = errors.size();
		String[] errorMsgs = new String[size];

		for(int i = 0; i < size; i++ ) {
			errorMsgs[i] = errors.get(i).getDefaultMessage();
		}

		ResponseMessage resMsg = new ResponseMessage("Failure", errorMsgs);
		return ResponseEntity.badRequest().body(resMsg);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ResponseMessage> handleAppExcpetion(Exception e) {
		ResponseMessage resMsg = new ResponseMessage("Failure", new String[] { e.getMessage() },
				ExceptionUtils.getStackTrace(e));
		return ResponseEntity.badRequest().body(resMsg);
	}

}