package com.ibm.qure.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.qure.exceptions.ApplicationException;
import com.ibm.qure.model.Pharmacist;
import com.ibm.qure.repository.PharmacistRepository;

@Service
public class PharmacistService {

	@Autowired
	PharmacistRepository pharmacistRepo;

	public PharmacistService() {
	}

	public boolean create(Pharmacist pharmacist) throws ApplicationException {
		try {
			pharmacistRepo.save(pharmacist);
			return true;
		} catch (Exception e) {
			throw new ApplicationException("Server Error. Please try after sometime. Cause: " + e.getMessage(), e);
		}
	}

	public Pharmacist get(String id) {
		return pharmacistRepo.findById(id).get();
	}

	public List<Pharmacist> getAll() {
		return pharmacistRepo.findAll();
	}

	public boolean update(Pharmacist pharmacist) {
		pharmacistRepo.save(pharmacist);
		return true;
	}

	public boolean delete(String id) {
		pharmacistRepo.deleteById(id);
		return true;
	}

}