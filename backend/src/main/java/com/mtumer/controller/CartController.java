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

import com.mtumer.entity.Cart;
import com.mtumer.services.CartService;

@RestController
@RequestMapping("/cartpage")
public class CartController {

	@Autowired
	CartService cartService;

	@GetMapping
	public ResponseEntity<List<Cart>> getAllCart() {
		List<Cart> cartList = cartService.getAllCart();
		return new ResponseEntity<List<Cart>>(cartList, HttpStatus.OK);
	}

	@GetMapping("/showcart/{cart_id}")
	public ResponseEntity<Cart> getById(@PathVariable("cart_id") Long cartId) {
		Optional<Cart> cart = cartService.getCartById(cartId);
		if (!cart.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return new ResponseEntity<>(cart.get(), HttpStatus.OK);
	}

	@PostMapping("/save_cart")
	public ResponseEntity<Cart> createCart(@RequestBody Cart cart) {
		Cart savedCart = cartService.createCart(cart);
		return new ResponseEntity<Cart>(savedCart, HttpStatus.CREATED);
	}

	@PutMapping("/update/{cart_id}")
	public ResponseEntity<Cart> updateCart(@PathVariable("cart_id") Long cartId, @RequestBody Cart cart) {
		Optional<Cart> updateCart = cartService.getCartById(cartId);
		if (!updateCart.isPresent()) {
			return ResponseEntity.notFound().build();
		}

		Cart newCart = new Cart();
		newCart.setCartId(cart.getCartId());
		newCart.setProductId(cart.getProductId());
		newCart.setQty(cart.getQty());
		newCart.setUserCartId(cart.getUserCartId());
		cartService.update(newCart);
		return new ResponseEntity<>(newCart, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{cart_id}")
	public ResponseEntity<Cart> deleteCart(@PathVariable("cart_id") Long cartId) {
		Optional<Cart> cartRemoved = cartService.getCartById(cartId);
		if (!cartRemoved.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		cartService.deleteCart(cartId);
		return ResponseEntity.ok().build();
	}

}
