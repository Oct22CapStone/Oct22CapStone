package com.mtumer.repo;

import com.mtumer.connections.UserCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserCartRepo extends JpaRepository<UserCart, Long>{

}
