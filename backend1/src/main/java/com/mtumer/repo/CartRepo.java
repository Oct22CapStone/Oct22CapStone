package com.mtumer.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mtumer.entity.Cart;

@Repository
public interface CartRepo extends JpaRepository<Cart, Long>{

}
