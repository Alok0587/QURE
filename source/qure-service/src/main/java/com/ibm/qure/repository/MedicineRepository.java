package com.ibm.qure.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ibm.qure.model.Medicine;

public interface MedicineRepository extends MongoRepository<Medicine, Object> {

}
