package com.mtumer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.mtumer.entity.EmailDetails;


@Service
public class EmailServiceImpl implements EmailService {
	
	@Autowired 
	private JavaMailSender javaMailSender;
	
	@Value("${spring.mail.username}") private String sender;
	
	//send a simple email
	public String sendSimpleMail(EmailDetails details)
	{
		try {
			//create simple message
			SimpleMailMessage mailMessage = new SimpleMailMessage();
			
			//set up details
			mailMessage.setFrom(sender);;
			mailMessage.setTo(details.getRecipient());
			mailMessage.setText(details.getMsgBody());
			mailMessage.setSubject(details.getSubject());
			
			//send the mail
			javaMailSender.send(mailMessage);
			return "Mail sent successfully...";
			
		}
		
		//catch block
		catch (Exception e) {
			return "error while sending mail";
		}
	}
}