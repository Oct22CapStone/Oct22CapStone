package com.mtumer.controller;

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

import com.mtumer.services.UserRoleService;
import com.mtumer.entity.UserRole;

@CrossOrigin(origins = {"https://vehiclevault.azurewebsites.net", "http://localhost:3000"})
@RestController
@RequestMapping("/user_role")
public class UserRoleController {

	@Autowired
	UserRoleService userRoleService;

	@GetMapping("/show")
	public ResponseEntity<List<UserRole>> getAllUserRoles() {
		List<UserRole> userRoleList = userRoleService.getAllUserRoles();
		return new ResponseEntity<List<UserRole>>(userRoleList, HttpStatus.OK);
	}

	@GetMapping("/show/{id}")
	public ResponseEntity<UserRole> getUserRoleById(@PathVariable Long id) {
		Optional<UserRole> userRole = userRoleService.getUserRoleById(id);
		if (!userRole.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return new ResponseEntity<>(userRole.get(), HttpStatus.OK);
	}

	@PostMapping("/save")
	public ResponseEntity<UserRole> createUserRole(@RequestBody UserRole userRole) {
		UserRole savedUserRole = userRoleService.createUserRole(userRole);
		return new ResponseEntity<UserRole>(savedUserRole, HttpStatus.CREATED);
	}

	@PutMapping("/update/{user_role_id}")
	public ResponseEntity<UserRole> updateUser(@PathVariable("user_role_id") Long user_role_id,
			@RequestBody UserRole userRole) {
		Optional<UserRole> updateUserRole = userRoleService.getUserRoleById(user_role_id);
		if (!updateUserRole.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		UserRole newUserRole = new UserRole();
		newUserRole.setUserRoleId(user_role_id);
		newUserRole.setRole(userRole.getRole());
		newUserRole.setUser(userRole.getUser());
		userRoleService.update(newUserRole);
		return new ResponseEntity<>(newUserRole, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{user_role_id}")
	public ResponseEntity<UserRole> deleteUserRole(@PathVariable("user_role_id") Long user_role_id) {
		Optional<UserRole> userRoleRemoved = userRoleService.getUserRoleById(user_role_id);
		if (!userRoleRemoved.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		userRoleService.deleteUserRole(user_role_id);
		return ResponseEntity.ok().build();
	}

}
