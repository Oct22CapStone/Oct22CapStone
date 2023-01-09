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

import com.mtumer.entity.UserRole;
import com.mtumer.entity.Users;
import com.mtumer.repo.UserRoleRepo;

@RunWith(MockitoJUnitRunner.class)
public class UserRoleServiceTest {
	
	@InjectMocks
	UserRoleService service;

	@Mock
	UserRoleRepo repo;
	
	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);
	}
	
	@Test
	@DisplayName("Test findAll Success")
	void testGetAllUserRolees() {
		Users user1= new Users();
		user1.setUserId(25L);
		
		List<UserRole> userRoles = new ArrayList<UserRole>();
		UserRole userRole1 = new UserRole();
		userRole1.setUser(user1);
		userRole1.setUserRoleId(1l);
		
		Users user2= new Users();
		user2.setUserId(26L);

		UserRole userRole2 = new UserRole();
		userRole2.setUser(user2);
		userRole2.setUserRoleId(2l);

		userRoles.add(userRole1);
		userRoles.add(userRole2);
		when(repo.findAll()).thenReturn(userRoles);

		// test
		List<UserRole> uroleList = service.getAllUserRoles();

		// assert
		assertEquals(uroleList, userRoles);
		Assertions.assertEquals(2, uroleList.size(), "findAll should return 2 User Roles");
		verify(repo, times(1)).findAll();
	}
	
	@Test
	@DisplayName("Test createUserRole and save Success")
	void testCreateOrSaveUserRole() {
		Users user1= new Users();
		user1.setUserId(25L);
		
		UserRole userRole1 = new UserRole();
		userRole1.setUser(user1);
		when(repo.save(ArgumentMatchers.any(UserRole.class))).thenReturn(userRole1);

		// test
		UserRole created = service.createUserRole(userRole1);

		// assert
		assertThat(created.getUserRoleId()).isSameAs(userRole1.getUserRoleId());
		Assertions.assertNotNull(created,"The saved User Role should not be null");
		verify(repo, times(1)).save(userRole1);
	}

	@Test
	@DisplayName("Test findById Success")
	void testGetUserRoleById() {
		Users user1= new Users();
		user1.setUserId(25L);
		
		UserRole userRole1 = new UserRole();
		userRole1.setUser(user1);
		userRole1.setUserRoleId(1l);
		service.createUserRole(userRole1);
		when(repo.findById(userRole1.getUserRoleId())).thenReturn(Optional.of(userRole1));

		// test
		Optional<UserRole> expected = service.getUserRoleById(userRole1.getUserRoleId());

		// assert
		Assertions.assertTrue(expected.isPresent(),"User Role was not found.");
		Assertions.assertSame(expected.get(), userRole1, "The User Role returned was not the same as the mock.");
		verify(repo).findById(userRole1.getUserRoleId());
		
	}
	
	@Test
	@DisplayName("Test findById Not Found")
	void testFindByIdNotFound() {
		when(repo.findById(1l)).thenReturn(Optional.empty());
		
		//test
		Optional<UserRole> expected = service.getUserRoleById(1l);
		
		//assert
		Assertions.assertFalse(expected.isPresent(), "User Role shouldn't exist, but was returned anyway.");
	}

	@Test
	@DisplayName("Test deleteById Success")
	void testDeleteUserRole() {
		Users user1= new Users();
		user1.setUserId(25L);
		
		UserRole userRole1 = new UserRole();
		userRole1.setUser(user1);
		userRole1.setUserRoleId(1l);
		service.createUserRole(userRole1);
		// test
		service.deleteUserRole(userRole1.getUserRoleId());
		verify(repo, times(1)).deleteById(userRole1.getUserRoleId());

	}

	@Test
	@DisplayName("Test update Success")
	void testUpdateUserRole() {
		Users user1= new Users();
		user1.setUserId(25L);
		
		UserRole userRole1 = new UserRole();
		userRole1.setUser(user1);
		userRole1.setUserRoleId(1l);
		service.createUserRole(userRole1);

		userRole1.setUserRoleId(2l);

		// test
		service.update(userRole1);
		verify(repo).saveAndFlush(userRole1);
		
		//Assert
		assertEquals(2l,userRole1.getUserRoleId());
	}
}
