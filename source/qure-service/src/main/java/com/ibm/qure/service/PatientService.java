package com.ibm.qure.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.qure.exceptions.ApplicationException;
import com.ibm.qure.model.Patient;
import com.ibm.qure.repository.PatientRepository;



@Service
public class PatientService {
	@Autowired
	PatientRepository patientRepo;

	public PatientService() {
	}

	public boolean create(Patient patient) throws ApplicationException {
		try {
			patientRepo.save(patient);
			return true;
		} catch (Exception e) {
			throw new ApplicationException("Server Error. Please try after sometime. Cause: " + e.getMessage(), e);
		}
	}

	public Patient get(String id) {
		return patientRepo.findById(id).get();
	}

	public List<Patient> getAll() {
		return patientRepo.findAll();
	}

	public boolean update(Patient patient) {
		patientRepo.save(patient);
		return true;
	}

	public boolean delete(String id) {
		patientRepo.deleteById(id);
		return true;
	}
	

}
