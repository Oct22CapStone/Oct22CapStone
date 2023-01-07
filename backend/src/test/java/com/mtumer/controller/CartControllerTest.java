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
import com.mtumer.entity.Cart;
import com.mtumer.services.CartService;

@AutoConfigureMockMvc
@SpringBootTest
public class CartControllerTest {

	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	CartService service;
	
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
	@DisplayName("GET /cartpage success")
	void testGetCartPageSuccess() throws Exception {
		Cart cart1 = new Cart();
		cart1.setCartId(1l);
		cart1.setQty(2);
		
		Cart cart2 = new Cart();
		cart2.setCartId(2l);
		cart2.setQty(3);

        doReturn(Lists.newArrayList(cart1, cart2)).when(service).getAllCart();

		mockMvc.perform(get("/cartpage")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$[0].cartId", is(1)))
				.andExpect(jsonPath("$[0].qty", is(2)))
				.andExpect(jsonPath("$[1].cartId", is(2)))
				.andExpect(jsonPath("$[1].qty", is(3)));

	}

	@Test
	@DisplayName("GET /cartpage/showcart/1")
	void testGetCartById() throws Exception {
		Cart cart1 = new Cart();
		cart1.setCartId(1l);
		cart1.setQty(2);
        doReturn(Optional.of(cart1)).when(service).getCartById(1l);

		mockMvc.perform(get("/cartpage/showcart/{cart_id}", 1l)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.cartId", is(1)))
				.andExpect(jsonPath("$.qty", is(2)));

	}

	@Test
	@DisplayName("GET /cartpage/showcart/1 - Not Found")
	void testGetCartByIdNotFound() throws Exception {
        doReturn(Optional.empty()).when(service).getCartById(1l);
		mockMvc.perform(get("/cartpage/showcart/{cart_id}", 1l)).andExpect(status().isNotFound());
	}

	@Test
	@DisplayName("POST /cartpage/save_cart")
	void testCreateCart() throws Exception{
		Cart cartToPost = new Cart();
		cartToPost.setQty(2);
		
		Cart cartToReturn = new Cart();
		cartToReturn.setCartId(1l);
		cartToReturn.setQty(2);
		when(service.createCart(any())).thenReturn(cartToReturn);
		
		mockMvc.perform(post("/cartpage/save_cart")
			.content(asJsonString(cartToPost))
			.contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isCreated())
			.andExpect(content().contentType(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$.cartId", is(1)))
			.andExpect(jsonPath("$.qty", is(2)));
	}
	
	@Test
    @DisplayName("PUT /cartpage/update/1")
	void testUpdateCart() throws Exception{
		Cart cartToPut = new Cart();
		cartToPut.setCartId(1l);
		cartToPut.setQty(2);
		
		Cart cartToReturnFindBy = new Cart();
		cartToReturnFindBy.setQty(3);
		
		Cart cartToReturnSave = new Cart();
		cartToReturnSave.setQty(5);
		
		when(service.getCartById(1l)).thenReturn(Optional.of(cartToReturnFindBy));
		when(service.createCart(any())).thenReturn(cartToReturnSave);

		 mockMvc.perform(put("/cartpage/update/{cart_id}", 1l)
	        .contentType(MediaType.APPLICATION_JSON)
	        .content(asJsonString(cartToPut)))
		 	.andExpect(status().isOk())
		 	.andExpect(content().contentType(MediaType.APPLICATION_JSON))
		 	.andExpect(jsonPath("$.cartId", is(1)))
			.andExpect(jsonPath("$.qty", is(2)));
	}
	
}
