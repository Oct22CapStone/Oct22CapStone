package com.mtumer.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mtumer.entity.Roles;


@Repository
public interface RolesRepo extends JpaRepository<Roles, Integer>{


}
