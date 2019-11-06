package com.ibm.qure.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ibm.qure.model.Appointment;

public interface AppointmentRepository extends MongoRepository<Appointment, Object> {
	List<Appointment> findAllByPatientId(Optional<String> pId);

	List<Appointment> findAllByDoctorId(Optional<String> dId);

	List<Appointment> findAllByTimeAndDoctorId(Optional<String> slot, Optional<String> dId);

}