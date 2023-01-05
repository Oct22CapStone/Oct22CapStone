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

import com.mtumer.entity.UserOrders;
import com.mtumer.repo.UserOrdersRepo;

@RunWith(MockitoJUnitRunner.class)
public class UserOrdersServiceTest {
	@InjectMocks
	UserOrdersService service;

	@Mock
	UserOrdersRepo repo;

	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	@DisplayName("Test findAll Success")
	void testGetAllUserOrders() {
		List<UserOrders> orders = new ArrayList<UserOrders>();
		UserOrders order1 = new UserOrders();
		order1.setTrackingInfo("Pending");
		order1.setTotalPrice(134.70);

		UserOrders order2 = new UserOrders();
		order2.setTrackingInfo("Pending");
		order2.setTotalPrice(87.95);

		orders.add(order1);
		orders.add(order2);

		when(repo.findAll()).thenReturn(orders);

		// test
		List<UserOrders> orderList = service.getAllUserOrders();

		// assert
		assertEquals(orderList, orders);
		Assertions.assertEquals(2, orderList.size(), "findAll should return 2 order entries");
		verify(repo, times(1)).findAll();
	}

	@Test
	@DisplayName("Test createUserOrder and save Success")
	void testCreateOrSaveUserOrders() {
		UserOrders order1 = new UserOrders();
		order1.setTrackingInfo("Pending");
		order1.setTotalPrice(134.70);

		when(repo.save(ArgumentMatchers.any(UserOrders.class))).thenReturn(order1);

		// test
		UserOrders created = service.createUserOrders(order1);

		// assert
		assertThat(created.getOrderId()).isSameAs(order1.getOrderId());
		Assertions.assertNotNull(created,"The saved order should not be null");
		verify(repo, times(1)).save(order1);
	}

	@Test
	@DisplayName("Test findById Success")
	void testGetUserOrdersById() {
		UserOrders order1 = new UserOrders();
		order1.setTrackingInfo("Pending");
		order1.setTotalPrice(134.70);
		service.createUserOrders(order1);
		when(repo.findById(order1.getOrderId())).thenReturn(Optional.of(order1));

		// test
		Optional<UserOrders> expected = service.getUserOrdersById(order1.getOrderId());

		// assert
		Assertions.assertTrue(expected.isPresent(),"Order was not found.");
		Assertions.assertSame(expected.get(), order1, "The order returned was not the same as the mock.");
		verify(repo).findById(order1.getOrderId());
		
	}
	
	@Test
	@DisplayName("Test findById Not Found")
	void testFindByIdNotFound() {
		when(repo.findById(1l)).thenReturn(Optional.empty());
		
		//test
		Optional<UserOrders> expected = service.getUserOrdersById(1l);
		
		//assert
		Assertions.assertFalse(expected.isPresent(), "User cart shouldn't exist, but was returned anyway.");
	}

	@Test
	@DisplayName("Test update Success")
	void testUpdateUserOrders() {
		UserOrders order1 = new UserOrders();
		order1.setTrackingInfo("Pending");
		order1.setTotalPrice(134.70);
		service.createUserOrders(order1);

		order1.setTrackingInfo("Shipped");

		// test
		service.update(order1);
		verify(repo).saveAndFlush(order1);
		
		//Assert 
		assertEquals("Shipped",order1.getTrackingInfo());
	}
}
