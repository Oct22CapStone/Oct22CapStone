package com.mtumer.entity;

import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name="product")
@Data
public class Product {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="product_id")
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
	private double pricePerUnit;
	
	@Column(name="productdesc")
	private String productDescription;
	
	@Column(name="price_code")
	private String priceCode;

	
}