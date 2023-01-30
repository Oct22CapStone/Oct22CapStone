package com.mtumer.repo;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mtumer.entity.Roles;


@Repository
public interface RolesRepo extends JpaRepository<Roles, Integer>{


}
