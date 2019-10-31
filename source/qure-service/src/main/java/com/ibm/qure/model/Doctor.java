package com.ibm.qure.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Doctor extends Person {

	@Id
	private String doctorId;

	private String licenseNumber;

	// private int approvalStatus = 0;

	private String specialization;

	public Doctor() {
		// default constructor
	}

	public Doctor(String name, String email, String password, int age, String gender, String phone, Address address,
			String licenseNumber, String specialization) {
		super(name, email, password, age, gender, phone, address);
		this.licenseNumber = licenseNumber;
		this.specialization = specialization;

	}

	public String getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(String doctorId) {
		this.doctorId = doctorId;
	}

	public String getLicenseNumber() {
		return licenseNumber;
	}

	public void setLicenseNumber(String licenseNumber) {
		this.licenseNumber = licenseNumber;
	}

	public String getSpecialization() {
		return specialization;
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}

}
