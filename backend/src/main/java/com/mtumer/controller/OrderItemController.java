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

	@GetMapping("/all")
	public ResponseEntity<List<OrderItem>>getAllOrderItem(){
		List<OrderItem> orderItemList = orderItemService.getAllOrderItem();
		return new ResponseEntity<List<OrderItem>>(orderItemList, HttpStatus.OK);
	}

	@GetMapping("/show/{id}")
	public ResponseEntity<OrderItem> getById(@PathVariable("id") Long orderItemId) {
		Optional<OrderItem> orderItem = orderItemService.getOrderItemById(orderItemId);
		if (!orderItem.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return new ResponseEntity<>(orderItem.get(), HttpStatus.OK);

	}

	@PostMapping("/save_order_item")
	public ResponseEntity<OrderItem> createOrderItem(@RequestBody OrderItem orderItem) {
		OrderItem savedOrderItem = orderItemService.createOrderItem(orderItem);
		return new ResponseEntity<OrderItem>(savedOrderItem, HttpStatus.CREATED);
	}

	@PutMapping("/update/{order_item_id}")
	public ResponseEntity<OrderItem> updateOrderItem(@PathVariable("order_item_id") Long orderItemId,
			@RequestBody OrderItem orderItem) {
		Optional<OrderItem> updateOrderItem = orderItemService.getOrderItemById(orderItemId);
		if (!updateOrderItem.isPresent()) {
			return ResponseEntity.notFound().build();
		}

		OrderItem newOrderItem = new OrderItem();
		newOrderItem.setOrderItemId(orderItemId);
		newOrderItem.setOrderId(orderItem.getOrderId());
		newOrderItem.setProductQty(orderItem.getProductQty());
		newOrderItem.setProductId(orderItem.getProductId());
		orderItemService.update(newOrderItem);
		return new ResponseEntity<>(newOrderItem, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<OrderItem> deleteOrderItem(@PathVariable("id") Long orderItemId) {
		Optional<OrderItem> orderItemRemoved = orderItemService.getOrderItemById(orderItemId);
		if (!orderItemRemoved.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		orderItemService.deleteOrderItem(orderItemId);
		return ResponseEntity.ok().build();
	}

}
