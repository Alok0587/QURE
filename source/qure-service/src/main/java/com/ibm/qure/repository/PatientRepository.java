package com.ibm.qure.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ibm.qure.model.Patient;

public interface PatientRepository extends MongoRepository<Patient, Object> {

	Patient findByEmail(String id);

}
