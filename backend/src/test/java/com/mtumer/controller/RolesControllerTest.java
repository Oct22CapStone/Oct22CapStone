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
import com.mtumer.entity.Roles;
import com.mtumer.services.RoleService;

@AutoConfigureMockMvc
@SpringBootTest
public class RolesControllerTest {
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	RoleService service;
	
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
	@DisplayName("GET /roles/show success")
	void testGetRolesSuccess() throws Exception {
		Roles role1 = new Roles();
		role1.setRoleId(1);
		role1.setRoleName("Admin");
		
		Roles role2 = new Roles();
		role2.setRoleId(2);
		role2.setRoleName("Customer");

        doReturn(Lists.newArrayList(role1, role2)).when(service).getAllRoles();

		mockMvc.perform(get("/roles/show")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$[0].roleId", is(1)))
				.andExpect(jsonPath("$[0].roleName", is("Admin")))
				.andExpect(jsonPath("$[1].roleId", is(2)))
				.andExpect(jsonPath("$[1].roleName", is("Customer")));

	}

	@Test
	@DisplayName("GET /roles/show/1")
	void testGetRolesById() throws Exception {
		Roles role1 = new Roles();
		role1.setRoleId(1);
		role1.setRoleName("Admin");
        doReturn(Optional.of(role1)).when(service).getRoleById(1);

		mockMvc.perform(get("/roles/show/{id}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.roleId", is(1)))
				.andExpect(jsonPath("$.roleName", is("Admin")));

	}

	@Test
	@DisplayName("GET /roles/show/1 - Not Found")
	void testGetRolesByIdNotFound() throws Exception {
        doReturn(Optional.empty()).when(service).getRoleById(1);
		mockMvc.perform(get("/roles/show/{id}", 1)).andExpect(status().isNotFound());
	}

	@Test
	@DisplayName("POST /roles/save")
	void testCreateRoles() throws Exception{
		Roles roleToPost = new Roles();
		roleToPost.setRoleName("Admin");
		
		Roles rolesToReturn = new Roles();
		rolesToReturn.setRoleId(1);
		rolesToReturn.setRoleName("Admin");
		when(service.createRole(any())).thenReturn(rolesToReturn);
		
		mockMvc.perform(post("/roles/save")
			.content(asJsonString(roleToPost))
			.contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isCreated())
			.andExpect(content().contentType(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$.roleId", is(1)))
			.andExpect(jsonPath("$.roleName", is("Admin")));
	}
	
	@Test
    @DisplayName("PUT /roles/update/1")
	void testUpdateRoles() throws Exception{
		Roles rolesToPut = new Roles();
		rolesToPut.setRoleId(1);
		rolesToPut.setRoleName("Admin");
		
		Roles rolesToReturnFindBy = new Roles();
		rolesToReturnFindBy.setRoleName("Admin");
		
		Roles rolesToReturnSave = new Roles();
		rolesToReturnSave.setRoleName("Admin");
		
		when(service.getRoleById(1)).thenReturn(Optional.of(rolesToReturnFindBy));
		when(service.createRole(any())).thenReturn(rolesToReturnSave);

		 mockMvc.perform(put("/roles/update/{roleId}", 1)
	        .contentType(MediaType.APPLICATION_JSON)
	        .content(asJsonString(rolesToPut)))
		 	.andExpect(status().isOk())
		 	.andExpect(content().contentType(MediaType.APPLICATION_JSON))
		 	.andExpect(jsonPath("$.roleId", is(1)))
			.andExpect(jsonPath("$.roleName", is("Admin")));
	}
	
}
