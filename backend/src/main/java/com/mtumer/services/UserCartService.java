package com.mtumer.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtumer.entity.UserCart;
import com.mtumer.repo.UserCartRepo;

@Service
public class UserCartService {
	@Autowired
	UserCartRepo userCartRepo;

	public List<UserCart> getAllUserCarts() {
		List<UserCart> userCartList = userCartRepo.findAll();

		if (userCartList.size() > 0) {
			return userCartList;
		} else {
			return new ArrayList<UserCart>();
		}
	}

	public UserCart createUserCart(UserCart userCart) {

		UserCart newUserCart = new UserCart();
		newUserCart.setUserCartId(userCart.getUserCartId());
		newUserCart.setUserId(userCart.getUserId());
		newUserCart = userCartRepo.save(newUserCart);
		return newUserCart;

	}

	public Optional<UserCart> getUserCartById(Long userCartId) {
		return userCartRepo.findById(userCartId);
	}

	public void update(UserCart userCart) {
		userCartRepo.saveAndFlush(userCart);
	}

	public void deleteUserCart(Long userCartId) {
		userCartRepo.deleteById(userCartId);
	}

}
