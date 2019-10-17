package com.ibm.qure.model;

public class Address {

	private String buildingName;

	private String street;

	private String city;

	private String state;

	private String pincode;

	public Address() {
		// default constructor
	}

	public Address(String buildingName, String street, String city, String state, String pincode) {
		super();
		this.buildingName = buildingName;
		this.street = street;
		this.city = city;
		this.state = state;
		this.pincode = pincode;
	}

	public String getBuildingName() {
		return buildingName;
	}

	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

}
