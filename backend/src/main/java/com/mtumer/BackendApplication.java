package com.mtumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//import com.mtumer.email.EmailService;

@SpringBootApplication
public class BackendApplication //implements CommandLineRunner {
//	@Autowired
//	private EmailService service;
{

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
		System.out.println("the program is ready");
	}
	
//	@Override
//	public void run(String... args) throws Exception {
//		service.sendEMail("Kenzie","userman@yahoo.com", "Welcome", "Thank you for registering.");
//	}

}