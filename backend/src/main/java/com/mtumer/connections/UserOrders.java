package com.mtumer.connections;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Table(name="user_orders")
@Data
public class UserOrders {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="order_id")
	private Long order_id;

	
	@ManyToOne
	@JoinColumn(name="user_id", nullable=false)
	private Users userOrder;
	
	@Column(name="order_date")
	private java.sql.Date order_date;
	
	@Column(name="tracking_info")
	private String tracking_info;
	
	@Column(name="total_price")
	private Double total_price;
	
	@OneToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="shipping_address")
	private Address address_id;
	
	
	@JsonIgnore
	@OneToMany(mappedBy = "order_id", fetch = FetchType.LAZY, orphanRemoval = true)
    private List<OrderItem>OrderItems;
	
	
}
