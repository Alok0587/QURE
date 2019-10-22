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
import com.ibm.qure.model.Pharmacist;
import com.ibm.qure.model.ResponseMessage;
import com.ibm.qure.service.PharmacistService;



@RestController
@RequestMapping("/pharmacists")
public class PharmacistController {

	@Autowired
	PharmacistService pharmacistService;

	// List All Pharmacists GET /pharmacists
	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public List<Pharmacist> getAllPharmacists() {

		return pharmacistService.getAll();
	}

	// List Pharmacist for given Id GET /pharmacists/{id}
	@GetMapping(value = "/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public Pharmacist getPharmacist(@PathVariable String id) {
		return pharmacistService.get(id);
	}

	// Create Pharmacist POST /pharmacists
	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> createPharmacist(@RequestBody @Valid Pharmacist pharmacist)
			throws URISyntaxException, ApplicationException {

		ResponseMessage resMsg;

		pharmacistService.create(pharmacist);
	
		resMsg = new ResponseMessage("Success", new String[] {"Pharmacist created successfully"});

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(pharmacist.getPharmaId()).toUri();

		return ResponseEntity.created(location).body(resMsg);

	}

	// Update Pharmacist PUT /pharmacists/{id}
	@PutMapping(value = "/{id}")
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> updatePharmacist(@PathVariable String id, @RequestBody Pharmacist updatedPharmacist) throws URISyntaxException, ApplicationException  {
		ResponseMessage resMsg;

		updatedPharmacist.setPharmaId(id);
		pharmacistService.update(updatedPharmacist);

		resMsg = new ResponseMessage("Success", new String[] {"Pharmacist updated successfully"});

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(updatedPharmacist.getPharmaId()).toUri();

		return ResponseEntity.created(location).body(resMsg);
	}

	// Delete Pharmacist DELETE /Pharmacists/{id}
	@DeleteMapping("/{id}")
	@CrossOrigin("*")
	public String deletePharmacist(@PathVariable String id) {
		pharmacistService.delete(id);
		return "Pharmacist deleted successfully";
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
