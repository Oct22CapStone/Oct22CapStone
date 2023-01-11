package com.mtumer.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Optional;

import org.assertj.core.util.Lists;

import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.junit.jupiter.api.*;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mtumer.entity.Users;
import com.mtumer.repo.UserRepo;
import com.mtumer.services.UsersService;
import static org.hamcrest.CoreMatchers.*;

@AutoConfigureMockMvc
@SpringBootTest
public class UsersControllerTest {
	
	@Mock
	UserRepo repo;

	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private UsersService service;
	
	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);
	}
	
	static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    } 
	
	@Test
	@DisplayName("GET /userpage/show success")
	void testGetuserpageSuccess() throws Exception {
		Users users1 = new Users();
		users1.setUserId(1l);
		users1.setUsername("jsmith");
		users1.setFirstName("John");
		users1.setLastName("Smith");
		users1.setEmail("jsmith@gmail.com");
		users1.setPhone("1234567890");
		users1.setPassword("js1234");

		Users users2 = new Users();
		users2.setUserId(2l);
		users2.setUsername("Bobc");
		users2.setFirstName("Bob");
		users2.setLastName("Clarke");
		users2.setEmail("bclarke@gmail.com");
		users2.setPhone("0987654321");
		users2.setPassword("bc1234");

        doReturn(Lists.newArrayList(users1, users2)).when(service).getAllUsers();

		mockMvc.perform(get("/userpage/show")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$[0].userId", is(1))).andExpect(jsonPath("$[0].username", is("jsmith")))				
				.andExpect(jsonPath("$[0].firstName", is("John"))).andExpect(jsonPath("$[0].lastName", is("Smith")))
				.andExpect(jsonPath("$[0].email", is("jsmith@gmail.com"))).andExpect(jsonPath("$[0].phone", is("1234567890")))
				.andExpect(jsonPath("$[0].password", is("js1234")))
				
				.andExpect(jsonPath("$[1].userId", is(2))).andExpect(jsonPath("$[1].username", is("Bobc")))
				.andExpect(jsonPath("$[1].firstName", is("Bob"))).andExpect(jsonPath("$[1].lastName", is("Clarke")))
				.andExpect(jsonPath("$[1].email", is("bclarke@gmail.com"))).andExpect(jsonPath("$[1].phone", is("0987654321")))
				.andExpect(jsonPath("$[1].password", is("bc1234")));
	}

	@Test
	@DisplayName("GET /userpage/show/1")
	void testGetUsersById() throws Exception {
		Users users1 = new Users();
		users1.setUserId(1l);
		users1.setUsername("jsmith");
		users1.setFirstName("John");
		users1.setLastName("Smith");
		users1.setEmail("jsmith@gmail.com");
		users1.setPhone("1234567890");
		users1.setPassword("js1234");
        doReturn(Optional.of(users1)).when(service).getUserById(1l);

		mockMvc.perform(get("/userpage/show/{id}", 1l)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.userId", is(1))).andExpect(jsonPath("$.username", is("jsmith")))				
				.andExpect(jsonPath("$.firstName", is("John"))).andExpect(jsonPath("$.lastName", is("Smith")))
				.andExpect(jsonPath("$.email", is("jsmith@gmail.com"))).andExpect(jsonPath("$.phone", is("1234567890")))
				.andExpect(jsonPath("$.password", is("js1234")));

	}

	@Test
	@DisplayName("GET /userpage/show/1 - Not Found")
	void testGetUsersByIdNotFound() throws Exception {
        doReturn(Optional.empty()).when(service).getUserById(1l);
		mockMvc.perform(get("/userpage/show/{id}", 1l)).andExpect(status().isNotFound());
	}

	@Test
	@DisplayName("POST /userpage/save")
	void testCreateUsers() throws Exception{
		Users userToPost = new Users();
		userToPost.setUsername("jsmith");
		userToPost.setFirstName("John");
		userToPost.setLastName("Smith");
		userToPost.setEmail("jsmith@gmail.com");
		userToPost.setPhone("1234567890");
		userToPost.setPassword("js1234");
		
		Users userToReturn = new Users();
		userToReturn.setUserId(1l);
		userToReturn.setUsername("jsmith");
		userToReturn.setFirstName("John");
		userToReturn.setLastName("Smith");
		userToReturn.setEmail("jsmith@gmail.com");
		userToReturn.setPhone("1234567890");
		userToReturn.setPassword("js1234");
		when(service.createUser(any())).thenReturn(userToReturn);
		
		mockMvc.perform(post("/userpage/save")
			.content(asJsonString(userToPost))
			.contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isCreated())
			.andExpect(content().contentType(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$.userId", is(1))).andExpect(jsonPath("$.username", is("jsmith")))				
			.andExpect(jsonPath("$.firstName", is("John"))).andExpect(jsonPath("$.lastName", is("Smith")))
			.andExpect(jsonPath("$.email", is("jsmith@gmail.com"))).andExpect(jsonPath("$.phone", is("1234567890")))
			.andExpect(jsonPath("$.password", is("js1234")));
	}
	
	@Test
    @DisplayName("PUT /userpage/update/1")
	void testUpdateUsers() throws Exception{
		Users userToPut = new Users();
		userToPut.setUserId(1l);
		userToPut.setUsername("jsmith");
		userToPut.setFirstName("John");
		userToPut.setLastName("Smith");
		userToPut.setEmail("jsmith@gmail.com");
		userToPut.setPhone("1234567890");
		userToPut.setPassword("js1234");
		
		Users userToReturnFindBy = new Users();
		userToReturnFindBy.setUsername("jsmith");
		userToReturnFindBy.setFirstName("John");
		userToReturnFindBy.setLastName("Smith");
		userToReturnFindBy.setEmail("jsmith@gmail.com");
		userToReturnFindBy.setPhone("1234567890");
		userToReturnFindBy.setPassword("js1234");
		service.createUser(userToReturnFindBy);
		
		Users userToReturnSave = new Users();
		userToReturnSave.setUsername("jsmith");
		userToReturnSave.setFirstName("John");
		userToReturnSave.setLastName("Smith");
		userToReturnSave.setEmail("jsmith@gmail.com");
		userToReturnSave.setPhone("1234567890");
		userToReturnSave.setPassword("js1234");
		
		when(service.getUserById(1l)).thenReturn(Optional.of(userToReturnFindBy));
		when(service.createUser(any())).thenReturn(userToReturnSave);

		 mockMvc.perform(put("/userpage/update/{user_id}", 1l)
	        .contentType(MediaType.APPLICATION_JSON)
	        .content(asJsonString(userToPut)))
		 	.andExpect(status().isOk())
		 	.andExpect(content().contentType(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$.userId", is(1))).andExpect(jsonPath("$.username", is("jsmith")))				
			.andExpect(jsonPath("$.firstName", is("John"))).andExpect(jsonPath("$.lastName", is("Smith")))
			.andExpect(jsonPath("$.email", is("jsmith@gmail.com"))).andExpect(jsonPath("$.phone", is("1234567890")))
			.andExpect(jsonPath("$.password", is("js1234")));
	}
	
	
}
