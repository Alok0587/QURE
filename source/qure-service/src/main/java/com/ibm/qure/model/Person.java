package com.ibm.qure.model;

public abstract class Person {

	private String name;
	private String email;
	private String password;
	private int age;
	private String gender;
	private String phone;
	private Address address;

	public Person() {
		// default constructor
	}

	public Person(String name, String email, String password, int age, String gender, String phone, Address address) {
		this.setName(name);
		this.email = email;
		this.age = age;
		this.gender = gender;
		this.phone = phone;
		this.address = address;
		this.password = password;
	}

	public String getPassword() {
		return password;
	}

	public boolean setPassword(String password) {
		this.password = password;
		return true;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getage() {
		return age;
	}

	public void setage(int age) {
		this.age = age;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
