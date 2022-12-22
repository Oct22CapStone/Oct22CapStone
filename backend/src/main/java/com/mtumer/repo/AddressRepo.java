package com.mtumer.repo;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.mtumer.connections.Address;


@Repository
public interface AddressRepo extends JpaRepository<Address, Long> {

	
}
