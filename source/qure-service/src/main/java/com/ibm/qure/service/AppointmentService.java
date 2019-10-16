package com.ibm.qure.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.qure.model.Appointment;
import com.ibm.qure.repository.AppointmentRepository;

@Service
public class AppointmentService{
	
	@Autowired
	AppointmentRepository appointRepo;

	public  AppointmentService() {
		// TODO Auto-generated constructor stub
	}

	public boolean create(Appointment appointment)  {
		
			appointRepo.save(appointment);
			return true;
	
	}

	public Appointment get(String id) {
		return appointRepo.findById(id).get();
	}

	public List<Appointment> getAll() {
		return appointRepo.findAll();
	}

	public boolean update(Appointment patient) {
		appointRepo.save(patient);
		return true;
	}

	public boolean delete(String id) {
		appointRepo.deleteById(id);
		return true;
	}


}
