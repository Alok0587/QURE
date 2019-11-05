package com.ibm.qure.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.qure.exceptions.QureApplicationException;
import com.ibm.qure.model.Doctor;
import com.ibm.qure.repository.DoctorRepository;

@Service
public class DoctorService {
	private static Logger log = LoggerFactory.getLogger(DoctorService.class);
	@Autowired
	DoctorRepository docRepo;

	public DoctorService() {
	}

	public boolean create(Doctor doctor) throws QureApplicationException {
		try {
			docRepo.save(doctor);
			return true;
		} catch (Exception e) {
			throw new QureApplicationException("Server Error. Please try after sometime. Cause: " + e.getMessage(), e);
		}
	}

	public Doctor get(String email) {
		return docRepo.findByEmail(email);
	}

	public Doctor getById(String id) {
		return docRepo.findByDoctorId(id);
	}

	public List<Doctor> getByLocation(Optional<String> city) {
		// TODO Auto-generated method stub
		return docRepo.findByAddress_City(city);
	}

	public List<Doctor> getBySpecialization(Optional<String> specialization) {
		return docRepo.findBySpecialization(specialization);
	}

	public List<Doctor> getByCityAndSpecialization(Optional<String> city, Optional<String> specialization) {
		// TODO Auto-generated method stub
		log.debug("inside city and spec");
		return docRepo.findBySpecializationAndAddress_City(specialization, city);
	}

	public List<Doctor> getAll() {
		return docRepo.findAll();
	}

	public boolean update(Doctor doctor) {
		docRepo.save(doctor);
		return true;
	}

	public boolean delete(String id) {
		docRepo.deleteById(id);
		return true;
	}

}
