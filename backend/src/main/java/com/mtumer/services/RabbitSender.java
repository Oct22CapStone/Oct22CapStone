package com.mtumer.services;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.mtumer.entity.Product;

@Service
public class RabbitSender {
	
	@Autowired
	private AmqpTemplate rt;
	
	@Value("${saran.rabbitmq.exchange}")
	private String exchange;
	
	@Value("${saran.rabbitmq.routingkey}")
	private String routingkey;
	
	public void send(Product prd) {
		rt.convertAndSend(exchange, routingkey,prd);
		System.out.println("Send message " +prd);
	}

}
