package com.ibm.qure.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class BookMedicine {
	
	@Id
	private String bookedId;
	
//	//@DBRef
//	private String patientId;
//	//private String doctorId;
	
	//@DBRef
	private String medicineId;
	private String medicineName;


	
	private String patientId;
	
	private String appointmentId;
	
	private String processingStatus ="Not delivered";
	
	public String getBookedId() {
		return bookedId;
	}
	public void setBookedId(String bookedId) {
		this.bookedId = bookedId;
	}
//	public String getPatientId() {
//		return patientId;
//	}
//	public void setPatientId(String patientId) {
//		this.patientId = patientId;
//	}
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
	public String getProcessingStatus() {
		return processingStatus;
	}
	public void setProcessingStatus(String processingStatus) {
		this.processingStatus = processingStatus;
	}
	public String getAppointmentId() {
		return appointmentId;
	}
	public void setAppointmentId(String appointmentId) {
		this.appointmentId = appointmentId;
	}
	public String getPatientId() {
		return patientId;
	}
	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
	public String getMedicineName() {
		return medicineName;
	}
	public void setMedicineName(String medicineName) {
		this.medicineName = medicineName;
	}
	
	
	

}
