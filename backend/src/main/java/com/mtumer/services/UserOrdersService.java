package com.mtumer.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtumer.connections.UserOrders;
import com.mtumer.repo.UserOrdersRepo;


@Service
public class UserOrdersService {
	
	@Autowired
	UserOrdersRepo userOrdersRepo;
	
	public List<UserOrders> getAllUserOrders(){
		List<UserOrders> userOrdersList = userOrdersRepo.findAll();
		
		if(userOrdersList.size() > 0) {
			return userOrdersList;
		} else {
			return new ArrayList<UserOrders>();
		}
	}
	
	public UserOrders createUserOrders(UserOrders userOrders) {
		UserOrders newUserOrders = new UserOrders();
		newUserOrders.setOrder_date(userOrders.getOrder_date());
		newUserOrders.setTotal_price(userOrders.getTotal_price());
		newUserOrders.setTracking_info(userOrders.getTracking_info());
		newUserOrders.setUserOrder(userOrders.getUserOrder());
		newUserOrders.setAddress_id(userOrders.getAddress_id());
		newUserOrders = userOrdersRepo.save(newUserOrders);
		return newUserOrders;
	}

	public Optional<UserOrders> getUserOrdersById(Long order_id) {

		return userOrdersRepo.findById(order_id);
	}
	
	public void update(UserOrders userOrders) {
		userOrdersRepo.saveAndFlush(userOrders);
	}
	
	
}
