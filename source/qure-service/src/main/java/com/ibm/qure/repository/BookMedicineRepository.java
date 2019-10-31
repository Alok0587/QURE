package com.ibm.qure.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ibm.qure.model.BookMedicine;


public interface BookMedicineRepository extends MongoRepository<BookMedicine, String>{
	
	List<BookMedicine> findByPatientId(Optional<String> patientId);

}
