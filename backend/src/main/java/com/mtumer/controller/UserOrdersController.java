package com.mtumer.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mtumer.entity.UserOrders;
import com.mtumer.services.UserOrdersService;

@RestController
@RequestMapping("/user_orders")
public class UserOrdersController {

	@Autowired
	UserOrdersService userOrdersService;
  
	@GetMapping("/all")
	public ResponseEntity<List<UserOrders>> getAllUserOrders(){
		List<UserOrders> userOrdersList = userOrdersService.getAllUserOrders();
		return new ResponseEntity<List<UserOrders>>(userOrdersList, HttpStatus.OK);
	}

	@GetMapping("/orders/{id}")
	public ResponseEntity<UserOrders> getById(@PathVariable("id") Long orderId) {
		Optional<UserOrders> userOrders = userOrdersService.getUserOrdersById(orderId);
		if (!userOrders.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return new ResponseEntity<>(userOrders.get(), HttpStatus.OK);
	}

	@PostMapping("/save_user_orders")
	public ResponseEntity<UserOrders> createUserOrders(@RequestBody UserOrders userOrders) {
		UserOrders savedUserOrders = userOrdersService.createUserOrders(userOrders);
		return new ResponseEntity<UserOrders>(savedUserOrders, HttpStatus.CREATED);
	}

	@PutMapping("/update/{order_id}")
	public ResponseEntity<UserOrders> updateUserOrders(@PathVariable("order_id") Long orderId,
			@RequestBody UserOrders userOrders) {
		Optional<UserOrders> updateuserOrders = userOrdersService.getUserOrdersById(orderId);
		if (!updateuserOrders.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		UserOrders newUserOrder = new UserOrders();
		newUserOrder.setOrderId(orderId);
		newUserOrder.setOrderDate(userOrders.getOrderDate());
		newUserOrder.setTrackingInfo(userOrders.getTrackingInfo());
		newUserOrder.setTotalPrice(userOrders.getTotalPrice());
		newUserOrder.setUserId(userOrders.getUserId());
		newUserOrder.setAddressId(userOrders.getAddressId());
		userOrdersService.update(newUserOrder);
		return new ResponseEntity<>(newUserOrder, HttpStatus.OK);
	}

}
