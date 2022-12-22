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

import com.mtumer.connections.UserOrders;
import com.mtumer.services.UserOrdersService;


@RestController
@RequestMapping("/user_orders")
public class UserOrdersController {

	@Autowired
	UserOrdersService userOrdersService;
	
	@GetMapping
	public ResponseEntity<List<UserOrders>> getAllUserOrders(){
		List<UserOrders> userOrdersList = userOrdersService.getAllUserOrders();
		return new ResponseEntity<List<UserOrders>>(userOrdersList, HttpStatus.OK);
	}
	
	
	@GetMapping("/user_orders/{order_id}")
	public ResponseEntity<UserOrders> getById(@PathVariable Long order_id) {
		Optional<UserOrders> userOrders = userOrdersService.getUserOrdersById(order_id);
		return new ResponseEntity<>(userOrders.get(), HttpStatus.OK);
	}
	
	@PostMapping("/save_user_orders")
	public ResponseEntity<UserOrders> createUserOrders(@RequestBody UserOrders userOrders) {
		UserOrders savedUserOrders = userOrdersService.createUserOrders(userOrders);
		return new ResponseEntity<UserOrders>(savedUserOrders, HttpStatus.OK);
	}
	
	@PutMapping("/update/{order_id}")
	public void updateUserOrders(@PathVariable("order_id") Long order_id, @RequestBody UserOrders userOrders) {
		UserOrders updateuserOrders = userOrdersService.getUserOrdersById(order_id).get();
		if(updateuserOrders != null) {
			UserOrders newUserOrder = new UserOrders();
			newUserOrder.setOrder_id(order_id);
			newUserOrder.setOrder_date(userOrders.getOrder_date());
			newUserOrder.setTracking_info(userOrders.getTracking_info());
			newUserOrder.setTotal_price(userOrders.getTotal_price());
			newUserOrder.setUserOrder(userOrders.getUserOrder());
			userOrdersService.update(newUserOrder);
		}
	}
	
	
}
