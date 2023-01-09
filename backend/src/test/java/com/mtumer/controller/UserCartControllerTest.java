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
import com.mtumer.entity.UserCart;
import com.mtumer.repo.UserCartRepo;
import com.mtumer.services.UserCartService;

@AutoConfigureMockMvc
@SpringBootTest
public class UserCartControllerTest {
	@Autowired
	private MockMvc mockMvc;
	
	@Mock
	UserCartRepo repo;

	@MockBean
	UserCartService service;

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
	@DisplayName("GET /user_cart success")
	void testGetUserCartPageSuccess() throws Exception {
		
		UserCart userCart1 = new UserCart();
		userCart1.setUserCartId(1l);


        doReturn(Lists.newArrayList(userCart1)).when(service).getAllUserCarts();

		mockMvc.perform(get("/user_cart")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$[0].userCartId", is(1)));
	}

	@Test
	@DisplayName("GET /user_cart/show/1")
	void testGetUserCartById() throws Exception {
		
		UserCart userCart1 = new UserCart();
		userCart1.setUserCartId(1l);
        doReturn(Optional.of(userCart1)).when(service).getUserCartById(1l);

		mockMvc.perform(get("/user_cart/show/{id}", 1l)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.userCartId", is(1)));

	}

	@Test
	@DisplayName("GET /user_cart/show/1 - Not Found")
	void testGetUserCartByIdNotFound() throws Exception {
        doReturn(Optional.empty()).when(service).getUserCartById(1l);
		mockMvc.perform(get("/user_cart/show/{id}", 1l)).andExpect(status().isNotFound());
	}

	@Test
	@DisplayName("POST /user_cart/save_user_cart")
	void testCreateUserCart() throws Exception{
		
		UserCart userCartToPost = new UserCart();
		userCartToPost.setUserCartId(1l);
		
		UserCart userCartToReturn = new UserCart();
		userCartToReturn.setUserCartId(1l);
		

		when(service.createUserCart(any())).thenReturn(userCartToReturn);
		
		mockMvc.perform(post("/user_cart/save_user_cart")
			.content(asJsonString(userCartToPost))
			.contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isCreated())
			.andExpect(content().contentType(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$.userCartId", is(1)));
	}
	
	@Test
    @DisplayName("PUT /user_cart/update/1")
	void testUpdateUserCart() throws Exception{
		
		UserCart userCartToPut = new UserCart();
		userCartToPut.setUserCartId(1l);
		
		UserCart userCartToReturnFindBy = new UserCart();
		userCartToReturnFindBy.setUserCartId(1l);
		service.createUserCart(userCartToReturnFindBy);
		
		UserCart userCartToReturnSave = new UserCart();
		userCartToReturnSave.setUserCartId(1l);
		
		when(service.getUserCartById(1l)).thenReturn(Optional.of(userCartToReturnFindBy));
		when(service.createUserCart(any())).thenReturn(userCartToReturnSave);

		 mockMvc.perform(put("/user_cart/update/{id}", 1l)
	        .contentType(MediaType.APPLICATION_JSON)
	        .content(asJsonString(userCartToPut)))
		 	.andExpect(status().isOk())
		 	.andExpect(content().contentType(MediaType.APPLICATION_JSON))
		 	.andExpect(jsonPath("$.userCartId", is(1)));
	}
}
