package com.mtumer.entity;

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
@Table(name = "user_orders")
@Data
public class UserOrders {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "order_id")
	private Long orderId;

	@ManyToOne
	@JoinColumn(name = "userId", nullable = false)
	private Users userId;

	@Column(name = "order_date")
	private String orderDate;

	@Column(name = "tracking_info")
	private String trackingInfo;

	@Column(name = "total_price")
	private Double totalPrice;

	@OneToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "addressId")
	private Address addressId;

	@JsonIgnore
	@OneToMany(mappedBy = "orderId", fetch = FetchType.LAZY, orphanRemoval = true)
	private List<OrderItem> OrderItems;

}