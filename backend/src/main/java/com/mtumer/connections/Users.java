package com.mtumer.connections;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Users {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="user_id")
	private Long user_id;

	@Column(name="uuname")
	private String username;
	
	@Column(name="u_firstname")
	private String firstName;
	
	@Column(name="u_lastname")
	private String lastName;
	
	@Column(name="email")
	private String email;
	
	@Column(name="phone")
	private String phone;
	
	@Column(name="password")
	private String password;
	
	@Column(name="acc_role")
	private String acc_role;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Address>addresses;
	
	@JsonIgnore
	@OneToMany(mappedBy = "userOrder", fetch = FetchType.LAZY, orphanRemoval = true)
    private List<UserOrders>userOrder;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user_id", fetch = FetchType.LAZY, orphanRemoval = true)
    private List<UserCart>userCart;
	
	
		
}
