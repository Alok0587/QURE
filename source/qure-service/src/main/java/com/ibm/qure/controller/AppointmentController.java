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
import com.ibm.qure.model.Appointment;
import com.ibm.qure.model.ResponseMessage;
import com.ibm.qure.service.AppointmentService;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

	@Autowired
	AppointmentService appointService;

	// List All appointments GET /appointments
	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public List<Appointment> getAllAppointments() {

		return appointService.getAll();
	}

	// List appointment for given Id GET /appointments/{id}
	@GetMapping(value = "/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public Appointment getAppointment(@PathVariable String id) {
		return appointService.get(id);
	}

	// Create Appointment POST /appointments
	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> createAppointment(@RequestBody @Valid Appointment appointment)
			throws URISyntaxException, ApplicationException {

		ResponseMessage resMsg;

		// Exception Handling moved to @ExceptionHandler
//		try {
		appointService.create(appointment);
//		} catch (ApplicationException e) {
//			resMsg = new ResponseMessage("Failure", e.getMessage());
//			return ResponseEntity.badRequest().body(resMsg);
//		}

		// Exception Handling moved to @ExceptionHandler
//		if(bindingResult.hasErrors()) {
//			resMsg = new ResponseMessage("Failure", "Validation Error");
//			return ResponseEntity.badRequest().body(resMsg);			
//		}

		resMsg = new ResponseMessage("Success", new String[] { "Appointment created successfully" });

		// Build newly created Employee resource URI - Employee ID is always 0 here.
		// Need to get the new Employee ID.
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(appointment.getId()).toUri();

		return ResponseEntity.created(location).body(resMsg);

	}

	// Update Appointment PUT /appointments/{id}
	@PutMapping(value = "/{id}")
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> updateEmployee(@PathVariable String id, @RequestBody Appointment updatedAppoint) {
		updatedAppoint.setId(id);
		appointService.update(updatedAppoint);
		
		ResponseMessage resMsg;
		resMsg = new ResponseMessage("Success", new String[] { "Appointment updated successfully" });

		// Build newly created Employee resource URI - Employee ID is always 0 here.
		// Need to get the new Employee ID.
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(updatedAppoint.getId()).toUri();

		return ResponseEntity.created(location).body(resMsg);
	}

	// Delete Appointment DELETE /appointments/{id}
	@DeleteMapping("/{id}")
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> deleteAppointment(@PathVariable String id) {
		appointService.delete(id);
		ResponseMessage resMsg;
		resMsg = new ResponseMessage("Success", new String[] { "Appointment deleted successfully" });

		// Build newly created Employee resource URI - Employee ID is always 0 here.
		// Need to get the new Employee ID.
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(id).toUri();

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
