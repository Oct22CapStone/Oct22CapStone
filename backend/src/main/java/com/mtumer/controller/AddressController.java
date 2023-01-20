package com.mtumer.controller;

import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mtumer.entity.Address;
import com.mtumer.entity.Cart;
import com.mtumer.services.AddressService;

@CrossOrigin(origins = {"https://vehiclevault.azurewebsites.net", "http://localhost:3000"})
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
		return new ResponseEntity<Address>(savedAddress, HttpStatus.CREATED);
	}

	@GetMapping("/showaddress/{id}")
	public ResponseEntity<Address> getById(@PathVariable("id") Long addressId) {
		Optional<Address> user = addressService.getAddressById(addressId);
		if (!user.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return new ResponseEntity<>(user.get(), HttpStatus.OK);

	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Address> deleteAddress(@PathVariable("id") Long addressId) {
		Optional<Address> existingAddress = addressService.getAddressById(addressId);
		if (!existingAddress.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		addressService.deleteAddress(addressId);
		return ResponseEntity.ok().build();
	}
	
	@PutMapping("/updateAddress/{id}")
	public ResponseEntity<Address> updateAddress(@PathVariable("id") Long addressId, @RequestBody Address address) {
		Optional<Address> existingAddress = addressService.getAddressById(addressId);
		if(!existingAddress.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		Address newAddress = new Address();
		newAddress.setAddressId(address.getAddressId());
		newAddress.setStreet(address.getStreet());
		newAddress.setCity(address.getCity());
		newAddress.setState(address.getState());
		newAddress.setCountry(address.getCountry());
		newAddress.setZip(address.getZip());
		newAddress.setUserId(address.getUserId());
		addressService.update(newAddress);
		return new ResponseEntity<>(newAddress, HttpStatus.OK);
	}
}
