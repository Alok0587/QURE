package com.ibm.qure;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ibm.qure.service.DoctorService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class QureServiceApplication {
	private static Logger log = LoggerFactory.getLogger(QureServiceApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(QureServiceApplication.class, args);
		log.debug("Up and running!!!");
	}

}
