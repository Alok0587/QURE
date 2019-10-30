package com.ibm.qure.exceptions;

public class QureApplicationException  extends Exception{
	
	public QureApplicationException() {
		super();
	}
	
	public QureApplicationException(String message, Throwable e) {
		super(message, e);
	}

}
