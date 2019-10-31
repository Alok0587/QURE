package com.ibm.qure.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ibm.qure.model.BookMedicine;

public interface BookMedicineRepository extends MongoRepository<BookMedicine, String> {

}
