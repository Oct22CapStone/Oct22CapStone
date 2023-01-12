package com.mtumer.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.List;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "users",uniqueConstraints=
@UniqueConstraint(columnNames={"email"}))
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Users {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Long userId;

	@Column(name = "uuname")
	private String username;

	@Column(name = "u_firstname")
	private String firstName;

	@Column(name = "u_lastname")
	private String lastName;

	@Column(name = "email")
	private String email;

	@Column(name = "password")
	private String password;
	
	@Column(name="acc_status")
	private int acc_status;
	
	@JsonIgnore
	@OneToMany(mappedBy = "userId", fetch = FetchType.LAZY, orphanRemoval = true)
	private List<Address> addresses;

	@JsonIgnore
	@OneToMany(mappedBy = "userId", fetch = FetchType.LAZY, orphanRemoval = true)
	private List<UserOrders> userOrder;

	@JsonIgnore
	@OneToMany(mappedBy = "userId", fetch = FetchType.LAZY, orphanRemoval = true)
	private List<UserCart> userCart;

	
	@JsonIgnore
	@OneToMany(mappedBy="user",cascade=CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
	private List<UserRole> role;

}