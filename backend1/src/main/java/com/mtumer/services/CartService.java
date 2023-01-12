package com.mtumer.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtumer.entity.Cart;
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
		newCart.setProductId(cart.getProductId());
		newCart.setQty(cart.getQty());
		newCart.setUserCartId(cart.getUserCartId());
		newCart = cartRepo.save(newCart);
		return newCart;
		
	}
	
	
	public Optional<Cart> getCartById(Long cartId){
		return cartRepo.findById(cartId);
	}
	
	public void update(Cart cart) {
		cartRepo.saveAndFlush(cart);
	}
	
	public void deleteCart(Long cartId) {
		cartRepo.deleteById(cartId);
	}
	
}
