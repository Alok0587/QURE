package com.ibm.qure.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ibm.qure.model.Appointment;

public interface AppointmentRepository extends MongoRepository<Appointment, Object> {

}