package com.ibm.qure.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.RequestParam;
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

	// List All Doctors GET /doctors or List Doctors by location
	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public List<Doctor> getAllDoctors(@RequestParam(name = "city", required = false) Optional<String> city) {
		if (city.isPresent()) {
			return doctorService.getByLocation(city);
		} else {
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
	public ResponseEntity<ResponseMessage> createDoctor(@RequestBody @Valid Doctor Doctor)
			throws URISyntaxException, ApplicationException {

		ResponseMessage resMsg;

		doctorService.create(Doctor);

		resMsg = new ResponseMessage("Success", new String[] { "Doctor created successfully" });

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(Doctor.getDoctorId()).toUri();

		return ResponseEntity.created(location).body(resMsg);

	}

	// Update Doctor PUT /doctors/{id}
	@PutMapping(value = "/{id}")
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> updateDoctor(@PathVariable String id, @RequestBody Doctor updatedDoctor)
			throws URISyntaxException, ApplicationException {
		updatedDoctor.setDoctorId(id);
		doctorService.update(updatedDoctor);
		ResponseMessage resMsg;

		resMsg = new ResponseMessage("Success", new String[] { "Doctor updated successfully" });

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(updatedDoctor.getDoctorId()).toUri();

		return ResponseEntity.created(location).body(resMsg);
	}

	// Delete Doctor DELETE /doctors/{id}
	@DeleteMapping("/{id}")
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> deleteDoctor(@PathVariable String id)
			throws URISyntaxException, ApplicationException {
		doctorService.delete(id);
		ResponseMessage resMsg;

		resMsg = new ResponseMessage("Success", new String[] { "Doctor updated successfully" });

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

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ResponseMessage> handleAppExcpetion(Exception e) {
		ResponseMessage resMsg = new ResponseMessage("Failure", new String[] { e.getMessage() },
				ExceptionUtils.getStackTrace(e));
		return ResponseEntity.badRequest().body(resMsg);
	}

}