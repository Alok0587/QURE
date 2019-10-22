package com.ibm.qure.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Patient extends Person {
	@Id
	private String patientId;
	
	//@DBRef
	private String appointmentId;
	
	//@DBRef
	private String medicineId;
	
	private int userLevl = 2;
	

//	private List<Appointment> appointmentList;

	public Patient() {
		// default constructor
	}

	public Patient(String name, String email, int age, String gender, String phone,Address address) {
		super(name, email, age, gender, phone, address);

//		this.appointmentList = new ArrayList<Appointment>();

	}

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}

//	public List<Appointment> getAppointmentList() {
//		return appointmentList;
//	}
//
//	public void setAppointmentList(List<Appointment> appointmentList) {
//		this.appointmentList = appointmentList;
//	}
}
