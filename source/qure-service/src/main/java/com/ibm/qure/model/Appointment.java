package com.ibm.qure.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
public class Appointment {

	@Id
	private String id;
	private int time;
	private int price;
	private String appointmentDate;
	private String patientId;
	private String doctorId;
	private int appointmetStatus=0;

	public Appointment() {

	}

	public Appointment(String id, int time, int price, String appointmentDate, String patientId, String doctorId) {
		super();
		this.id = id;
		this.time = time;
		this.price = price;
		this.appointmentDate = appointmentDate;
		this.patientId = patientId;
		this.doctorId = doctorId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getAppointmentDate() {
		return appointmentDate;
	}

	public void setAppointmentDate(String appointmentDate) {
		this.appointmentDate = appointmentDate;
	}

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}

	public String getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(String doctorId) {
		this.doctorId = doctorId;
	}

	public int getAppointmetStatus() {
		return appointmetStatus;
	}

	public void setAppointmetStatus(int appointmetStatus) {
		this.appointmetStatus = appointmetStatus;
	}
	

}
