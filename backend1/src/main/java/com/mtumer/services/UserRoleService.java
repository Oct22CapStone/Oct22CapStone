package com.mtumer.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtumer.entity.UserRole;
import com.mtumer.repo.UserRoleRepo;

@Service
public class UserRoleService {

	
	@Autowired
	UserRoleRepo userRoleRepo;
	
	public List<UserRole> getAllUserRoles(){
		return userRoleRepo.findAll();
		
	}
	
	public UserRole createUserRole(UserRole userRole) {
		UserRole newUserRole=new UserRole();
		newUserRole.setRole(userRole.getRole());
		newUserRole.setUser(userRole.getUser());
		newUserRole = userRoleRepo.save(newUserRole);
		return newUserRole;
	}
	
	public Optional<UserRole> getUserRoleById(Long userRoleId){
		return userRoleRepo.findById(userRoleId);
	}
	
	public void update(UserRole userRole) {
		userRoleRepo.saveAndFlush(userRole);
		
	}
	
	public void deleteUserRole(Long userRole) {
		userRoleRepo.deleteById(userRole);
	}
}
