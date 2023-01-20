package com.mtumer;

import org.springframework.beans.factory.annotation.Autowired;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//
//import com.mtumer.email.EmailService;

@SpringBootApplication
@EnableSwagger2
public class BackendApplication{

	
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
		System.out.println("the program is ready");
	}
	
	/*   @Override
	    public void run(String... args) throws Exception {
	        
	        service.sendEMail("1@gmail.com", "Test email", "Welcome to the springboot email");
	         
	        
	    }*/

}
