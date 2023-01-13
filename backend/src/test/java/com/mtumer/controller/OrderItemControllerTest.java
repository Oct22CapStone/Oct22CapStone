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
import com.mtumer.entity.OrderItem;
import com.mtumer.repo.OrderItemRepo;
import com.mtumer.services.OrderItemService;

@AutoConfigureMockMvc
@SpringBootTest
public class OrderItemControllerTest {
	@Autowired
	private MockMvc mockMvc;
	
	@Mock
	OrderItemRepo repo;

	@MockBean
	OrderItemService service;

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
	@DisplayName("GET /order_item success")
	void testGetOrderItemPageSuccess() throws Exception {
		OrderItem orderItem1 = new OrderItem();
		orderItem1.setOrderItemId(1l);
		orderItem1.setProductQty(3);

		OrderItem orderItem2 = new OrderItem();
		orderItem2.setOrderItemId(2l);
		orderItem2.setProductQty(4);

        doReturn(Lists.newArrayList(orderItem1, orderItem2)).when(service).getAllOrderItem();

		mockMvc.perform(get("/order_item/all")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$[0].orderItemId", is(1)))
				.andExpect(jsonPath("$[0].productQty", is(3)))
				.andExpect(jsonPath("$[1].orderItemId", is(2)))
				.andExpect(jsonPath("$[1].productQty", is(4)));

	}

	@Test
	@DisplayName("GET /order_item/show/1")
	void testGetOrderItemById() throws Exception {
		OrderItem orderItem1 = new OrderItem();
		orderItem1.setOrderItemId(1l);
		orderItem1.setProductQty(3);
        doReturn(Optional.of(orderItem1)).when(service).getOrderItemById(1l);

		mockMvc.perform(get("/order_item/show/{id}", 1l)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.orderItemId", is(1)))
				.andExpect(jsonPath("$.productQty", is(3)));

	}

	@Test
	@DisplayName("GET /order_item/show/1 - Not Found")
	void testGetOrderItemByIdNotFound() throws Exception {
        doReturn(Optional.empty()).when(service).getOrderItemById(1l);
		mockMvc.perform(get("/order_item/show/{id}", 1l)).andExpect(status().isNotFound());
	}

	@Test
	@DisplayName("POST /order_item/save_order_item")
	void testCreateOrderItem() throws Exception{
		OrderItem orderItemToReturn = new OrderItem();
		orderItemToReturn.setOrderItemId(1l);
		orderItemToReturn.setProductQty(4);

		OrderItem orderItemToPost = new OrderItem();
		orderItemToPost.setProductQty(4);
		when(service.createOrderItem(any())).thenReturn(orderItemToReturn);
		
		mockMvc.perform(post("/order_item/save_order_item")
			.content(asJsonString(orderItemToPost))
			.contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isCreated())
			.andExpect(content().contentType(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$.orderItemId", is(1)))
			.andExpect(jsonPath("$.productQty", is(4)));
	}
	
	@Test
    @DisplayName("PUT /order_item/update/1")
	void testUpdateOrderItem() throws Exception{
		OrderItem orderItemToPut = new OrderItem();
		orderItemToPut.setOrderItemId(1l);
		orderItemToPut.setProductQty(4);

		OrderItem orderItemToReturnFindBy = new OrderItem();
		orderItemToReturnFindBy.setProductQty(4);
		
		OrderItem orderItemToReturnSave = new OrderItem();
		orderItemToReturnSave.setProductQty(4);

		
		when(service.getOrderItemById(1l)).thenReturn(Optional.of(orderItemToReturnFindBy));
		when(service.createOrderItem(any())).thenReturn(orderItemToReturnSave);

		 mockMvc.perform(put("/order_item/update/{id}", 1l)
	        .contentType(MediaType.APPLICATION_JSON)
	        .content(asJsonString(orderItemToPut)))
		 	.andExpect(jsonPath("$.orderItemId", is(1)))
			.andExpect(jsonPath("$.productQty", is(4)));
	}
}
