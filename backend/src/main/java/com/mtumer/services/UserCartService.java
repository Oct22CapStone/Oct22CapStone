package com.mtumer.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtumer.connections.UserCart;
import com.mtumer.repo.UserCartRepo;

@Service
public class UserCartService {
	@Autowired
	UserCartRepo userCartRepo;
	
	public List<UserCart> getAllUserCarts(){
		List<UserCart> userCartList = userCartRepo.findAll();
		
		if(userCartList.size() > 0) {
			return userCartList;
		}else {
			return new ArrayList<UserCart>();
		}
	}
	
	public UserCart createUserCart(UserCart userCart) {
		
		UserCart newUserCart = new UserCart();
		newUserCart.setUsercart_id(userCart.getUsercart_id());
		newUserCart.setUser_id(userCart.getUser_id());
		newUserCart = userCartRepo.save(newUserCart);
		return newUserCart;

	}
	
	public Optional<UserCart> getUserCartById(Long usercart_id) {
		return userCartRepo.findById(usercart_id);
	}
	
	public void update(UserCart userCart) {
		userCartRepo.saveAndFlush(userCart);
	}
	
	public void deleteUserCart(Long usercard_id) {
	userCartRepo.deleteById(usercard_id);
	}
	
	
}
