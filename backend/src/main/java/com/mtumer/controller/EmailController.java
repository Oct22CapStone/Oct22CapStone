package com.mtumer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mtumer.entity.EmailDetails;
import com.mtumer.services.EmailService;

@CrossOrigin(origins = {"https://vehiclevault.azurewebsites.net", "http://localhost:3000"})
@RestController
@RequestMapping("/email")
public class EmailController {
		
		@Autowired
		private EmailService emailService;
		
		//send a simple email
		@PostMapping("/send")
		public String
		sendMail(@RequestBody EmailDetails details) {
			String status = emailService.sendSimpleMail(details);
			
			return status;
	}
	
}