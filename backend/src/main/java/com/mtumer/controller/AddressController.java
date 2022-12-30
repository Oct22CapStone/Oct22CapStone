package com.mtumer.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mtumer.entity.Address;
import com.mtumer.services.AddressService;

@RestController
@RequestMapping("/addresspage")
public class AddressController {

	@Autowired
	AddressService addressService;

	@GetMapping
	public ResponseEntity<List<Address>> getAllAddress() {
		List<Address> adrList = addressService.getAllAddress();
		return new ResponseEntity<List<Address>>(adrList, HttpStatus.OK);
	}

	@PostMapping("/save_address")
	public ResponseEntity<Address> createAddress(@RequestBody Address address) {
		Address savedAddress = addressService.createAddress(address);
		return new ResponseEntity<Address>(savedAddress, HttpStatus.OK);
	}

	@GetMapping("/showaddress/{id}")
	public ResponseEntity<Address> getById(@PathVariable Long addressId) {
		Optional<Address> user = addressService.getAddressById(addressId);
		return new ResponseEntity<>(user.get(), HttpStatus.OK);

	}

	@DeleteMapping("/delete/{id}")
	public void deleteAddress(@PathVariable("id") Long addressId) {
		Address removedAddress = addressService.getAddressById(addressId).get();
		if (removedAddress != null) {
			addressService.deleteAddress(addressId);
		}
	}

}
