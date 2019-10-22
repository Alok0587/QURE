package com.ibm.qure.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ibm.qure.model.Doctor;

public interface DoctorRepository extends MongoRepository<Doctor, Object> {
	List<Doctor> findByAddress_City(Optional<String> city);

}