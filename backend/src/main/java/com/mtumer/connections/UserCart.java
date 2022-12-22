package com.mtumer.connections;


import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;


@Entity
@Table(name="usercart")
@Data
public class UserCart {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="usercart_id")
	private Long usercart_id;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private Users user_id;
	
	@JsonIgnore
	@OneToMany(mappedBy = "usercart_id", fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Cart>cart;
	
	
	
}
