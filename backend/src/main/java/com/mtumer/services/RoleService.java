package com.mtumer.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.mtumer.entity.Roles;
import com.mtumer.repo.RolesRepo;
import com.mtumer.repo.UserRepo;

@Service
public class RoleService {
	
	@Autowired
	RolesRepo rolesRepo;
	
	@Autowired
	UserRepo userRepo;
	
	public List<Roles> getAllRoles() {
		return rolesRepo.findAll();
	}
	
	public Roles createRole(Roles role) {
		Roles newRole = new Roles();
		newRole.setRoleName(role.getRoleName());
		newRole = rolesRepo.save(newRole);
		return newRole;
	}
	
	public Optional<Roles> getRoleById(Integer roleId) {
		return rolesRepo.findById(roleId);
		
	}
	
	public void update(Roles role) {
		rolesRepo.saveAndFlush(role);
	}
	
	public void deleteRole(Integer roleId) {
		rolesRepo.deleteById(roleId);
	}
	
	
	
	

}
