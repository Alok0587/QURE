package com.ibm.qure;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class QureServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(QureServiceApplication.class, args);
		System.out.println("Up and running!!!");
	}

}
