package com.mtumer.entity;

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
	
	@Column (name="show_product")
	private boolean showProduct;
	
	@Column(name="productQty")
	private int productQty;
	
	@Column(name="product_name")
	private String productName;
	
	@Column(name="productimg")
	private String productImg;
	
	@Column(name="price_per_unit")
	private double price_per_unit;
	
	@Column(name="productdesc")
	private String productDescription;
	
}

// test comment
