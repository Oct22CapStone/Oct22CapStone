package com.mtumer.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtumer.connections.Cart;
import com.mtumer.repo.CartRepo;

@Service
public class CartService {
	
	@Autowired
	CartRepo cartRepo;
	
	
	public List<Cart> getAllCart(){
		List<Cart> cartList = cartRepo.findAll();
		
		if(cartList.size() > 0) {
			return cartList;
		} else {
			return new ArrayList<Cart>();
		}
	}
	
	public Cart createCart(Cart cart) {
		Cart newCart = new Cart();
		newCart.setProductid(cart.getProductid());
		newCart.setQty(cart.getQty());
		newCart.setUsercart_id(cart.getUsercart_id());
		newCart = cartRepo.save(newCart);
		return newCart;
		
	}
	
	
	public Optional<Cart> getCartById(Long cart_id){
		return cartRepo.findById(cart_id);
	}
	
	public void update(Cart cart) {
		cartRepo.saveAndFlush(cart);
	}
	
	public void deleteCart(Long cart_id) {
		cartRepo.deleteById(cart_id);
	}
	
}
