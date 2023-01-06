package com.mtumer.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mtumer.entity.UserRole;


@Repository
public interface UserRoleRepo extends JpaRepository<UserRole, Long>{

}
