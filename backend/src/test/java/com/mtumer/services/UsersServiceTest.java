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

import com.mtumer.entity.Users;
import com.mtumer.repo.UserRepo;

@RunWith(MockitoJUnitRunner.class)
public class UsersServiceTest {
	@InjectMocks
	UsersService service;

	@Mock
	UserRepo repo;

	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	@DisplayName("Test findAll Success")
	void testGetAllUsers() {
		List<Users> users = new ArrayList<Users>();
		Users user1 = new Users();
		user1.setFirstName("John");
		user1.setLastName("Smith");
		user1.setEmail("jsmith@gmail.com");

		Users user2 = new Users();
		user2.setFirstName("Bob");
		user2.setLastName("Clarke");
		user2.setEmail("bclarke@gmail.com");

		users.add(user1);
		users.add(user2);

		when(repo.findAll()).thenReturn(users);

		// test
		List<Users> userList = service.getAllUsers();

		// assert
		assertEquals(userList, users);
		Assertions.assertEquals(2, userList.size(), "findAll should return 2 users.");
		verify(repo, times(1)).findAll();
	}

	@Test
	@DisplayName("Test createUser and save Success")
	void testCreateOrSaveUser() {
		Users user1 = new Users();
		user1.setFirstName("John");
		user1.setLastName("Smith");
		user1.setEmail("jsmith@gmail.com");

		when(repo.save(ArgumentMatchers.any(Users.class))).thenReturn(user1);

		// test
		Users created = service.createUser(user1);

		// assert
		assertThat(created.getEmail()).isSameAs(user1.getEmail());
		Assertions.assertNotNull(created,"The saved user should not be null");
		verify(repo, times(1)).save(user1);
	}

	@Test
	@DisplayName("Test findById Success")
	void testGetUserById() {
		Users user1 = new Users();
		user1.setUserId(45L);
		user1.setFirstName("John");
		user1.setLastName("Smith");
		user1.setEmail("jsmith@gmail.com");
		service.createUser(user1);
		when(repo.findById(user1.getUserId())).thenReturn(Optional.of(user1));

		// test
		Optional<Users> expected = service.getUserById(user1.getUserId());

		// assert
		Assertions.assertTrue(expected.isPresent(),"User was not found.");
		Assertions.assertSame(expected.get(), user1, "The user returned was not the same as the mock.");
		verify(repo).findById(user1.getUserId());
		
	}
	
	@Test
	@DisplayName("Test findById Not Found")
	void testFindByIdNotFound() {
		when(repo.findById(1l)).thenReturn(Optional.empty());
		
		//test
		Optional<Users> expected = service.getUserById(1l);
		
		//assert
		Assertions.assertFalse(expected.isPresent(), "User shouldn't exist, but was returned anyway.");
	}

	@Test
	@DisplayName("Test deleteById Success")
	void testDeleteUser() {
		Users user1 = new Users();
		user1.setUserId(45L);
		user1.setFirstName("John");
		user1.setLastName("Smith");
		user1.setEmail("jsmith@gmail.com");
		service.createUser(user1);
		// test
		service.deleteUser(user1.getUserId());
		verify(repo, times(1)).deleteById(user1.getUserId());

	}

	@Test
	@DisplayName("Test update Success")
	void testUpdateUser() {
		Users user1 = new Users();
		user1.setUserId(45L);
		user1.setFirstName("John");
		user1.setLastName("Smith");
		user1.setEmail("jsmith@gmail.com");
		service.createUser(user1);

		user1.setFirstName("Johnathan");

		// test
		service.update(user1);
		verify(repo).saveAndFlush(user1);
		
		//Assert 
		assertEquals("Johnathan",user1.getFirstName());
	}
}