/*package com.mtumer.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mtumer.email.EmailConfig;

@RestController
public class EmailController {
	
	@Autowired
	private JavaMailSender mailSender;
	
	
	public String RegisteredEmail() {
		return "Welcome to my ecommerce site! You have registered succesfully."
				+ "Now you can proceed in the site";
	}
	
	
	@PostMapping("/sendemail")
	public String sendEmail(@RequestBody MailRequest request) {
		sendSimpleEmail(request.getFrom(),request.getBody(), request.getSubject());
		return "Email sent successfully";
	}
	
	 private void sendSimpleEmail(String fromEmail, String body, String subject)
	    {
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setFrom("test1@gmail.com");
	        message.setTo("test1@gmail.com");
	        message.setSubject(subject);
	        message.setText(body);
	        mailSender.send(message);
	        System.out.println("Mail Sent Successfully..!!");
	    }
}*/
