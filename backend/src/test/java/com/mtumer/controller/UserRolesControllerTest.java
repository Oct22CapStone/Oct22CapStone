package com.mtumer.controller;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Optional;

import org.assertj.core.util.Lists;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mtumer.entity.UserRole;
import com.mtumer.services.UserRoleService;

@AutoConfigureMockMvc
@SpringBootTest
public class UserRolesControllerTest {

	private static final Object UserRoleToReturnFindBy = null;

	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	UserRoleService service;
	
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
	@DisplayName("GET /user_role/show success")
	void testGetUserRoleSuccess() throws Exception {
		UserRole userRole1 = new UserRole();
		userRole1.setUserRoleId(1l);
		

        doReturn(Lists.newArrayList(userRole1)).when(service).getAllUserRoles();

		mockMvc.perform(get("/user_role/show")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$[0].userRoleId", is(1)));

	}

	@Test
	@DisplayName("GET /user_role/show/1")
	void testGetUserRoleById() throws Exception {
		UserRole userRole1 = new UserRole();
		userRole1.setUserRoleId(1l);
        doReturn(Optional.of(userRole1)).when(service).getUserRoleById(1l);

		mockMvc.perform(get("/user_role/show/{id}", 1l)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.userRoleId", is(1)));

	}

	@Test
	@DisplayName("GET /user_role/show/1 - Not Found")
	void testGetUserRoleByIdNotFound() throws Exception {
        doReturn(Optional.empty()).when(service).getUserRoleById(1l);
		mockMvc.perform(get("/user_role/show/{id}", 1l)).andExpect(status().isNotFound());
	}

	@Test
	@DisplayName("POST /user_role/save")
	void testCreateUserRole() throws Exception{
		UserRole userRoleToPost = new UserRole();
		userRoleToPost.setUserRoleId(1l);
		
		UserRole userRoleToReturn = new UserRole();
		userRoleToReturn.setUserRoleId(1l);
		when(service.createUserRole(any())).thenReturn(userRoleToReturn);
		
		mockMvc.perform(post("/user_role/save")
			.content(asJsonString(userRoleToPost))
			.contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isCreated())
			.andExpect(content().contentType(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$.userRoleId", is(1)));
	}
	
	@Test
    @DisplayName("PUT /user_role/update/1")
	void testUpdateUserRole() throws Exception{
		UserRole userRoleToPut = new UserRole();
		userRoleToPut.setUserRoleId(1l);
		
		UserRole userRoleToReturnFindBy = new UserRole();
		userRoleToReturnFindBy.setUserRoleId(1l);
		
		UserRole userRoleToReturnSave = new UserRole();
		userRoleToReturnSave.setUserRoleId(1l);
		
		when(service.getUserRoleById(1l)).thenReturn(Optional.of(userRoleToReturnFindBy));
		when(service.createUserRole(any())).thenReturn(userRoleToReturnSave);

		 mockMvc.perform(put("/user_role/update/{user_role_id}", 1)
	        .contentType(MediaType.APPLICATION_JSON)
	        .content(asJsonString(userRoleToPut)))
		 	.andExpect(status().isOk())
		 	.andExpect(content().contentType(MediaType.APPLICATION_JSON))
		 	.andExpect(jsonPath("$.userRoleId", is(1)));
	}
	
}
