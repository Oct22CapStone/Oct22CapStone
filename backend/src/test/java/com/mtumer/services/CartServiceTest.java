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
import com.mtumer.entity.Cart;
import com.mtumer.repo.CartRepo;

@RunWith(MockitoJUnitRunner.class)
public class CartServiceTest {
	@InjectMocks
	CartService service;
	
	@Mock
	CartRepo repo;
	
	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);
	}
	
	@Test
	@DisplayName("Test findAll Success")
	void testGetAllCarts() {
		List<Cart> carts = new ArrayList<Cart>();
		Cart cart1 = new Cart();
		cart1.setQty(2);
		
		Cart cart2 = new Cart();
		cart2.setQty(3);
		
		carts.add(cart1);
		carts.add(cart2);
		
		when(repo.findAll()).thenReturn(carts);
		//test
		List<Cart> cartList = service.getAllCart();
		
		//Assert
		assertEquals(cartList,carts);
		Assertions.assertEquals(2, cartList.size(), "findAll should return 2 carts");
		verify(repo, times(1)).findAll();
	}
	
	@Test
	@DisplayName("Test createCart and save Success")
	void testCreateOrSaveCart() {
		Cart cart1 = new Cart();
		cart1.setQty(2);

		when(repo.save(ArgumentMatchers.any(Cart.class))).thenReturn(cart1);

		// test
		Cart created = service.createCart(cart1);

		// assert
		assertThat(created.getCartId()).isSameAs(cart1.getCartId());
		Assertions.assertNotNull(created,"The saved cart should not be null");
		verify(repo, times(1)).save(cart1);
	}
	
	@Test
	@DisplayName("Test findById Success")
	void testGetCartById() {
		Cart cart1 = new Cart();
		cart1.setQty(2);
		service.createCart(cart1);
		when(repo.findById(cart1.getCartId())).thenReturn(Optional.of(cart1));

		// test
		Optional<Cart> expected = service.getCartById(cart1.getCartId());

		// assert
		Assertions.assertTrue(expected.isPresent(),"Cart was not found.");
		Assertions.assertSame(expected.get(), cart1, "The cart returned was not the same as the mock.");
		verify(repo).findById(cart1.getCartId());
		
	}
	@Test
	@DisplayName("Test findById Not Found")
	void testFindByIdNotFound() {
		when(repo.findById(1l)).thenReturn(Optional.empty());
		
		//test
		Optional<Cart> expected = service.getCartById(1l);
		
		//assert
		Assertions.assertFalse(expected.isPresent(), "Cart shouldn't exist, but was returned anyway.");
	}

	@Test
	@DisplayName("Test deleteById Success")
	void testDeleteCart() {
		Cart cart1 = new Cart();
		cart1.setQty(2);
		service.createCart(cart1);
		// test
		service.deleteCart(cart1.getCartId());
		verify(repo, times(1)).deleteById(cart1.getCartId());

	}

	@Test
	@DisplayName("Test update Success")
	void testUpdateCart() {
		Cart cart1 = new Cart();
		cart1.setQty(2);
		service.createCart(cart1);

		cart1.setQty(3);

		// test
		service.update(cart1);
		verify(repo).saveAndFlush(cart1);
		
		//Assert 
		assertEquals(3,cart1.getQty());
	}
}
