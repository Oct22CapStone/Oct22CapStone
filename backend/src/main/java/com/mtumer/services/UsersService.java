package com.mtumer.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtumer.entity.Address;
import com.mtumer.entity.Users;
import com.mtumer.repo.UserRepo;

@Service
public class UsersService {

	@Autowired
	UserRepo usersRepo;

	public List<Users> getAllUsers() {
		List<Users> userList = usersRepo.findAll();

		if (userList.size() > 0) {
			return userList;
		} else {
			return new ArrayList<Users>();
		}
	}

	public Users createUser(Users user) {

		Users newUser = new Users();
		newUser.setUsername(user.getUsername());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setEmail(user.getEmail());
		newUser.setPhone(user.getPhone());
		newUser.setPassword(user.getPassword());
		newUser.setAccRole(user.getAccRole());
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
