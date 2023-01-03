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
import com.mtumer.entity.Product;
import com.mtumer.repo.ProductRepo;
import com.mtumer.services.ProductService;
@AutoConfigureMockMvc
@SpringBootTest
public class ProductControllerTest {
	@Autowired
	private MockMvc mockMvc;
	
	@Mock
	ProductRepo repo;

	@MockBean
	ProductService service;

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
	@DisplayName("GET /product success")
	void testGetProductPageSuccess() throws Exception {
		Product product1 = new Product();
		product1.setProductId(1l);
		product1.setProductName("Green T-Shirt");
		product1.setProductQty(235);

		Product product2 = new Product();
		product2.setProductId(2l);
		product2.setProductName("Red T-Shirt");
		product2.setProductQty(250);

        doReturn(Lists.newArrayList(product1, product2)).when(service).getAllProduct();

		mockMvc.perform(get("/product")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$[0].productId", is(1)))
				.andExpect(jsonPath("$[0].productName", is("Green T-Shirt")))
				.andExpect(jsonPath("$[0].productQty", is(235)))
				.andExpect(jsonPath("$[1].productId", is(2)))
				.andExpect(jsonPath("$[1].productName", is("Red T-Shirt")))
				.andExpect(jsonPath("$[1].productQty", is(250)));
	}

	@Test
	@DisplayName("GET /product/1")
	void testGetProductById() throws Exception {
		Product product1 = new Product();
		product1.setProductId(1l);
		product1.setProductName("Green T-Shirt");
		product1.setProductQty(235);
        doReturn(Optional.of(product1)).when(service).getProductById(1l);

		mockMvc.perform(get("/product/{id}", 1l)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.productId", is(1)))
				.andExpect(jsonPath("$.productName", is("Green T-Shirt")))
				.andExpect(jsonPath("$.productQty", is(235)));

	}

	@Test
	@DisplayName("GET /product/1 - Not Found")
	void testGetProductByIdNotFound() throws Exception {
        doReturn(Optional.empty()).when(service).getProductById(1l);
		mockMvc.perform(get("/product/showproduct/{id}", 1l)).andExpect(status().isNotFound());
	}

	@Test
	@DisplayName("POST /product/save_product")
	void testCreateProduct() throws Exception{
		Product productToPost = new Product();
		productToPost.setProductName("Green T-Shirt");
		productToPost.setProductQty(235);
		
		Product productToReturn = new Product();
		productToReturn.setProductId(1l);
		productToReturn.setProductName("Green T-Shirt");
		productToReturn.setProductQty(235);
		when(service.createProduct(any())).thenReturn(productToReturn);
		
		mockMvc.perform(post("/product/save_product")
			.content(asJsonString(productToPost))
			.contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isCreated())
			.andExpect(content().contentType(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$.productId", is(1)))
			.andExpect(jsonPath("$.productName", is("Green T-Shirt")))
			.andExpect(jsonPath("$.productQty", is(235)));
	}
	
	@Test
    @DisplayName("PUT /product/update/1")
	void testUpdateProduct() throws Exception{
		Product productToPut = new Product();
		productToPut.setProductId(1l);
		productToPut.setProductName("Green T-Shirt");
		productToPut.setProductQty(235);
		
		Product productToReturnFindBy = new Product();
		productToReturnFindBy.setProductName("Green T-Shirt");
		productToReturnFindBy.setProductQty(235);
		service.createProduct(productToReturnFindBy);
		
		Product productToReturnSave = new Product();
		productToReturnSave.setProductName("Green T-Shirt");
		productToReturnSave.setProductQty(235);
		
		when(service.getProductById(1l)).thenReturn(Optional.of(productToReturnFindBy));
		when(service.createProduct(any())).thenReturn(productToReturnSave);

		 mockMvc.perform(put("/product/update/{productid}", 1l)
	        .contentType(MediaType.APPLICATION_JSON)
	        .content(asJsonString(productToPut)))
		 	.andExpect(status().isOk())
		 	.andExpect(content().contentType(MediaType.APPLICATION_JSON))
		 	.andExpect(jsonPath("$.productId", is(1)))
			.andExpect(jsonPath("$.productName", is("Green T-Shirt")))
			.andExpect(jsonPath("$.productQty", is(235)));
	}
	
}
