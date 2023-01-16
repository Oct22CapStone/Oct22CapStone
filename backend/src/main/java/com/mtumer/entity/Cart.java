package com.mtumer.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;



import lombok.Data;

@Entity
@Table(name="cart")
@Data
public class Cart {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="cart_id")
	private Long cartId;
	
	@Column(name="qty")
	private int qty;
	
	@OneToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="productId")
	private Product productId;
	
	
	@ManyToOne
	@JoinColumn(name="userCartId")
	private UserCart userCartId;
}