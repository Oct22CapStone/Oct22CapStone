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

import com.mtumer.connections.OrderItem;
import com.mtumer.services.OrderItemService;

@RestController
@RequestMapping("/order_item")
public class OrderItemController {
	
	@Autowired
	OrderItemService orderItemService;
	
	
	@GetMapping
	public ResponseEntity<List<OrderItem>>getAllOrderItem(){
		List<OrderItem> orderItemList = orderItemService.getAllOrderItem();
		return new ResponseEntity<List<OrderItem>>(orderItemList, HttpStatus.OK);
	}
	
	
	@GetMapping("/show/{order_item_id}")
	public ResponseEntity<OrderItem> getById(@PathVariable Long order_item_id) {
		Optional<OrderItem> orderItem = orderItemService.getOrderItemById(order_item_id);
		return new ResponseEntity<>(orderItem.get(), HttpStatus.OK);
		
 	}
	
	
	@PostMapping("/save_order_item")
	public ResponseEntity<OrderItem> createOrderItem(@RequestBody OrderItem orderItem) {
		OrderItem savedOrderItem = orderItemService.createOrderItem(orderItem);
		return new ResponseEntity<OrderItem>(savedOrderItem, HttpStatus.OK);
	}
	
	@PutMapping("/update/{order_item_id}")
	public void updateOrderItem(@PathVariable("order_item_id") Long order_item_id, @RequestBody OrderItem orderItem) {
		OrderItem updateOrderItem = orderItemService.getOrderItemById(order_item_id).get();
		if(updateOrderItem != null) {
			OrderItem newOrderItem = new OrderItem();
			newOrderItem.setOrder_item_id(order_item_id);
			newOrderItem.setOrder_id(orderItem.getOrder_id());
			newOrderItem.setProduct_qty(orderItem.getProduct_qty());
			newOrderItem.setProductId(orderItem.getProductId());
			orderItemService.update(newOrderItem);
				
		}
	}
	
	@DeleteMapping("/delete/{order_item_id}")
	public void deleteOrderItem(@PathVariable("order_item_id") Long order_item_id) {
		OrderItem orderItemRemoved = orderItemService.getOrderItemById(order_item_id).get();
		if(orderItemRemoved != null) {
			orderItemService.deleteOrderItem(order_item_id);
		}
	}
	
	
	
}


























