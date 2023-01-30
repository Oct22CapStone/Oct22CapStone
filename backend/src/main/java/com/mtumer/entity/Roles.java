package com.mtumer.entity;


import java.util.List;


import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


import lombok.Data;

@Entity
@Table(name="roles")
@Data
public class Roles {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="role_id")
	private Integer roleId;
	
	@Column(name="role_name")
	private String roleName;
	
	@JsonIgnore
	@OneToMany(mappedBy = "role")
	private List<UserRole> user;
	
}