package com.mtumer.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.EnumSet;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
	@JoinColumn(name="user_id")
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
	
	@Column(name="acc_status")
	private int acc_status;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Address>addresses;
	
	@JsonIgnore
	@OneToMany(mappedBy = "userOrder", fetch = FetchType.LAZY, orphanRemoval = true)
    private List<UserOrders>userOrder;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user_id", fetch = FetchType.LAZY, orphanRemoval = true)
    private List<UserCart>userCart;
	
	@JsonIgnore
	@ManyToMany(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	@JoinTable(name="user_roles", joinColumns=@JoinColumn(name="user_id", referencedColumnName = "user_id"),
		inverseJoinColumns=@JoinColumn(name="role_id", referencedColumnName = "role_id"))
		private Set<Roles> roles;
		
}
