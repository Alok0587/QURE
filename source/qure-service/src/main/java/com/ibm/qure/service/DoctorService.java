package com.ibm.qure.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ibm.qure.exceptions.ApplicationException;
import com.ibm.qure.model.Doctor;
import com.ibm.qure.repository.DoctorRepository;

@Service
public class DoctorService {

	@Autowired
	DoctorRepository docRepo;

	public DoctorService() {
	}

	public boolean create(Doctor doctor) throws ApplicationException {
		try {
			docRepo.save(doctor);
			return true;
		} catch (Exception e) {
			throw new ApplicationException("Server Error. Please try after sometime. Cause: " + e.getMessage(), e);
		}
	}

	public Doctor get(String id) {
		return docRepo.findById(id).get();
	}

	public List<Doctor> getByLocation(Optional<String> city) {
		// TODO Auto-generated method stub
		return docRepo.findByAddress_City(city);
	}
	
	public List<Doctor>getBySpecialization(Optional<String> specialization){
		return docRepo.findBySpecialization(specialization);
	}
	public List<Doctor> getByCityAndSpecialization(Optional<String> city,Optional<String> specialization) {
		// TODO Auto-generated method stub
		return docRepo.findBySpecializationAndAddress_City(city,specialization);
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
