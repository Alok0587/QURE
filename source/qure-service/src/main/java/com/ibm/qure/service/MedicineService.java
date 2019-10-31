package com.ibm.qure.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.qure.exceptions.ApplicationException;
import com.ibm.qure.exceptions.QureApplicationException;
import com.ibm.qure.model.Medicine;
import com.ibm.qure.repository.MedicineRepository;

@Service
public class MedicineService {

	@Autowired
	MedicineRepository medicineRepo;

	public MedicineService() {
	}

	public boolean create(Medicine medicine) throws QureApplicationException {
		try {
			medicineRepo.save(medicine);
			return true;
		} catch (Exception e) {
			throw new QureApplicationException("Server Error. Please try after sometime. Cause: " + e.getMessage(), e);
		}
	}

	public Medicine get(String id) {
		return medicineRepo.findById(id).get();
	}

	public List<Medicine> getAll() {
		return medicineRepo.findAll();
	}

	public boolean update(Medicine medicine) {
		medicineRepo.save(medicine);
		return true;
	}

	public boolean delete(String id) {
		medicineRepo.deleteById(id);
		return true;
	}

}