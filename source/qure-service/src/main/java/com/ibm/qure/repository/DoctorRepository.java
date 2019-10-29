package com.ibm.qure.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.ibm.qure.model.Doctor;
import com.ibm.qure.model.Patient;

public interface DoctorRepository extends MongoRepository<Doctor, Object> {
	List<Doctor> findByAddress_City(Optional<String> city);
	List<Doctor> findBySpecialization(Optional<String> specialization);
	//List<Doctor> findByAddress_CityAndSpecialization(String city,String specialization);
	@Query("{'doctor.specialization' : ?0, doctor.address.city : ?1}")
	List findBySpecializationAndAddress_City(Optional<String> city, Optional<String> specialization);
	
	Doctor findByEmail(String id);
	

}