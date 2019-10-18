package com.ibm.qure.model;

import java.util.Date;

public abstract class Person {

	private String name;
	private String email;
	private Date dateOfBirth;
	private String gender;
	private String phone;
	private Address address;
	private int userLevel=2;

	public Person() {
		// default constructor
	}

	public Person(String name, String email, Date dateOfBirth, String gender, String phone, Address address) {
		this.setName(name);
		this.email = email;
		this.dateOfBirth = dateOfBirth;
		this.gender = gender;
		this.phone = phone;
		this.address = address;
	}

	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public int getUserLevel() {
		return userLevel;
	}

	public void setUserLevel(int userLevel) {
		this.userLevel = userLevel;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
