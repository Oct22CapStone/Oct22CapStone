package com.mtumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.mtumer.email.EmailService;

@SpringBootApplication
public class BackendApplication{

	
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	
	/*   @Override
	    public void run(String... args) throws Exception {
	        
	        service.sendEMail("1@gmail.com", "Test email", "Welcome to the springboot email");
	         
	        
	    }*/

}
