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

import com.mtumer.entity.Users;

import com.mtumer.repo.RolesRepo;
import com.mtumer.services.UsersService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/userpage")
public class UsersController {
	
	@Autowired
	UsersService usersService;
	
	@Autowired
	RolesRepo rolesRepo;
	
	
	@GetMapping("/show")
	public ResponseEntity<List<Users>> getAllUsers(){
		List<Users> list = usersService.getAllUsers();
		return new ResponseEntity<List<Users>>(list,HttpStatus.OK);
	}
	
	@GetMapping("/show/{id}")
    public ResponseEntity<Users> getById(@PathVariable Long id) {
        Optional<Users> user = usersService.getUserById(id);
         return new ResponseEntity<>(user.get(), HttpStatus.OK);

    }
		


	@PostMapping("/save")
	public ResponseEntity<Users> createUsers(@RequestBody Users user) {
		Users savedUser = usersService.createUser(user);
		return new ResponseEntity<Users>(savedUser,HttpStatus.OK);
	}
	
	@PutMapping("/update/{user_id}")
	public void updateUser(@PathVariable("user_id") Long user_id, @RequestBody Users user) {
		Users updateUser = usersService.getUserById(user_id).get();
		if(updateUser != null) {
			Users newUser = new Users();
			newUser.setUser_id(user_id);
			newUser.setFirstName(user.getFirstName());
			newUser.setLastName(user.getLastName());
			newUser.setPhone(user.getPhone());
			newUser.setPassword(user.getPassword());
			newUser.setEmail(user.getEmail());
			newUser.setUsername(user.getUsername());
			newUser.setAcc_status(user.getAcc_status());
			usersService.update(newUser);
		}
	}
	
	@DeleteMapping("/delete/{user_id}")
	public void deleteUser(@PathVariable("user_id") Long user_id) {
		Users userRemoved = usersService.getUserById(user_id).get();
		
		if (userRemoved!=null) {
			usersService.deleteUser(user_id);
		}
	}
	
	

	
}







