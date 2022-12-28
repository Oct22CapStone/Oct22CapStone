package com.mtumer.repo;

import org.springframework.stereotype.Repository;

import com.mtumer.entity.Address;

import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface AddressRepo extends JpaRepository<Address, Long> {

	
}
