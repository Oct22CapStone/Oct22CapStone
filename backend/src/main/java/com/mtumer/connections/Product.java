package com.mtumer.connections;

import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name="product")
@Data
public class Product {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="productid")
	private Long productId;
	
	@Column(name="productQty")
	private int productQty;
	
	@Column(name="product_name")
	private String productName;
	
	@Column(name="productimg")
	private byte[] productImg;
	
	@Column(name="price_per_unit")
	private double price_per_unit;
	
	@Column(name="productdesc")
	private String productDescription;
	
}
