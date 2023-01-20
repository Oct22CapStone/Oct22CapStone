package com.mtumer.entity;

import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name = "address")
@Data
public class Address {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "address_id")
	private Long addressId;
	//comment
	@Column(name = "street")
	private String street;

	@Column(name = "city")
	private String city;

	@Column(name = "state")
	private String state;

	@Column(name = "country")
	private String country;

	@Column(name = "zip")
	private String zip;

	@ManyToOne
	@JoinColumn(name = "userId", nullable = false)
	private Users userId;

}
