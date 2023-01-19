package com.mtumer.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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

	@Column(name = "u_firstname")
	private String firstName;

	@Column(name = "u_lastname")
	private String lastName;

	@Column(name = "email")
	private String email;

	@Column(name = "phone")
	private String phone;
	
	@JsonIgnore
	@OneToMany(mappedBy = "userId",cascade=CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Address> addresses;

	@JsonIgnore
	@OneToMany(mappedBy = "userId",cascade=CascadeType.ALL, fetch = FetchType.LAZY)
	private List<UserOrders> userOrder;

	@JsonIgnore
	@OneToMany(mappedBy = "userId",cascade=CascadeType.ALL, fetch = FetchType.LAZY)
	private List<UserCart> userCart;

	@JsonIgnore
	@OneToMany(mappedBy="user",cascade=CascadeType.ALL, fetch = FetchType.LAZY)
	private List<UserRole> role;
		
	

}