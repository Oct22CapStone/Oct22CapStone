package com.mtumer.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mtumer.entity.UserOrders;

@Repository
public interface UserOrdersRepo extends JpaRepository<UserOrders, Long>{

}
