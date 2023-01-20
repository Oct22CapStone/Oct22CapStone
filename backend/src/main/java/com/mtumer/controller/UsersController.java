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

import com.mtumer.services.UsersService;

@CrossOrigin(origins = {"https://vehiclevault.azurewebsites.net", "http://localhost:3000"})
@RestController
@RequestMapping("/userpage")
public class UsersController {

	@Autowired
	UsersService usersService;

	@GetMapping("/show")
	public ResponseEntity<List<Users>> getAllUsers() {
		List<Users> list = usersService.getAllUsers();
		return new ResponseEntity<List<Users>>(list, HttpStatus.OK);
	}

	@GetMapping("/check/{email}")
	public Boolean getByEmail(@PathVariable String email) {
		Boolean user = usersService.userExistsByEmail(email);
		if (user) {
			
			return true;			
		}
		return false;
		
	}
	

	@GetMapping("/userbyemail/{email}")
	public ResponseEntity<Users> getUserByEmail(@PathVariable String email) {
		Optional<Users> user = Optional.ofNullable(usersService.getUserByEmail(email));
		if (!user.isPresent()) {
			return ResponseEntity.notFound().build();
		}		
		return new ResponseEntity<>(user.get(), HttpStatus.OK);
	}

	@GetMapping("/show/{id}")
	public ResponseEntity<Users> getById(@PathVariable("id") Long id) {
		Optional<Users> user = usersService.getUserById(id);
		if (!user.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return new ResponseEntity<>(user.get(), HttpStatus.OK);

	}

	@PostMapping("/save")
	public ResponseEntity<Users> createUsers(@RequestBody Users user) {
		Users savedUser = usersService.createUser(user);
		return new ResponseEntity<Users>(savedUser, HttpStatus.CREATED);
	}

	@PutMapping("/update/{userId}")
	public ResponseEntity<Users> updateUser(@PathVariable("userId") Long userId, @RequestBody Users user) {
		Optional<Users> updateUser = usersService.getUserById(userId);
		if (!updateUser.isPresent()) {
			return ResponseEntity.notFound().build();

		}
		Users newUser = new Users();
		newUser.setUserId(userId);
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setEmail(user.getEmail());
		newUser.setPhone(user.getPhone());
		usersService.update(newUser);
		return new ResponseEntity<>(newUser, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{userId}")
	public ResponseEntity<Users> deleteUser(@PathVariable("userId") Long userId) {
		Optional<Users> userRemoved = usersService.getUserById(userId);
		if (!userRemoved.isPresent()) {
			return ResponseEntity.notFound().build();
		}

		usersService.deleteUser(userId);
		return ResponseEntity.ok().build();
	}

}