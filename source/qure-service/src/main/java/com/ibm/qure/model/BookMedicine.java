package com.ibm.qure.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class BookMedicine {
	
	@Id
	private String bookedId;
	
	//@DBRef
	private String patientId;
	//private String doctorId;
	
	//@DBRef
	private String medicineId;
	
	private int processingStatus =0;
	
	public String getBookedId() {
		return bookedId;
	}
	public void setBookedId(String bookedId) {
		this.bookedId = bookedId;
	}
	public String getPatientId() {
		return patientId;
	}
	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
//	public String getDoctorId() {
//		return doctorId;
//	}
//	public void setDoctorId(String doctorId) {
//		this.doctorId = doctorId;
//	}
	public String getMedicineId() {
		return medicineId;
	}
	public void setMedicineId(String medicineId) {
		this.medicineId = medicineId;
	}
	public int getProcessingStatus() {
		return processingStatus;
	}
	public void setProcessingStatus(int processingStatus) {
		this.processingStatus = processingStatus;
	}
	
	
	

}
