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
		verify(repo, times(1)).findAll();
	}
	
	@Test
	void testCreateOrSaveOrderItem() {
		OrderItem orderItem1 = new OrderItem();
		orderItem1.setProductQty(3);

		when(repo.save(ArgumentMatchers.any(OrderItem.class))).thenReturn(orderItem1);

		// test
		OrderItem created = service.createOrderItem(orderItem1);

		// assert
		assertThat(created.getOrderItemId()).isSameAs(orderItem1.getOrderItemId());
		verify(repo, times(1)).save(orderItem1);
	}
	
	@Test
	void testGetOrderItemById() {
		OrderItem orderItem1 = new OrderItem();
		orderItem1.setProductQty(3);
		service.createOrderItem(orderItem1);
		when(repo.findById(orderItem1.getOrderItemId())).thenReturn(Optional.of(orderItem1));

		// test
		Optional<OrderItem> expected = service.getOrderItemById(orderItem1.getOrderItemId());

		// assert
		assertThat(expected.get()).isSameAs(orderItem1);
		verify(repo).findById(orderItem1.getOrderItemId());
		
	}

	@Test
	void testDeleteOrderItem() {
		OrderItem orderItem1 = new OrderItem();
		orderItem1.setProductQty(3);
		service.createOrderItem(orderItem1);
		// test
		service.deleteOrderItem(orderItem1.getOrderItemId());
		verify(repo, times(1)).deleteById(orderItem1.getOrderItemId());

	}

	@Test
	void testUpdateOrderItem() {
		OrderItem orderItem1 = new OrderItem();
		orderItem1.setProductQty(3);
		service.createOrderItem(orderItem1);

		orderItem1.setProductQty(5);

		// test
		service.update(orderItem1);
		verify(repo).saveAndFlush(orderItem1);
		
		//Assert that new phone number is saved
		assertEquals(5,orderItem1.getProductQty());
	}
}
