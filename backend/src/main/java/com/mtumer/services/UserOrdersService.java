package com.mtumer.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtumer.entity.UserOrders;
import com.mtumer.repo.UserOrdersRepo;

@Service
public class UserOrdersService {

	@Autowired
	UserOrdersRepo userOrdersRepo;

	public List<UserOrders> getAllUserOrders() {
		List<UserOrders> userOrdersList = userOrdersRepo.findAll();

		if (userOrdersList.size() > 0) {
			return userOrdersList;
		} else {
			return new ArrayList<UserOrders>();
		}
	}

	public UserOrders createUserOrders(UserOrders userOrders) {
		UserOrders newUserOrders = new UserOrders();
		newUserOrders.setOrderDate(userOrders.getOrderDate());
		newUserOrders.setTotalPrice(userOrders.getTotalPrice());
		newUserOrders.setTrackingInfo(userOrders.getTrackingInfo());
		newUserOrders.setUserId(userOrders.getUserId());
		newUserOrders.setAddressId(userOrders.getAddressId());
		newUserOrders = userOrdersRepo.save(newUserOrders);
		return newUserOrders;
	}

	public Optional<UserOrders> getUserOrdersById(Long orderId) {

		return userOrdersRepo.findById(orderId);
	}

	public void update(UserOrders userOrders) {
		userOrdersRepo.saveAndFlush(userOrders);
	}

}
