package com.mtumer.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mtumer.connections.UserCart;
import com.mtumer.repo.UserCartRepo;
import com.mtumer.services.UserCartService;


@RestController
@RequestMapping("user_cart")
public class UserCartController {
	
	@Autowired
	UserCartService userCartService;
	
	@GetMapping
	public ResponseEntity<List<UserCart>> getAllUserCarts() {
		List<UserCart> userCartList = userCartService.getAllUserCarts();
		return new ResponseEntity<List<UserCart>>(userCartList,HttpStatus.OK);
	}
	
	
	@GetMapping("/{usercart_id}")
	public ResponseEntity<UserCart> getById(@PathVariable Long usercart_id) {
		Optional<UserCart>userCart = userCartService.getUserCartById(usercart_id);
		return new ResponseEntity<>(userCart.get(), HttpStatus.OK);
	}
	
	
	@PostMapping("/save_user_cart")
	public ResponseEntity<UserCart> createUserCart(@RequestBody UserCart userCart) {
		UserCart savedUserCart = userCartService.createUserCart(userCart);
		return new ResponseEntity<UserCart>(savedUserCart,HttpStatus.OK);
	}
	
	@PutMapping("/update/{usercart_id}")
	public void updateUserCart(@PathVariable("usercart_id") Long usercart_id, @RequestBody UserCart userCart) {
		UserCart updateUserCart = userCartService.getUserCartById(usercart_id).get();
		if(updateUserCart != null) {
			UserCart newUserCart = new UserCart();
			newUserCart.setUsercart_id(usercart_id);
			newUserCart.setCart(userCart.getCart());
			newUserCart.setUser_id(userCart.getUser_id());
			userCartService.update(newUserCart);
		}
	}
	
	@DeleteMapping("/delete/usercart_id")
	public void deleteUserCart(@PathVariable("usercart_id") Long usercart_id) {
		UserCart userCartRemoved = userCartService.getUserCartById(usercart_id).get();
		if(userCartRemoved != null) {
			userCartService.deleteUserCart(usercart_id);
		}
		
		
	}

}























