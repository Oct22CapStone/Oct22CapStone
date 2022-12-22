package com.mtumer.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtumer.connections.Product;
import com.mtumer.repo.ProductRepo;

@Service
public class ProductService {

	@Autowired
	ProductRepo productRepo;
	
	public List<Product> getAllProduct(){
		List<Product> productList = productRepo.findAll();
		
		if(productList.size() > 0) {
			return productList;
		} else {
			return new ArrayList<Product>();
		}
	}
	
	public Product createProduct(Product product) {
		Product newProduct = new Product();
		newProduct.setProductQty(product.getProductQty());
		newProduct.setProductName(product.getProductName());
		newProduct.setProductImg(product.getProductImg());
		newProduct.setPrice_per_unit(product.getPrice_per_unit());
		newProduct.setProductDescription(product.getProductDescription());
		newProduct = productRepo.save(newProduct);
		return newProduct;
	}
	
	
	public Optional<Product> getProductById(Long productid) {
		return productRepo.findById(productid);
	}
	
	
	public void update(Product product) {
		productRepo.saveAndFlush(product);
	}
	
	public void deleteProduct(Long productid) {
		productRepo.deleteById(productid);
	}
	
}
