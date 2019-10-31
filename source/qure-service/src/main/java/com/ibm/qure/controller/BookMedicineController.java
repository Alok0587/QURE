package com.ibm.qure.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
import com.ibm.qure.exceptions.QureApplicationException;
import com.ibm.qure.exceptions.ApplicationException;
import com.ibm.qure.model.BookMedicine;
import com.ibm.qure.model.ResponseMessage;
import com.ibm.qure.service.BookMedicineService;


@CrossOrigin("*")
@RestController
@RequestMapping("/bookmedicines")
public class BookMedicineController {
	private static Logger log=LoggerFactory.getLogger(BookMedicineController.class);
	@Autowired
	BookMedicineService bookMedicineService;

	// List All BookMedicines GET /bookMedicines
	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public List<BookMedicine> getAllBookMedicines() throws QureApplicationException {

		return bookMedicineService.getAll();
	}

	// List BookMedicine for given Id GET /bookMedicines/{id}
	@GetMapping(value = "/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public List<BookMedicine> getBookMedicine(@PathVariable Optional<String> id) throws QureApplicationException  {
		List<BookMedicine> booked = bookMedicineService.getPatient(id);
		System.out.println(booked);
		return bookMedicineService.getPatient(id);
	}
	
//	@GetMapping(value = "/{patientid}", produces = { MediaType.APPLICATION_JSON_VALUE })
//	@CrossOrigin("*")
//	public List<BookMedicine> getBookMedicinePatient(@PathVariable Optional<String> id) {
//		return bookMedicineService.getPatient(id);
//	}

	// Create BookMedicine POST /bookMedicines
	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> createBookMedicine(@RequestBody @Valid BookMedicine bookMedicine)
			throws URISyntaxException, ApplicationException,QureApplicationException {

		ResponseMessage resMsg;

		boolean y= bookMedicineService.create(bookMedicine);
	if(y) {
		resMsg = new ResponseMessage("Success", new String[] {"BookMedicine created successfully"});
		log.debug("BookMedicine created successfully");
	}
	else
	{
		resMsg = new ResponseMessage("Failure", new String[] {"BookMedicine failed to create"});
		log.debug("BookMedicine failed to create");
	}
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(bookMedicine.getBookedId()).toUri();

		return ResponseEntity.created(location).body(resMsg);

	}

	// Update BookMedicine PUT /bookMedicines/{id}
	@PutMapping(value = "/{id}")
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> updateBookMedicine(@PathVariable String id, @RequestBody BookMedicine updatedBookMedicine) throws URISyntaxException, ApplicationException  {
		ResponseMessage resMsg;

		updatedBookMedicine.setBookedId(id);
		boolean y=bookMedicineService.update(updatedBookMedicine);
    if(y) {
		resMsg = new ResponseMessage("Success", new String[] {"BookMedicine updated successfully"});
		log.debug("BookMedicine updated successfully");
    }
    else
    {
    	resMsg = new ResponseMessage("Failure", new String[] {"BookMedicine  failed to update"});
    	log.debug("BookMedicine  failed to update");
    }
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(updatedBookMedicine.getBookedId()).toUri();

		return ResponseEntity.created(location).body(resMsg);
	}

	// Delete BookMedicine DELETE /bookMedicines/{id}
	@DeleteMapping("/{id}")
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> deleteBookMedicine(@PathVariable String id)
			throws URISyntaxException, ApplicationException,QureApplicationException {
		 boolean x= bookMedicineService.delete(id);
		ResponseMessage resMsg;
  if(x) {
		resMsg = new ResponseMessage("Success", new String[] { "BookMedicine deleted successfully" });
		log.debug("BookMedicine deleted successfully");
  }
  else
  {
	  resMsg = new ResponseMessage("Failure", new String[] { "Failed to delete BookMedicine" });
	  log.debug("Failed to delete BookMedicine");
  }
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(id).toUri();

		return ResponseEntity.created(location).body(resMsg);
	}
//	public String deleteBookMedicine(@PathVariable String id) {
//		bookMedicineService.delete(id);
//		return "BookMedicine deleted successfully";
//	}

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
		log.error("Error Occured:{}",e.getMessage(),e);
		ResponseMessage resMsg = new ResponseMessage("Failure", new String[] { e.getMessage() },
				ExceptionUtils.getStackTrace(e));
		return ResponseEntity.badRequest().body(resMsg);
	}

}
