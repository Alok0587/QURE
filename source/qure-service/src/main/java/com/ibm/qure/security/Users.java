package com.ibm.qure.security;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Users {

	String _id;
	String username;
	String password;

	String role;

	public Users(String name, String password, String _id, String role) {
		super();
		this.username = name;
		this.password = password;
		this._id = _id;
		this.role = role;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String name) {
		this.username = name;
	}

	public String getPassword() {
		return password;
	}

	public boolean setPassword(String password) {
		this.password = password;
		return true;
	}

	public Users() {
	}

	@Override
	public String toString() {
		return "Users [_id=" + _id + ", name=" + username + ", password=" + password + ", role=" + role + "]";
	}

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

}
