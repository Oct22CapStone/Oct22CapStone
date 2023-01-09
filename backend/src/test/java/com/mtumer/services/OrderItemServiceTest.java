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

import com.mtumer.entity.OrderItem;
import com.mtumer.repo.OrderItemRepo;



@RunWith(MockitoJUnitRunner.class)
public class OrderItemServiceTest {
	@InjectMocks
	OrderItemService service;
	
	@Mock
	OrderItemRepo repo;
	
	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);
	}
	
	@Test
	@DisplayName("Test findAll Success")
	void testGetAllOrderItems() {
		List<OrderItem> orderItems = new ArrayList<OrderItem>();
		OrderItem orderItem1 = new OrderItem();
		orderItem1.setProductQty(3);
		
		OrderItem orderItem2 = new OrderItem();
		orderItem2.setProductQty(2);
		
		orderItems.add(orderItem1);
		orderItems.add(orderItem2);
		
		when(repo.findAll()).thenReturn(orderItems);
		//test
		List<OrderItem> itemsList = service.getAllOrderItem();
		
		//Assert
		assertEquals(itemsList,orderItems);
		Assertions.assertEquals(2, itemsList.size(), "findAll should return 2 OrderItem entries");
		verify(repo, times(1)).findAll();
	}
	
	@Test
	@DisplayName("Test createOrderItem and save Success")
	void testCreateOrSaveOrderItem() {
		OrderItem orderItem1 = new OrderItem();
		orderItem1.setProductQty(3);

		when(repo.save(ArgumentMatchers.any(OrderItem.class))).thenReturn(orderItem1);

		// test
		OrderItem created = service.createOrderItem(orderItem1);

		// assert
		assertThat(created.getOrderItemId()).isSameAs(orderItem1.getOrderItemId());
		Assertions.assertNotNull(created,"The saved OrderItem should not be null");
		verify(repo, times(1)).save(orderItem1);
	}
	
	@Test
	@DisplayName("Test findById Success")
	void testGetOrderItemById() {
		OrderItem orderItem1 = new OrderItem();
		orderItem1.setProductQty(3);
		service.createOrderItem(orderItem1);
		when(repo.findById(orderItem1.getOrderItemId())).thenReturn(Optional.of(orderItem1));

		// test
		Optional<OrderItem> expected = service.getOrderItemById(orderItem1.getOrderItemId());

		// assert
		Assertions.assertTrue(expected.isPresent(),"OrderItem was not found.");
		Assertions.assertSame(expected.get(), orderItem1, "The OrderItem returned was not the same as the mock.");
		verify(repo).findById(orderItem1.getOrderItemId());
		
	}
	
	@Test
	@DisplayName("Test findById Not Found")
	void testFindByIdNotFound() {
		when(repo.findById(1l)).thenReturn(Optional.empty());
		
		//test
		Optional<OrderItem> expected = service.getOrderItemById(1l);
		
		//assert
		Assertions.assertFalse(expected.isPresent(), "OrderItem shouldn't exist, but was returned anyway.");
	}
	
	@Test
	@DisplayName("Test deleteById Success")
	void testDeleteOrderItem() {
		OrderItem orderItem1 = new OrderItem();
		orderItem1.setProductQty(3);
		service.createOrderItem(orderItem1);
		// test
		service.deleteOrderItem(orderItem1.getOrderItemId());
		verify(repo, times(1)).deleteById(orderItem1.getOrderItemId());

	}

	@Test
	@DisplayName("Test update Success")
	void testUpdateOrderItem() {
		OrderItem orderItem1 = new OrderItem();
		orderItem1.setProductQty(3);
		service.createOrderItem(orderItem1);

		orderItem1.setProductQty(5);

		// test
		service.update(orderItem1);
		verify(repo).saveAndFlush(orderItem1);
		
		//Assert
		assertEquals(5,orderItem1.getProductQty());
	}
}
