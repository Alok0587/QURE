package com.ibm.qure.model;

import java.util.List;
import javax.xml.bind.annotation.XmlRootElement;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document
@XmlRootElement
public class Admin {

	@Id
	int adminId;
	String adminName;
	String adminMob;
	String adminEmail;
	
	List<Doctor>doctorList;

	public Admin(int adminId, String adminName, String adminMob, String adminEmail, List<Doctor> doctorList) {
		super();
		this.adminId = adminId;
		this.adminName = adminName;
		this.adminMob = adminMob;
		this.adminEmail = adminEmail;
		this.doctorList = doctorList;
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

	public List<Doctor> getDoctorList() {
		return doctorList;
	}

	public void setDoctorList(List<Doctor> doctorList) {
		this.doctorList = doctorList;
	}
	
	
	
}

