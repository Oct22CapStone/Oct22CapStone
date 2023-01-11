package com.mtumer.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import com.mtumer.entity.Address;
import com.mtumer.repo.AddressRepo;

@RunWith(MockitoJUnitRunner.class)
public class AddressServiceTest {

	@InjectMocks
	AddressService service;

	@Mock
	AddressRepo repo;
	
	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);
	}
	
	@Test
	@DisplayName("Test findAll Success")
	void testGetAllAddresses() {
		List<Address> addresses = new ArrayList<Address>();
		Address address1 = new Address();
		address1.setStreet("12 Main Street");
		address1.setCity("Nashville");
		address1.setState("TN");
		address1.setCountry("USA");
		address1.setZip("45842");

		Address address2 = new Address();
		address2.setStreet("13 South Street");
		address2.setCity("New York");
		address2.setState("NY");
		address2.setCountry("USA");
		address2.setZip("84723");

		addresses.add(address1);
		addresses.add(address2);
		when(repo.findAll()).thenReturn(addresses);

		// test
		List<Address> addrList = service.getAllAddress();

		// assert
		assertEquals(addrList, addresses);
		Assertions.assertEquals(2, addrList.size(), "findAll should return 2 addresses");
		verify(repo, times(1)).findAll();
	}
	
	@Test
	@DisplayName("Test createAddress and save Success")
	void testCreateOrSaveAddress() {
		Address address1 = new Address();
		address1.setStreet("12 Main Street");
		address1.setCity("Nashville");
		address1.setState("TN");
		address1.setCountry("USA");
		address1.setZip("45842");

		when(repo.save(ArgumentMatchers.any(Address.class))).thenReturn(address1);

		// test
		Address created = service.createAddress(address1);

		// assert
		assertThat(created.getAddressId()).isSameAs(address1.getAddressId());
		Assertions.assertNotNull(created,"The saved address should not be null");
		verify(repo, times(1)).save(address1);
	}

	@Test
	@DisplayName("Test findById Success")
	void testGetAddressById() {
		Address address1 = new Address();
		address1.setStreet("12 Main Street");
		address1.setCity("Nashville");
		address1.setState("TN");
		address1.setCountry("USA");
		address1.setZip("45842");
		service.createAddress(address1);
		when(repo.findById(address1.getAddressId())).thenReturn(Optional.of(address1));

		// test
		Optional<Address> expected = service.getAddressById(address1.getAddressId());

		// assert
		Assertions.assertTrue(expected.isPresent(),"Address was not found.");
		Assertions.assertSame(expected.get(), address1, "The address returned was not the same as the mock.");
		verify(repo).findById(address1.getAddressId());
		
	}
	
	@Test
	@DisplayName("Test findById Not Found")
	void testFindByIdNotFound() {
		when(repo.findById(1l)).thenReturn(Optional.empty());
		
		//test
		Optional<Address> expected = service.getAddressById(1l);
		
		//assert
		Assertions.assertFalse(expected.isPresent(), "Address shouldn't exist, but was returned anyway.");
	}

	@Test
	@DisplayName("Test deleteById Success")
	void testDeleteAddress() {
		Address address1 = new Address();
		address1.setStreet("12 Main Street");
		address1.setCity("Nashville");
		address1.setState("TN");
		address1.setCountry("USA");
		address1.setZip("45842");
		service.createAddress(address1);
		// test
		service.deleteAddress(address1.getAddressId());
		verify(repo, times(1)).deleteById(address1.getAddressId());

	}

	@Test
	@DisplayName("Test update Success")
	void testUpdateAddress() {
		Address address1 = new Address();
		address1.setStreet("12 Main Street");
		address1.setCity("Nashville");
		address1.setState("TN");
		address1.setCountry("USA");
		address1.setZip("45842");
		service.createAddress(address1);

		address1.setStreet("14 Main Street");

		// test
		service.update(address1);
		verify(repo).saveAndFlush(address1);
		
		//Assert 
		assertEquals("14 Main Street",address1.getStreet());
	}
}
