package com.mtumer.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mtumer.entity.OrderItem;
import com.mtumer.services.OrderItemService;

@RestController
@RequestMapping("/order_item")
public class OrderItemController {

	@Autowired
	OrderItemService orderItemService;

	@GetMapping
	public ResponseEntity<List<OrderItem>> getAllOrderItem() {
		List<OrderItem> orderItemList = orderItemService.getAllOrderItem();
		return new ResponseEntity<List<OrderItem>>(orderItemList, HttpStatus.OK);
	}

	@GetMapping("/show/{order_item_id}")
	public ResponseEntity<OrderItem> getById(@PathVariable Long orderItemId) {
		Optional<OrderItem> orderItem = orderItemService.getOrderItemById(orderItemId);
		return new ResponseEntity<>(orderItem.get(), HttpStatus.OK);

	}

	@PostMapping("/save_order_item")
	public ResponseEntity<OrderItem> createOrderItem(@RequestBody OrderItem orderItem) {
		OrderItem savedOrderItem = orderItemService.createOrderItem(orderItem);
		return new ResponseEntity<OrderItem>(savedOrderItem, HttpStatus.OK);
	}

	@PutMapping("/update/{order_item_id}")
	public void updateOrderItem(@PathVariable("order_item_id") Long orderItemId, @RequestBody OrderItem orderItem) {
		OrderItem updateOrderItem = orderItemService.getOrderItemById(orderItemId).get();
		if (updateOrderItem != null) {
			OrderItem newOrderItem = new OrderItem();
			newOrderItem.setOrderItemId(orderItemId);
			newOrderItem.setOrderId(orderItem.getOrderId());
			newOrderItem.setProductQty(orderItem.getProductQty());
			newOrderItem.setProductId(orderItem.getProductId());
			orderItemService.update(newOrderItem);

		}
	}

	@DeleteMapping("/delete/{order_item_id}")
	public void deleteOrderItem(@PathVariable("order_item_id") Long orderItemId) {
		OrderItem orderItemRemoved = orderItemService.getOrderItemById(orderItemId).get();
		if (orderItemRemoved != null) {
			orderItemService.deleteOrderItem(orderItemId);
		}
	}

}
