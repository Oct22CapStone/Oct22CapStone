package com.mtumer.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
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
	void testGetAllUsers() {
		List<Users> users = new ArrayList<Users>();
		Users user1 = new Users();
		user1.setUsername("jsmith");
		user1.setFirstName("John");
		user1.setLastName("Smith");
		user1.setEmail("jsmith@gmail.com");
		user1.setPhone("1234567890");
		user1.setPassword("js1234");

		Users user2 = new Users();
		user1.setUsername("Bobc");
		user1.setFirstName("Bob");
		user1.setLastName("Clarke");
		user1.setEmail("bclarke@gmail.com");
		user1.setPhone("0987654321");
		user1.setPassword("bc1234");

		users.add(user1);
		users.add(user2);

		when(repo.findAll()).thenReturn(users);

		// test
		List<Users> userList = service.getAllUsers();

		// assert
		assertEquals(userList, users);
		verify(repo, times(1)).findAll();
	}

	@Test
	void testCreateOrSaveUser() {
		Users user1 = new Users();
		user1.setUsername("jsmith");
		user1.setFirstName("John");
		user1.setLastName("Smith");
		user1.setEmail("jsmith@gmail.com");
		user1.setPhone("1234567890");
		user1.setPassword("js1234");

		when(repo.save(ArgumentMatchers.any(Users.class))).thenReturn(user1);

		// test
		Users created = service.createUser(user1);

		// assert
		assertThat(created.getUsername()).isSameAs(user1.getUsername());
		verify(repo, times(1)).save(user1);
	}

	@Test
	void testGetUserById() {
		Users user1 = new Users();
		user1.setUserId(45L);
		user1.setUsername("jsmith");
		user1.setFirstName("John");
		user1.setLastName("Smith");
		user1.setEmail("jsmith@gmail.com");
		user1.setPhone("1234567890");
		user1.setPassword("js1234");
		service.createUser(user1);
		when(repo.findById(user1.getUserId())).thenReturn(Optional.of(user1));

		// test
		Optional<Users> expected = service.getUserById(user1.getUserId());

		// assert
		assertThat(expected.get()).isSameAs(user1);
		verify(repo).findById(user1.getUserId());
		
	}

	@Test
	void testDeleteUser() {
		Users user1 = new Users();
		user1.setUserId(45L);
		user1.setUsername("jsmith");
		user1.setFirstName("John");
		user1.setLastName("Smith");
		user1.setEmail("jsmith@gmail.com");
		user1.setPhone("1234567890");
		user1.setPassword("js1234");
		service.createUser(user1);
		// test
		service.deleteUser(user1.getUserId());
		verify(repo, times(1)).deleteById(user1.getUserId());

	}

	@Test
	void testUpdateUser() {
		Users user1 = new Users();
		user1.setUserId(45L);
		user1.setUsername("jsmith");
		user1.setFirstName("John");
		user1.setLastName("Smith");
		user1.setEmail("jsmith@gmail.com");
		user1.setPhone("1234567890");
		user1.setPassword("js1234");
		service.createUser(user1);

		user1.setPhone("1235738456");

		// test
		service.update(user1);
		verify(repo).saveAndFlush(user1);
		
		//Assert that new phone number is saved
		assertEquals("1235738456",user1.getPhone());
	}
}
