package com.mtumer.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mtumer.connections.OrderItem;



@Repository
public interface OrderItemRepo extends JpaRepository<OrderItem, Long>{

}
