package com.mtumer.repo;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mtumer.entity.Users;


@Repository
public interface UserRepo extends JpaRepository<Users, Long> {
	

}



