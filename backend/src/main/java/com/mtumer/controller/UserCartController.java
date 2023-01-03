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

import com.mtumer.entity.UserCart;
import com.mtumer.services.UserCartService;

@RestController
@RequestMapping("/user_cart")
public class UserCartController {

	@Autowired
	UserCartService userCartService;

	@GetMapping
	public ResponseEntity<List<UserCart>> getAllUserCarts() {
		List<UserCart> userCartList = userCartService.getAllUserCarts();
		return new ResponseEntity<List<UserCart>>(userCartList, HttpStatus.OK);
	}

	@GetMapping("/show/{id}")
	public ResponseEntity<UserCart> getById(@PathVariable("id") Long userCartId) {
		Optional<UserCart> userCart = userCartService.getUserCartById(userCartId);
		if (!userCart.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return new ResponseEntity<>(userCart.get(), HttpStatus.OK);
	}

	@PostMapping("/save_user_cart")
	public ResponseEntity<UserCart> createUserCart(@RequestBody UserCart userCart) {
		UserCart savedUserCart = userCartService.createUserCart(userCart);
		return new ResponseEntity<UserCart>(savedUserCart, HttpStatus.CREATED);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<UserCart> updateUserCart(@PathVariable("id") Long userCartId,
			@RequestBody UserCart userCart) {
		Optional<UserCart> updateUserCart = userCartService.getUserCartById(userCartId);
		if (!updateUserCart.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		UserCart newUserCart = new UserCart();
		newUserCart.setUserCartId(userCartId);
		newUserCart.setCart(userCart.getCart());
		newUserCart.setUserId(userCart.getUserId());
		userCartService.update(newUserCart);
		return new ResponseEntity<>(newUserCart, HttpStatus.OK);

	}

	@DeleteMapping("/delete/id")
	public ResponseEntity<UserCart> deleteUserCart(@PathVariable("id") Long userCartId) {
		Optional<UserCart> userCartRemoved = userCartService.getUserCartById(userCartId);
		if (!userCartRemoved.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		userCartService.deleteUserCart(userCartId);
		return ResponseEntity.ok().build();

	}

}
