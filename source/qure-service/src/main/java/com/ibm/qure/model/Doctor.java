package com.ibm.qure.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Doctor extends Person {

	@Id
	private String doctorId;

	private String licenseNumber;

	private int approvalStatus = 0;

	private ArrayList<String> specialization;

	private List<Appointment> appointmentList;

	private List<Patient> patientList;

	public Doctor() {
		// default constructor
	}

	public Doctor(String name,  String email, Date dateOfBirth, String gender, String phone,
			int userLevel, Address address, String licenseNumber, ArrayList<String> specialization) {
		super(name, email, dateOfBirth, gender, phone, address);
		this.licenseNumber = licenseNumber;
		this.specialization = specialization;
		this.appointmentList = new ArrayList<Appointment>();
		this.patientList = new ArrayList<Patient>();
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

	public ArrayList<String> getSpecialization() {
		return specialization;
	}

	public void setSpecialization(ArrayList<String> specialization) {
		this.specialization = specialization;
	}

	public List<Appointment> getAppointmentList() {
		return appointmentList;
	}

	public void setAppointmentList(List<Appointment> appointmentList) {
		this.appointmentList = appointmentList;
	}

	public int getApprovalStatus() {
		return approvalStatus;
	}

	public void setApprovalStatus(int approvalStatus) {
		this.approvalStatus = approvalStatus;
	}

	public List<Patient> getPatientList() {
		return patientList;
	}

	public void setPatientList(List<Patient> patientList) {
		this.patientList = patientList;
	}

}
