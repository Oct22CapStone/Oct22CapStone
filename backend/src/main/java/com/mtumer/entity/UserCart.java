package com.mtumer.entity;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Table(name = "usercart")
@Data
public class UserCart {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "userCart_id")
	private Long userCartId;

	@ManyToOne
	@JoinColumn(name = "userId")
	private Users userId;

	@JsonIgnore
	@OneToMany(mappedBy = "userCartId", fetch = FetchType.LAZY, orphanRemoval = true)
	private List<Cart> cart;

}