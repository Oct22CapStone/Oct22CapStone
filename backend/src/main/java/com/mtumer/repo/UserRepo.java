package com.mtumer.repo;

import com.mtumer.connections.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepo extends JpaRepository<Users, Long> {
	
}



