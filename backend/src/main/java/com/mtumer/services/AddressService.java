package com.mtumer.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtumer.entity.Address;
import com.mtumer.entity.Product;
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
	
	public void update(Address address) {
		addressRepo.saveAndFlush(address);
	}
	
	
	public Address createAddress(Address address) {
		Address newAddress = new Address();
		newAddress.setStreet(address.getStreet());
		newAddress.setCity(address.getCity());
		newAddress.setState(address.getState());
		newAddress.setCountry(address.getCountry());
		newAddress.setZip(address.getZip());
		newAddress.setUserId(address.getUserId());
		newAddress = addressRepo.save(newAddress);
		return newAddress;
	}
	
	public Optional<Address> getAddressById (Long id) {
			return addressRepo.findById(id);
					
	}
	
	public void deleteAddress(Long addressId) {
		addressRepo.deleteById(addressId);
	}
	
}
