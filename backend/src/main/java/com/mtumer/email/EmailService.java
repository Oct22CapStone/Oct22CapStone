package com.mtumer.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service("emailService")
public class EmailService {
  @Autowired
  private JavaMailSender jms;
  
  public void sendEMail(String from, String to, String subject,String body) {
      SimpleMailMessage mail=new SimpleMailMessage();
      mail.setFrom(from);
      mail.setTo(to);
      mail.setSubject(subject);
      mail.setText(body);
      jms.send(mail);
  }
}