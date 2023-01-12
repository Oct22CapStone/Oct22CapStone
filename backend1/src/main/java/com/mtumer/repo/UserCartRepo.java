package com.mtumer.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mtumer.entity.UserCart;


@Repository
public interface UserCartRepo extends JpaRepository<UserCart, Long> {
	

}
