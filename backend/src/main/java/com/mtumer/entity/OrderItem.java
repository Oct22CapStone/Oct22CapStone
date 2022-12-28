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
@Table(name="order_item")
@Data
public class OrderItem {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="order_item_id")
	private Long order_item_id;
	
	@Column(name="product_qty")
	private int product_qty;
	
	@ManyToOne
	@JoinColumn(name="order_id", nullable=false)
	private UserOrders order_id;
	
	@OneToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="productId", nullable=false)
	private Product productId;

	
	
	
}
