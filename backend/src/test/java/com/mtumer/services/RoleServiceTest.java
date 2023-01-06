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

import com.mtumer.entity.Roles;
import com.mtumer.entity.Users;
import com.mtumer.repo.RolesRepo;

@RunWith(MockitoJUnitRunner.class)
public class RoleServiceTest {
	
	@InjectMocks
	RoleService service;

	@Mock
	RolesRepo repo;
	
	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);
	}
	
	@Test
	@DisplayName("Test findAll Success")
	void testGetAllRoles() {	
		List<Roles> Roles = new ArrayList<Roles>();
		Roles role1 = new Roles();
		role1.setRoleName("Admin");

		Roles role2 = new Roles();
		role2.setRoleName("Customer");

		Roles.add(role1);
		Roles.add(role2);
		when(repo.findAll()).thenReturn(Roles);

		// test
		List<Roles> roleList = service.getAllRoles();

		// assert
		assertEquals(roleList, Roles);
		Assertions.assertEquals(2, roleList.size(), "findAll should return 2 Roles");
		verify(repo, times(1)).findAll();
	}
	
	@Test
	@DisplayName("Test createRoles and save Success")
	void testCreateOrSaveRoles() {
		Roles role1 = new Roles();
		role1.setRoleName("Admin");
		when(repo.save(ArgumentMatchers.any(Roles.class))).thenReturn(role1);

		// test
		Roles created = service.createRole(role1);

		// assert
		assertThat(created.getRoleId()).isSameAs(role1.getRoleId());
		Assertions.assertNotNull(created,"The saved Role should not be null");
		verify(repo, times(1)).save(role1);
	}

	@Test
	@DisplayName("Test findById Success")
	void testGetRolesById() {
		Roles role1 = new Roles();
		role1.setRoleName("Admin");
		service.createRole(role1);
		when(repo.findById(role1.getRoleId())).thenReturn(Optional.of(role1));

		// test
		Optional<Roles> expected = service.getRoleById(role1.getRoleId());

		// assert
		Assertions.assertTrue(expected.isPresent(),"Role was not found.");
		Assertions.assertSame(expected.get(), role1, "The Role returned was not the same as the mock.");
		verify(repo).findById(role1.getRoleId());
		
	}
	
	@Test
	@DisplayName("Test findById Not Found")
	void testFindByIdNotFound() {
		when(repo.findById(1)).thenReturn(Optional.empty());
		
		//test
		Optional<Roles> expected = service.getRoleById(1);
		
		//assert
		Assertions.assertFalse(expected.isPresent(), "Role shouldn't exist, but was returned anyway.");
	}

	@Test
	@DisplayName("Test deleteById Success")
	void testDeleteRoles() {
		Roles role1 = new Roles();
		role1.setRoleName("Admin");
		service.createRole(role1);
		// test
		service.deleteRole(role1.getRoleId());
		verify(repo, times(1)).deleteById(role1.getRoleId());

	}

	@Test
	@DisplayName("Test update Success")
	void testUpdateRoles() {
		Roles role1 = new Roles();
		role1.setRoleName("Admin");
		service.createRole(role1);

		role1.setRoleName("Customer");

		// test
		service.update(role1);
		verify(repo).saveAndFlush(role1);
		
		//Assert
		assertEquals("Customer",role1.getRoleName());
	}
}
