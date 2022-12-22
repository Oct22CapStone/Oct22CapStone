package com.mtumer.connections;

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
	private Long cart_id;
	
	@Column(name="qty")
	private int qty;
	
	@OneToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="productid")
	private Product productid;
	
	
	@ManyToOne
	@JoinColumn(name="usercart_id")
	private UserCart usercart_id;
}
