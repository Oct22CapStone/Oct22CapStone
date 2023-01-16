package com.mtumer.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;

@Entity
@Table(name="user_role")
@Data
public class UserRole {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="user_role_id")
	private Long userRoleId;
	

	@ManyToOne
	@JoinColumn(name="userId")
	private Users user;
	

	@ManyToOne
	@JoinColumn(name="roleId")
	private Roles role;
	
}