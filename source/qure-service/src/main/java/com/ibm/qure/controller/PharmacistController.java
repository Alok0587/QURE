package com.ibm.qure.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
import com.ibm.qure.exceptions.QureApplicationException;


@RestController
@RequestMapping("/pharmacists")
public class PharmacistController {
	private static Logger log=LoggerFactory.getLogger(PharmacistController.class);
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
			throws URISyntaxException, ApplicationException,QureApplicationException {

		ResponseMessage resMsg;

		boolean x=pharmacistService.create(pharmacist);
	   if(x) {
		resMsg = new ResponseMessage("Success", new String[] {"Pharmacist created successfully"});
	   }
	   else
	   {
		   resMsg = new ResponseMessage("Failure", new String[] {"Pharmacist failed to create"}); 
	   }
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(pharmacist.getPharmaId()).toUri();

		return ResponseEntity.created(location).body(resMsg);

	}

	// Update Pharmacist PUT /pharmacists/{id}
	@PutMapping(value = "/{id}")
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> updatePharmacist(@PathVariable String id, @RequestBody Pharmacist updatedPharmacist) throws URISyntaxException, ApplicationException,QureApplicationException  {
		ResponseMessage resMsg;

		updatedPharmacist.setPharmaId(id);
		boolean x= pharmacistService.update(updatedPharmacist);
  if(x) {
		resMsg = new ResponseMessage("Success", new String[] {"Pharmacist updated successfully"});
  }
  else
  {
	  resMsg = new ResponseMessage("Failure", new String[] {"Pharmacist failed to update"});
  }
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(updatedPharmacist.getPharmaId()).toUri();

		return ResponseEntity.created(location).body(resMsg);
	}

	// Delete Pharmacist DELETE /Pharmacists/{id}
	@DeleteMapping("/{id}")
	@CrossOrigin("*")
 
	public ResponseEntity<ResponseMessage> deletePharmacist(@PathVariable String id)
			throws URISyntaxException, ApplicationException,QureApplicationException {
		 boolean x= pharmacistService.delete(id);
		ResponseMessage resMsg;
  if(x) {
		resMsg = new ResponseMessage("Success", new String[] { "Pharmacist deleted successfully" });
  }
  else
  {
	  resMsg = new ResponseMessage("Failure", new String[] { "Failed to delete pharmacist" });
  }
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(id).toUri();

		return ResponseEntity.created(location).body(resMsg);
	}
//	public String deletePharmacist(@PathVariable String id) {
//	pharmacistService.delete(id);
//	return "Pharmacist deleted successfully";
//}

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

	@ExceptionHandler(QureApplicationException.class)
	public ResponseEntity<ResponseMessage> handleQureApplicationExcpetion(Exception e) {
		log.error("Error Occured:",e.getMessage(),e);
		ResponseMessage resMsg = new ResponseMessage("Failure", new String[] { e.getMessage() },
				ExceptionUtils.getStackTrace(e));
		return ResponseEntity.badRequest().body(resMsg);
	}

}
