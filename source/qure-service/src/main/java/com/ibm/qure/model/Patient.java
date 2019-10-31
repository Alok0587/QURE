package com.ibm.qure.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Patient extends Person {
	@Id
	private String patientId;

	private String medicineId;

	public Patient() {
		// default constructor
	}

	public Patient(String name, String email, String password, int age, String gender, String phone, Address address) {
		super(name, email, password, age, gender, phone, address);

	}

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}

	public String getMedicineId() {
		return medicineId;
	}

	public void setMedicineId(String medicineId) {
		this.medicineId = medicineId;
	}

}
