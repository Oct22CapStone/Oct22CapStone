package com.mtumer.controller;

import java.util.List;
import java.util.Optional;
import java.util.Set;

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

import com.mtumer.entity.Roles;
import com.mtumer.services.RoleService;

@CrossOrigin(origins = {"https://vehiclevault.azurewebsites.net", "http://localhost:3000"})
@RestController
@RequestMapping("/roles")
public class RolesController {

	@Autowired
	RoleService roleService;

	@GetMapping("/show")
	public ResponseEntity<List<Roles>> getAllRoles() {
		List<Roles> roleList = roleService.getAllRoles();
		return new ResponseEntity<List<Roles>>(roleList, HttpStatus.OK);
	}

	@GetMapping("/show/{id}")
	public ResponseEntity<Roles> getById(@PathVariable("id") Integer roleId) {
		Optional<Roles> role = roleService.getRoleById(roleId);
		if (!role.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return new ResponseEntity<>(role.get(), HttpStatus.OK);

	}

	@PostMapping("/save")
	public ResponseEntity<Roles> createRole(@RequestBody Roles role) {
		Roles savedRole = roleService.createRole(role);
		return new ResponseEntity<Roles>(savedRole, HttpStatus.CREATED);
	}

	@PutMapping("/update/{roleId}")
	public ResponseEntity<Roles> updateRole(@PathVariable("roleId") Integer roleId, @RequestBody Roles role) {
		Optional<Roles> updateRole = roleService.getRoleById(roleId);
		if (!updateRole.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		Roles newRole = new Roles();
		newRole.setRoleId(roleId);
		newRole.setRoleName(role.getRoleName());
		roleService.update(newRole);
		return new ResponseEntity<>(newRole, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{roleId}")
	public ResponseEntity<Roles> deleteRole(@PathVariable("roleId") Integer roleId) {
		Optional<Roles> roleRemoved = roleService.getRoleById(roleId);
		if (!roleRemoved.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		roleService.deleteRole(roleId);
		return ResponseEntity.ok().build();
	}

}
