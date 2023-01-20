package com.mtumer.services;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.mtumer.entity.Address;
import com.mtumer.entity.Roles;
import com.mtumer.entity.Users;

import com.mtumer.repo.RolesRepo;
import com.mtumer.repo.UserRepo;

@Service
public class UsersService {

	@Autowired
	UserRepo usersRepo;

	public List<Users> getAllUsers() {
		return usersRepo.findAll();
	}
	
	public Boolean userExistsByEmail(String email) {
		List<Users> userList = usersRepo.findAll();
		
		for (Users users : userList) {
			if(users.getEmail() != null) {
//				System.out.println((users.getEmail().toString()).equals(email));
				if((users.getEmail().toString()).equals(email)) {
					return true;					
				}
			}
		}
		return false;
	}
	
	public Users getUserByEmail(String email) {
		List<Users> userList = usersRepo.findAll();
		Users user = new Users();
		for (Users users : userList) {
			if(users.getEmail() != null) {
//				System.out.println((users.getEmail().toString()).equals(email));
				if((users.getEmail().toString()).equals(email)) {
					user = users;
					return user;					
				}
			}
		}
		return null;
	}

	public Users createUser(Users user) {


		Users newUser = new Users();
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setEmail(user.getEmail());
		newUser.setPhone(user.getPhone());
		newUser = usersRepo.save(newUser);
		return newUser;
	}

	public Optional<Users> getUserById(Long id) {
		return usersRepo.findById(id);
	}

	public void update(Users user) {
		usersRepo.saveAndFlush(user);
	}

	public void deleteUser(Long userId) {
		usersRepo.deleteById(userId);
	}
}