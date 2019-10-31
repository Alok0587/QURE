package com.ibm.qure.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.qure.model.Appointment;
import com.ibm.qure.repository.AppointmentRepository;

@Service
public class AppointmentService {

	@Autowired
	AppointmentRepository appointRepo;

	public AppointmentService() {
		// TODO Auto-generated constructor stub
	}

	public boolean create(Appointment appointment) {
		appointRepo.save(appointment);
		return true;
	}

	public Appointment get(String id) {
		return appointRepo.findById(id).get();
	}

	public List<Appointment> appointmentSlot(Optional<String> slot, Optional<String> dId) {
		return appointRepo.findAllByTimeAndDoctorId(slot, dId);
	}

	public List<Appointment> getAll() {
		return appointRepo.findAll();
	}

	public boolean update(Appointment appointment) {
		appointRepo.save(appointment);
		return true;
	}

	public boolean delete(String id) {
		appointRepo.deleteById(id);
		return true;
	}

	public List<Appointment> doctorsAppointmentList(Optional<String> dId) {
		return appointRepo.findAllByDoctorId(dId);
	}

	public List<Appointment> patientsAppointmentList(Optional<String> pId) {
		return appointRepo.findAllByPatientId(pId);
	}

}
