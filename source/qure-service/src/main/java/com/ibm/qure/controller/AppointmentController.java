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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import com.ibm.qure.model.Appointment;
import com.ibm.qure.model.ResponseMessage;
import com.ibm.qure.service.AppointmentService;
import com.ibm.qure.exceptions.QureApplicationException;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {
	private static Logger log=LoggerFactory.getLogger(AppointmentController.class);
	@Autowired
	AppointmentService appointService;

	// List All appointments GET /appointments or Get by pId or dId
	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public List<Appointment> getAllAppointments(@RequestParam(name = "dId", required = false) Optional<String> dId,
			@RequestParam(name = "pId", required = false) Optional<String> pId, @RequestParam(name = "slot", required = false) Optional<String> slot) {
		if(dId.isPresent() && slot.isPresent()) {
			return appointService.appointmentSlot(slot, dId);
		}
		else if (pId.isPresent()) {
			return appointService.patientsAppointmentList(pId);
		} else if (dId.isPresent()) {
			return appointService.doctorsAppointmentList(dId);
		} 
			return appointService.getAll();
		

	}
	
	
	
	@GetMapping(value = "/checkslot", produces = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public boolean checkSlot(@RequestParam(name = "dId", required = false) Optional<String> dId,
			@RequestParam(name = "slot", required = false) Optional<String> slot) {
		if(dId.isPresent() && slot.isPresent()) {
			System.out.println("inside checkslot");
			return appointService.appointmentSlot(slot, dId).isEmpty();
		}		
		
			return false;
		

	}
	
	
	
	
	
	

	// List appointment for given Id GET /appointments/{id}
	@GetMapping(value = "/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public Appointment getAppointment(@PathVariable String id) {
		return appointService.get(id);
	}

	// Create Appointment POST /appointments
	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.ALL_VALUE })
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> createAppointment(@RequestBody @Valid Appointment appointment)
			throws URISyntaxException, ApplicationException,QureApplicationException {

		ResponseMessage resMsg;

		boolean x= appointService.create(appointment);
  if(x) {
		resMsg = new ResponseMessage("Success", new String[] { "Appointment created successfully" });
  }
  else
  {
	  resMsg = new ResponseMessage("Failure", new String[] { "Appointment can't be created " }); 
  }
		// Build newly created Employee resource URI - Employee ID is always 0 here.
		// Need to get the new Employee ID.
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(appointment.getAppointmentId()).toUri();

		return ResponseEntity.created(location).body(resMsg);

	}

	// Update Appointment PUT /appointments/{id}
	@PutMapping(value = "/{id}")
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> updateEmployee(@PathVariable String id,
			@RequestBody Appointment updatedAppoint) {
		updatedAppoint.setAppointmentId(id);
		boolean x=appointService.update(updatedAppoint);

		ResponseMessage resMsg;
		if(x) {
		resMsg = new ResponseMessage("Success", new String[] { "Appointment updated successfully" });
		}
		else
		{
			resMsg = new ResponseMessage("Failure", new String[] { "Appointment failed to update" });
		}
		// Build newly created Employee resource URI - Employee ID is always 0 here.
		// Need to get the new Employee ID.
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(updatedAppoint.getAppointmentId()).toUri();

		return ResponseEntity.created(location).body(resMsg);
	}

	// Delete Appointment DELETE /appointments/{id}
	@DeleteMapping("/{id}")
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> deleteAppointment(@PathVariable String id) {
		boolean y=appointService.delete(id);
		ResponseMessage resMsg;
		if(y) {
		resMsg = new ResponseMessage("Success", new String[] { "Appointment deleted successfully" });
		}
		else
		{
			resMsg = new ResponseMessage("Failure", new String[] { "Appointment failed to delete" });
		}
		// Build newly created Employee resource URI - Employee ID is always 0 here.
		// Need to get the new Employee ID.
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
