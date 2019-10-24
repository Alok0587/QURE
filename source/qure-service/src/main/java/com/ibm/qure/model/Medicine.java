package com.ibm.qure.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Medicine {
	
	@Id
	private String medicineId;
	private String name;
	private String quantity;
	private int price;
	
	public Medicine(String medicineId, String name, String quantity, int price) {
		super();
		this.medicineId = medicineId;
		this.name = name;
		this.quantity = quantity;
		this.price = price;
	}
	
	public String getMedicineId() {
		return medicineId;
	}

	public void setMedicineId(String medicineId) {
		this.medicineId = medicineId;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	
	

}