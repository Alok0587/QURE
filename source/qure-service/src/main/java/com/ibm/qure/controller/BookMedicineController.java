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
import com.ibm.qure.model.BookMedicine;
import com.ibm.qure.model.ResponseMessage;
import com.ibm.qure.service.BookMedicineService;


@CrossOrigin("*")
@RestController
@RequestMapping("/bookmedicines")
public class BookMedicineController {

	@Autowired
	BookMedicineService bookMedicineService;

	// List All BookMedicines GET /bookMedicines
	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public List<BookMedicine> getAllBookMedicines() {

		return bookMedicineService.getAll();
	}

	// List BookMedicine for given Id GET /bookMedicines/{id}
	@GetMapping(value = "/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public BookMedicine getBookMedicine(@PathVariable String id) {
		return bookMedicineService.get(id);
	}

	// Create BookMedicine POST /bookMedicines
	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin("*")
	public ResponseEntity<ResponseMessage> createBookMedicine(@RequestBody @Valid BookMedicine bookMedicine)
			throws URISyntaxException, ApplicationException {

		ResponseMessage resMsg;

		bookMedicineService.create(bookMedicine);
	
		resMsg = new ResponseMessage("Success", new String[] {"BookMedicine created successfully"});

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
		bookMedicineService.update(updatedBookMedicine);

		resMsg = new ResponseMessage("Success", new String[] {"BookMedicine updated successfully"});

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(updatedBookMedicine.getBookedId()).toUri();

		return ResponseEntity.created(location).body(resMsg);
	}

	// Delete BookMedicine DELETE /bookMedicines/{id}
	@DeleteMapping("/{id}")
	@CrossOrigin("*")
	public String deleteBookMedicine(@PathVariable String id) {
		bookMedicineService.delete(id);
		return "BookMedicine deleted successfully";
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
