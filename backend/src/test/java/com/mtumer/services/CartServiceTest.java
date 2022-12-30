package com.mtumer.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
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
		verify(repo, times(1)).findAll();
	}
	
	@Test
	void testCreateOrSaveCart() {
		Cart cart1 = new Cart();
		cart1.setQty(2);

		when(repo.save(ArgumentMatchers.any(Cart.class))).thenReturn(cart1);

		// test
		Cart created = service.createCart(cart1);

		// assert
		assertThat(created.getCartId()).isSameAs(cart1.getCartId());
		verify(repo, times(1)).save(cart1);
	}
	
	@Test
	void testGetCartById() {
		Cart cart1 = new Cart();
		cart1.setQty(2);
		service.createCart(cart1);
		when(repo.findById(cart1.getCartId())).thenReturn(Optional.of(cart1));

		// test
		Optional<Cart> expected = service.getCartById(cart1.getCartId());

		// assert
		assertThat(expected.get()).isSameAs(cart1);
		verify(repo).findById(cart1.getCartId());
		
	}

	@Test
	void testDeleteCart() {
		Cart cart1 = new Cart();
		cart1.setQty(2);
		service.createCart(cart1);
		// test
		service.deleteCart(cart1.getCartId());
		verify(repo, times(1)).deleteById(cart1.getCartId());

	}

	@Test
	void testUpdateCart() {
		Cart cart1 = new Cart();
		cart1.setQty(2);
		service.createCart(cart1);

		cart1.setQty(3);

		// test
		service.update(cart1);
		verify(repo).saveAndFlush(cart1);
		
		//Assert that new phone number is saved
		assertEquals(3,cart1.getQty());
	}
}
