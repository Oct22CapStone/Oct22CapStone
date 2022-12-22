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

import com.mtumer.connections.Cart;
import com.mtumer.services.CartService;

@RestController
@RequestMapping("/cartpage")
public class CartController {
	
	@Autowired
	CartService cartService;

	
	@GetMapping
	public ResponseEntity<List<Cart>> getAllCart(){
		List<Cart> cartList = cartService.getAllCart();
		return new ResponseEntity<List<Cart>>(cartList,HttpStatus.OK);
	}
	
	
	@GetMapping("/{cart_id}")
	public ResponseEntity<Cart> getById(@PathVariable Long cart_id){
		Optional<Cart> cart = cartService.getCartById(cart_id);
		return new ResponseEntity<>(cart.get(), HttpStatus.OK);
	}
	
	
	@PostMapping("/save_cart")
	public ResponseEntity<Cart> createCart(@RequestBody Cart cart){
	Cart savedCart = cartService.createCart(cart);
	return new ResponseEntity<Cart>(savedCart, HttpStatus.OK);
	}
	
	@PutMapping("/update_cart/(cart_id")
	public void updateCart(@PathVariable("cart_id") Long cart_id, @RequestBody Cart cart) {
		Cart updateCart = cartService.getCartById(cart_id).get();
		if(updateCart != null) {
			Cart newCart = new Cart();
			newCart.setCart_id(cart.getCart_id());
			newCart.setProductid(cart.getProductid());
			newCart.setQty(cart.getQty());
			newCart.setUsercart_id(cart.getUsercart_id());
			cartService.update(newCart);
			
		}
	}
	
	@DeleteMapping("delete/{cart_id}")
	public void deleteCart (@PathVariable("cart_id") Long cart_id) {
		Cart cartRemoved = cartService.getCartById(cart_id).get();
		if(cartRemoved != null) {
			cartService.deleteCart(cart_id);
		}
	}
	
}
