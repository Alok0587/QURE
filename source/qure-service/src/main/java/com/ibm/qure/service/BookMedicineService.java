package com.ibm.qure.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.qure.exceptions.ApplicationException;
import com.ibm.qure.model.BookMedicine;
import com.ibm.qure.repository.BookMedicineRepository;

@Service
public class BookMedicineService {

	@Autowired
	BookMedicineRepository bookMedicineRepo;

	public BookMedicineService() {
	}

	public boolean create(BookMedicine bookMedicine) throws ApplicationException {
		try {
			bookMedicineRepo.save(bookMedicine);
			return true;
		} catch (Exception e) {
			throw new ApplicationException("Server Error. Please try after sometime. Cause: " + e.getMessage(), e);
		}
	}

	public BookMedicine get(String id) {
		return bookMedicineRepo.findById(id).get();
	}

	public List<BookMedicine> getAll() {
		return bookMedicineRepo.findAll();
	}

	public boolean update(BookMedicine bookMedicine) {
		bookMedicineRepo.save(bookMedicine);
		return true;
	}

	public boolean delete(String id) {
		bookMedicineRepo.deleteById(id);
		return true;
	}

}