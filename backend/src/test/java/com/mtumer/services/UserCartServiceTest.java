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

import com.mtumer.entity.UserCart;
import com.mtumer.entity.Users;
import com.mtumer.repo.UserCartRepo;


@RunWith(MockitoJUnitRunner.class)
public class UserCartServiceTest {
	@InjectMocks
	UserCartService service;
	
	@Mock
	UserCartRepo repo;
	
	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);
	}
	
	@Test
	void testGetAllUserCarts() {
		List<UserCart> userCarts = new ArrayList<UserCart>();
		Users user1= new Users();
		user1.setUserId(25L);
		
		UserCart userCart1 = new UserCart();
		userCart1.setUserId(user1);
		
		Users user2= new Users();
		user2.setUserId(26L);
		
		UserCart userCart2 = new UserCart();
		userCart2.setUserId(user2);
		
		userCarts.add(userCart1);
		userCarts.add(userCart2);
		
		when(repo.findAll()).thenReturn(userCarts);
		//test
		List<UserCart> userCartList = service.getAllUserCarts();
		
		//Assert
		assertEquals(userCartList,userCarts);
		verify(repo, times(1)).findAll();
	}
	
	@Test
	void testCreateOrSaveUserCart() {
		Users user1= new Users();
		user1.setUserId(25L);
		
		UserCart userCart1 = new UserCart();
		userCart1.setUserId(user1);

		when(repo.save(ArgumentMatchers.any(UserCart.class))).thenReturn(userCart1);

		// test
		UserCart created = service.createUserCart(userCart1);

		// assert
		assertThat(created.getUserCartId()).isSameAs(userCart1.getUserCartId());
		verify(repo, times(1)).save(userCart1);
	}
	
	@Test
	void testGetUserCartById() {
		Users user1= new Users();
		user1.setUserId(25L);
		
		UserCart userCart1 = new UserCart();
		userCart1.setUserId(user1);
		service.createUserCart(userCart1);
		when(repo.findById(userCart1.getUserCartId())).thenReturn(Optional.of(userCart1));

		// test
		Optional<UserCart> expected = service.getUserCartById(userCart1.getUserCartId());

		// assert
		assertThat(expected.get()).isSameAs(userCart1);
		verify(repo).findById(userCart1.getUserCartId());
		
	}

	@Test
	void testDeleteUserCart() {
		Users user1= new Users();
		user1.setUserId(25L);
		
		UserCart userCart1 = new UserCart();
		userCart1.setUserId(user1);
		service.createUserCart(userCart1);
		
		// test
		service.deleteUserCart(userCart1.getUserCartId());
		verify(repo, times(1)).deleteById(userCart1.getUserCartId());

	}

	@Test
	void testUpdateUserCart() {
		Users user1= new Users();
		user1.setUserId(25L);
		
		UserCart userCart1 = new UserCart();
		userCart1.setUserId(user1);
		service.createUserCart(userCart1);
		
		Users user2= new Users();
		user2.setUserId(26L);

		userCart1.setUserId(user2);

		// test
		service.update(userCart1);
		verify(repo).saveAndFlush(userCart1);
		
		//Assert that new phone number is saved
		assertEquals(26L,userCart1.getUserId().getUserId());
	}
}
