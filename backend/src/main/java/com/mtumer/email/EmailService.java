//package com.mtumer.email;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessagePreparator;
//import org.springframework.stereotype.Service;
//
//
//
//@Service("emailService")
//public class EmailService {
//	@Autowired
//    private JavaMailSender jms;
//    
//    @Autowired
//    private SimpleMailMessage smm;
//    
//    public void sendEMail(String to, String subject,String body) {
//        smm =new SimpleMailMessage();
//         
//        smm.setTo(to);
//         
//        smm.setSubject(subject);
//        smm.setText(body);
//        jms.send(smm);
//        
//    }
//}