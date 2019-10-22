package com.ibm.qure.model;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Admin {

	@Id
	int adminId;
	private String adminName;
	private String adminMob;
	private String adminEmail;
	private int userLevel = 0;



	public Admin() {

	}

	public Admin(int adminId, String adminName, String adminMob, String adminEmail) {
		super();
		this.adminId = adminId;
		this.adminName = adminName;
		this.adminMob = adminMob;
		this.adminEmail = adminEmail;
		//this.doctorList = new ArrayList<Doctor>();
	}

	public int getUserLevel() {
		return userLevel;
	}

	public void setUserLevel(int userLevel) {
		this.userLevel = userLevel;
	}

	public int getAdminId() {
		return adminId;
	}

	public void setAdminId(int adminId) {
		this.adminId = adminId;
	}

	public String getAdminName() {
		return adminName;
	}

	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}

	public String getAdminMob() {
		return adminMob;
	}

	public void setAdminMob(String adminMob) {
		this.adminMob = adminMob;
	}

	public String getAdminEmail() {
		return adminEmail;
	}

	public void setAdminEmail(String adminEmail) {
		this.adminEmail = adminEmail;
	}

//	public List<Doctor> getDoctorList() {
//		return doctorList;
//	}
//
//	public void setDoctorList(List<Doctor> doctorList) {
//		this.doctorList = doctorList;
//	}

}
