package com.ibm.qure.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.qure.model.Doctor;
import com.ibm.qure.repository.DoctorRepository;

@Service
public class AdminService {

	@Autowired
	DoctorRepository docRepo;

	public List<Doctor> getAll() {
		return docRepo.findAll();
	}

	public boolean delete(String id) {
		docRepo.deleteById(id);
		return true;
	}

}
