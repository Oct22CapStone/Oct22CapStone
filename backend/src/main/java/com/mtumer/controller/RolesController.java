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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/roles")
public class RolesController {

	@Autowired
	RoleService roleService;
	
	@GetMapping("/show")
	public ResponseEntity<Set<Roles>> getAllRoles(){
		Set<Roles> roleList = roleService.getAllRoles();
		return new ResponseEntity<Set<Roles>>(roleList, HttpStatus.OK);
	}
	
	@GetMapping("/show/{id}")
    public ResponseEntity<Roles> getById(@PathVariable Integer roleId) {
        Optional<Roles> role = roleService.getRoleById(roleId);
         return new ResponseEntity<>(role.get(), HttpStatus.OK);

    }
	
	@PostMapping("/save")
	public ResponseEntity<Roles> createRole(@RequestBody Roles role) {
		Roles savedRole = roleService.createRole(role);
		return new ResponseEntity<Roles>(savedRole, HttpStatus.OK);
	}
	
	@PutMapping("/update/{roleId}")
	public void updateRole(@PathVariable("roleId") Integer roleId, @RequestBody Roles role) {
		Roles updateRole = roleService.getRoleById(roleId).get();
		if(updateRole != null) {
			Roles newRole = new Roles();
			newRole.setRoleId(roleId);
			newRole.setRoleName(role.getRoleName());
			roleService.update(newRole);
		}
	}
	
	@DeleteMapping("/delete/{roleId}")
	public void deleteRole(@PathVariable("roleId") Integer roleId) {
		Roles roleRemoved = roleService.getRoleById(roleId).get();
		if(roleRemoved != null) {
			roleService.deleteRole(roleId);
		}
	}
		
}	
