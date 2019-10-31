package com.ibm.qure.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ibm.qure.model.Pharmacist;

public interface PharmacistRepository extends MongoRepository<Pharmacist, Object> {

}
