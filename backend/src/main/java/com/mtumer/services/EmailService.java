package com.mtumer.services;

import com.mtumer.entity.EmailDetails;


public interface EmailService {
	
	//method to send simple email
	String sendSimpleMail(EmailDetails details);
	
	//other emails methods can go here
}