package com.mtumer.controller;

import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import com.mtumer.entity.Users;
import com.mtumer.services.UsersService;

@SpringBootTest
@AutoConfigureMockMvc
public class UsersControllerTest {

	@Autowired
	private MockMvc mockMvc;
	
	@InjectMocks
	private UsersService service;
	
	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);
	}
	
	@Test
	public void testCreateUsers() throws Exception{
		Users user = new Users();
		user.setFirstName("Jonathan");
		
	}
}
