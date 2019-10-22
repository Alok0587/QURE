package com.ibm.qure.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Pharmacist {
	
	@Id
	private String pharmaId;
	private String name;
	private String email;
	private String contact;
	
	
	public String getPharmaId() {
		return pharmaId;
	}
	public void setPharmaId(String pharmaId) {
		this.pharmaId = pharmaId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	
	
	
	
	

}
