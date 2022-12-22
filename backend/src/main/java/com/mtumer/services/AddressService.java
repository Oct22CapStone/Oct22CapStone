package com.mtumer.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtumer.connections.Address;

import com.mtumer.repo.AddressRepo;


@Service
public class AddressService {
	

	@Autowired
	AddressRepo addressRepo;
	

	public List<Address> getAllAddress() {
		List<Address> addressList = addressRepo.findAll();
		if(addressList.size() > 0) {
			return addressList;
		}else {
			return new ArrayList<Address>();
		}
	}
	
	
	public Address createAddress(Address address) {
		
	
		Address newAddress = new Address();
		newAddress.setStreet(address.getStreet());
		newAddress.setCity(address.getCity());
		newAddress.setState(address.getState());
		newAddress.setCountry(address.getCountry());
		newAddress.setZip(address.getZip());
		newAddress.setUser(address.getUser());
		newAddress = addressRepo.save(newAddress);
		return newAddress;
	}
	
	public Optional<Address> getAddressById (Long id) {
			return addressRepo.findById(id);
					
	}
	
	public void deleteAddress(Long address_id) {
		addressRepo.deleteById(address_id);
	}
	
}
