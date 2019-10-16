package com.ibm.qure.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.ibm.qure.model.Doctor;

public interface DoctorRepository extends MongoRepository<Doctor, Object> {
	

}