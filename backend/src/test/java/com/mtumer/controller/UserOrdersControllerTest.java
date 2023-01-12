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
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mtumer.entity.UserOrders;
import com.mtumer.repo.UserOrdersRepo;
import com.mtumer.services.UserOrdersService;

@AutoConfigureMockMvc
@SpringBootTest
public class UserOrdersControllerTest {
	@Autowired
	private MockMvc mockMvc;
	
	@Mock
	UserOrdersRepo repo;

	@MockBean
	UserOrdersService service;

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
	@DisplayName("GET /user_orders success")
	void testGetUserOrdersPageSuccess() throws Exception {
		UserOrders UserOrders1 = new UserOrders();
		UserOrders1.setOrderId(1l);
		UserOrders1.setTrackingInfo("Pending");
		UserOrders1.setTotalPrice(134.70);

		UserOrders UserOrders2 = new UserOrders();
		UserOrders2.setOrderId(2l);
		UserOrders2.setTrackingInfo("Pending");
		UserOrders2.setTotalPrice(87.95);

        doReturn(Lists.newArrayList(UserOrders1, UserOrders2)).when(service).getAllUserOrders();

		mockMvc.perform(get("/user_orders/all")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$[0].orderId", is(1)))
				.andExpect(jsonPath("$[0].trackingInfo", is("Pending")))
				.andExpect(jsonPath("$[0].totalPrice", is(134.70)))
				.andExpect(jsonPath("$[1].orderId", is(2)))
				.andExpect(jsonPath("$[1].trackingInfo", is("Pending")))
				.andExpect(jsonPath("$[1].totalPrice", is(87.95)));
	}

	@Test
	@DisplayName("GET /user_orders/orders/1")
	void testGetUserOrdersById() throws Exception {
		UserOrders UserOrders1 = new UserOrders();
		UserOrders1.setOrderId(1l);
		UserOrders1.setTrackingInfo("Pending");
		UserOrders1.setTotalPrice(134.70);
        doReturn(Optional.of(UserOrders1)).when(service).getUserOrdersById(1l);

		mockMvc.perform(get("/user_orders/orders/{id}", 1l)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.orderId", is(1)))
				.andExpect(jsonPath("$.trackingInfo", is("Pending")))
				.andExpect(jsonPath("$.totalPrice", is(134.70)));

	}

	@Test
	@DisplayName("GET /user_orders/orders/1 - Not Found")
	void testGetUserOrdersByIdNotFound() throws Exception {
        doReturn(Optional.empty()).when(service).getUserOrdersById(1l);
		mockMvc.perform(get("/UserOrders/orders/{id}", 1l)).andExpect(status().isNotFound());
	}

	@Test
	@DisplayName("POST /user_orders/save_user_orders")
	void testCreateUserOrders() throws Exception{
		UserOrders UserOrdersToPost = new UserOrders();
		UserOrdersToPost.setTrackingInfo("Pending");
		UserOrdersToPost.setTotalPrice(134.70);
		
		UserOrders UserOrdersToReturn = new UserOrders();
		UserOrdersToReturn.setOrderId(1l);
		UserOrdersToReturn.setTrackingInfo("Pending");
		UserOrdersToReturn.setTotalPrice(134.70);
		when(service.createUserOrders(any())).thenReturn(UserOrdersToReturn);
		
		mockMvc.perform(post("/user_orders/save_user_orders")
			.content(asJsonString(UserOrdersToPost))
			.contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isCreated())
			.andExpect(content().contentType(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$.orderId", is(1)))
			.andExpect(jsonPath("$.trackingInfo", is("Pending")))
			.andExpect(jsonPath("$.totalPrice", is(134.70)));
	}
	
	@Test
    @DisplayName("PUT /user_orders/update/1")
	void testUpdateUserOrders() throws Exception{
		UserOrders UserOrdersToPut = new UserOrders();
		UserOrdersToPut.setOrderId(1l);
		UserOrdersToPut.setTrackingInfo("Pending");
		UserOrdersToPut.setTotalPrice(134.70);
		
		UserOrders UserOrdersToReturnFindBy = new UserOrders();
		UserOrdersToReturnFindBy.setTrackingInfo("Pending");
		UserOrdersToReturnFindBy.setTotalPrice(134.70);
		service.createUserOrders(UserOrdersToReturnFindBy);
		
		UserOrders UserOrdersToReturnSave = new UserOrders();
		UserOrdersToReturnSave.setTrackingInfo("Pending");
		UserOrdersToReturnSave.setTotalPrice(134.70);
		
		when(service.getUserOrdersById(1l)).thenReturn(Optional.of(UserOrdersToReturnFindBy));
		when(service.createUserOrders(any())).thenReturn(UserOrdersToReturnSave);

		 mockMvc.perform(put("/user_orders/update/{order_id}", 1l)
	        .contentType(MediaType.APPLICATION_JSON)
	        .content(asJsonString(UserOrdersToPut)))
		 	.andExpect(status().isOk())
		 	.andExpect(content().contentType(MediaType.APPLICATION_JSON))
		 	.andExpect(jsonPath("$.orderId", is(1)))
			.andExpect(jsonPath("$.trackingInfo", is("Pending")))
			.andExpect(jsonPath("$.totalPrice", is(134.70)));
	}
	
}
