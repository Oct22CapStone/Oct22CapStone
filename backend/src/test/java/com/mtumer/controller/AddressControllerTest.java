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
import com.mtumer.entity.Address;
import com.mtumer.repo.AddressRepo;
import com.mtumer.services.AddressService;
import static org.hamcrest.CoreMatchers.*;

@AutoConfigureMockMvc
@SpringBootTest
public class AddressControllerTest {

	@Autowired
	private MockMvc mockMvc;
	
	@Mock
	AddressRepo repo;

	@MockBean
	AddressService service;

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
	@DisplayName("GET /addresspage success")
	void testGetAddressPageSuccess() throws Exception {
		Address address1 = new Address();
		address1.setAddressId(1l);
		address1.setStreet("12 Main Street");
		address1.setCity("Nashville");
		address1.setState("TN");
		address1.setCountry("USA");
		address1.setZip("55842");

		Address address2 = new Address();
		address2.setAddressId(2l);
		address2.setStreet("13 South Street");
		address2.setCity("New York");
		address2.setState("NY");
		address2.setCountry("USA");
		address2.setZip("84723");

        doReturn(Lists.newArrayList(address1, address2)).when(service).getAllAddress();

		mockMvc.perform(get("/addresspage")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$[0].addressId", is(1))).andExpect(jsonPath("$[0].street", is("12 Main Street")))
				.andExpect(jsonPath("$[0].city", is("Nashville"))).andExpect(jsonPath("$[0].state", is("TN")))
				.andExpect(jsonPath("$[0].country", is("USA"))).andExpect(jsonPath("$[0].zip", is("55842")))
				.andExpect(jsonPath("$[1].addressId", is(2))).andExpect(jsonPath("$[1].street", is("13 South Street")))
				.andExpect(jsonPath("$[1].city", is("New York"))).andExpect(jsonPath("$[1].state", is("NY")))
				.andExpect(jsonPath("$[1].country", is("USA"))).andExpect(jsonPath("$[1].zip", is("84723")));
	}

	@Test
	@DisplayName("GET /addresspage/showaddress/1")
	void testGetAddressById() throws Exception {
		Address address1 = new Address();
		address1.setAddressId(1l);
		address1.setStreet("12 Main Street");
		address1.setCity("Nashville");
		address1.setState("TN");
		address1.setCountry("USA");
		address1.setZip("45842");
        doReturn(Optional.of(address1)).when(service).getAddressById(1l);

		mockMvc.perform(get("/addresspage/showaddress/{id}", 1l)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.addressId", is(1)))
				.andExpect(jsonPath("$.street", is("12 Main Street")))
				.andExpect(jsonPath("$.city", is("Nashville")))
				.andExpect(jsonPath("$.state", is("TN")))
				.andExpect(jsonPath("$.country", is("USA")))
				.andExpect(jsonPath("$.zip", is("45842")));

	}

	@Test
	@DisplayName("GET /addresspage/showaddress/1 - Not Found")
	void testGetAddressByIdNotFound() throws Exception {
        doReturn(Optional.empty()).when(service).getAddressById(1l);
		mockMvc.perform(get("/addresspage/showaddress/{id}", 1l)).andExpect(status().isNotFound());
	}

	@Test
	@DisplayName("POST /addresspage/save_address")
	void testCreateAddress() throws Exception{
		Address addressToPost = new Address();
		addressToPost.setStreet("12 Main Street");
		addressToPost.setCity("Nashville");
		addressToPost.setState("TN");
		addressToPost.setCountry("USA");
		addressToPost.setZip("45842");
		
		Address addressToReturn = new Address();
		addressToReturn.setAddressId(1l);
		addressToReturn.setStreet("12 Main Street");
		addressToReturn.setCity("Nashville");
		addressToReturn.setState("TN");
		addressToReturn.setCountry("USA");
		addressToReturn.setZip("45842");
		when(service.createAddress(any())).thenReturn(addressToReturn);
		
		mockMvc.perform(post("/addresspage/save_address")
			.content(asJsonString(addressToPost))
			.contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isCreated())
			.andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.addressId", is(1)))
			.andExpect(jsonPath("$.street", is("12 Main Street")))
			.andExpect(jsonPath("$.city", is("Nashville")))
			.andExpect(jsonPath("$.state", is("TN")))
			.andExpect(jsonPath("$.country", is("USA")))
			.andExpect(jsonPath("$.zip", is("45842")));
	}
	
	@Test
    @DisplayName("PUT /addresspage/updateAddress/1")
	void testUpdateAddress() throws Exception{
		Address addressToPut = new Address();
		addressToPut.setAddressId(1l);
		addressToPut.setStreet("12 Main Street");
		addressToPut.setCity("Nashville");
		addressToPut.setState("TN");
		addressToPut.setCountry("USA");
		addressToPut.setZip("45842");
		
		Address addressToReturnFindBy = new Address();
		addressToReturnFindBy.setStreet("12 Main Street");
		addressToReturnFindBy.setCity("Nashville");
		addressToReturnFindBy.setState("TN");
		addressToReturnFindBy.setCountry("USA");
		addressToReturnFindBy.setZip("45842");
		service.createAddress(addressToReturnFindBy);
		
		Address addressToReturnSave = new Address();
		addressToReturnSave.setStreet("12 Main Street");
		addressToReturnSave.setCity("Nashville");
		addressToReturnSave.setState("TN");
		addressToReturnSave.setCountry("USA");
		addressToReturnSave.setZip("45842");
		
		when(service.getAddressById(1l)).thenReturn(Optional.of(addressToReturnFindBy));
		when(service.createAddress(any())).thenReturn(addressToReturnSave);

		 mockMvc.perform(put("/addresspage/updateAddress/{id}", 1l)
	        .contentType(MediaType.APPLICATION_JSON)
	        .content(asJsonString(addressToPut)))
		 	.andExpect(status().isOk())
		 	.andExpect(content().contentType(MediaType.APPLICATION_JSON))
		 	.andExpect(jsonPath("$.addressId", is(1)))
			.andExpect(jsonPath("$.street", is("12 Main Street")))
			.andExpect(jsonPath("$.city", is("Nashville")))
			.andExpect(jsonPath("$.state", is("TN")))
			.andExpect(jsonPath("$.country", is("USA")))
			.andExpect(jsonPath("$.zip", is("45842")));
	}
	
	
}
