package com.ibm.qure.model;

import javax.xml.bind.annotation.XmlRootElement;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import java.util.Date;


@Document
@XmlRootElement
public class Appointment {
	
	@Id
	private String id;
    private int appointmentStartTime;
    private int appointmentEndTime;
    private String nameOfDoctor;
    private int price;
    private Date appointDate;
    
    public Appointment()
    {
    	
    }
    
    public Appointment(String id, int appointmentStartTime,int appointmentEndTime,String nameOfDoctor,int price,Date appointDate)
    
    {
    	this.id = id;
    	this.appointmentStartTime = appointmentStartTime;
    	this.appointmentEndTime = appointmentEndTime;
    	this.nameOfDoctor = nameOfDoctor;
    	this.price = price;
    	this.setAppointDate(appointDate);
    	
    
    }
    
    
	public String getId() {
		return id;
	}
	public void setId(String id2) {
		this.id = id2;
	}
	
	public int getAppointmentStartTime() {
		return appointmentStartTime;
	}

	public void setAppointmentStartTime(int appointmentStartTime) {
		this.appointmentStartTime = appointmentStartTime;
	}

	public int getAppointmentEndTime() {
		return appointmentEndTime;
	}

	public void setAppointmentEndTime(int appointmentEndTime) {
		this.appointmentEndTime = appointmentEndTime;
	}

	public String getNameOfDoctor() {
		return nameOfDoctor;
	}
	public void setNameOfDoctor(String nameOfDoctor) {
		this.nameOfDoctor = nameOfDoctor;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}

	public Date getAppointDate() {
		return appointDate;
	}

	public void setAppointDate(Date appointDate) {
		this.appointDate = appointDate;
	}
}
