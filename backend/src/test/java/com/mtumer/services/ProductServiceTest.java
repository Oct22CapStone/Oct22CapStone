package com.mtumer.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import com.mtumer.entity.Product;
import com.mtumer.repo.ProductRepo;

@RunWith(MockitoJUnitRunner.class)
public class ProductServiceTest {
	@InjectMocks
	ProductService service;
	
	@Mock
	ProductRepo repo;
	
	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);
	}
	
	@Test
	@DisplayName("Test findAll Success")
	void testGetAllProducts() {
		List<Product> products = new ArrayList<Product>();
		Product product1 = new Product();
		product1.setProductName("Green T-Shirt");
		product1.setProductQty(235);
		
		Product product2 = new Product();
		product2.setProductName("Red T-Shirt");
		product2.setProductQty(250);
		
		products.add(product1);
		products.add(product2);
		
		when(repo.findAll()).thenReturn(products);
		//test
		List<Product> prodList = service.getAllProduct();
		
		//Assert
		assertEquals(prodList,products);
		Assertions.assertEquals(2, prodList.size(), "findAll should return 2 products");
		verify(repo, times(1)).findAll();
	}
	
	@Test
	@DisplayName("Test createProduct and save Success")
	void testCreateOrSaveProduct() {
		Product product1 = new Product();
		product1.setProductName("Green T-Shirt");
		product1.setProductQty(235);

		when(repo.save(ArgumentMatchers.any(Product.class))).thenReturn(product1);

		// test
		Product created = service.createProduct(product1);

		// assert
		assertThat(created.getProductId()).isSameAs(product1.getProductId());
		Assertions.assertNotNull(created,"The saved product should not be null");
		verify(repo, times(1)).save(product1);
	}
	@Test
	@DisplayName("Test findById Success")
	void testGetProductById() {
		Product product1 = new Product();
		product1.setProductName("Green T-Shirt");
		product1.setProductQty(235);
		service.createProduct(product1);
		when(repo.findById(product1.getProductId())).thenReturn(Optional.of(product1));

		// test
		Optional<Product> expected = service.getProductById(product1.getProductId());

		// assert
		Assertions.assertTrue(expected.isPresent(),"Product was not found.");
		Assertions.assertSame(expected.get(), product1, "The product returned was not the same as the mock.");
		verify(repo).findById(product1.getProductId());
		
	}
	
	@Test
	@DisplayName("Test findById Not Found")
	void testFindByIdNotFound() {
		when(repo.findById(1l)).thenReturn(Optional.empty());
		
		//test
		Optional<Product> expected = service.getProductById(1l);
		
		//assert
		Assertions.assertFalse(expected.isPresent(), "Product shouldn't exist, but was returned anyway.");
	}

	@Test
	@DisplayName("Test deleteById Success")
	void testDeleteProduct() {
		Product product1 = new Product();
		product1.setProductName("Green T-Shirt");
		product1.setProductQty(235);
		service.createProduct(product1);
		// test
		service.deleteProduct(product1.getProductId());
		verify(repo, times(1)).deleteById(product1.getProductId());

	}

	@Test
	@DisplayName("Test update Success")
	void testUpdateProduct() {
		Product product1 = new Product();
		product1.setProductName("Green T-Shirt");
		product1.setProductQty(235);
		service.createProduct(product1);

		product1.setProductQty(219);

		// test
		service.update(product1);
		verify(repo).saveAndFlush(product1);
		
		//Assert 
		assertEquals(219,product1.getProductQty());
	}
	
}
