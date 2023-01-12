package com.mtumer.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtumer.entity.OrderItem;
import com.mtumer.repo.OrderItemRepo;

@Service
public class OrderItemService {

	@Autowired
	OrderItemRepo orderItemRepo;

	public List<OrderItem> getAllOrderItem() {
		List<OrderItem> orderItemList = orderItemRepo.findAll();
		if (orderItemList.size() > 0) {
			return orderItemList;
		} else {
			return new ArrayList<OrderItem>();
		}
	}

	public OrderItem createOrderItem(OrderItem orderItem) {
		OrderItem newOrderItem = new OrderItem();
		newOrderItem.setProductQty(orderItem.getProductQty());
		newOrderItem.setOrderId(orderItem.getOrderId());
		newOrderItem.setProductId(orderItem.getProductId());
		newOrderItem = orderItemRepo.save(orderItem);
		return newOrderItem;
	}

	public Optional<OrderItem> getOrderItemById(Long orderItemId) {
		return orderItemRepo.findById(orderItemId);
	}

	public void update(OrderItem orderItem) {
		orderItemRepo.saveAndFlush(orderItem);
	}

	public void deleteOrderItem(Long orderItemId) {
		orderItemRepo.deleteById(orderItemId);
	}

}
