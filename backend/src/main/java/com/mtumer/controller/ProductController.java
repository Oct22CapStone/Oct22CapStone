package com.mtumer.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mtumer.connections.Product;
import com.mtumer.services.ProductService;


@RestController
@RequestMapping("/product")
public class ProductController {

	@Autowired
	ProductService productService;
	
	
	@GetMapping
	public ResponseEntity<List<Product>> getAllProduct(){
		List<Product> productList = productService.getAllProduct();
		return new ResponseEntity<List<Product>>(productList, HttpStatus.OK);
	}
	
	
	@GetMapping("/{productid}")
	public ResponseEntity<Product> getByID(@PathVariable Long productid) {
		Optional<Product> product = productService.getProductById(productid);
		return new ResponseEntity<>(product.get(), HttpStatus.OK);
		
	}
	
	
	@PostMapping("/save_product")
	public ResponseEntity<Product> createProduct(@RequestBody Product product) {
		Product savedProduct = productService.createProduct(product);
		return new ResponseEntity<Product>(savedProduct,HttpStatus.OK);
		}
	
	@PutMapping("/update/{productid}")
	public void updateProduct(@PathVariable("productid") Long productid, @RequestBody Product product) {
		Product updateProduct = productService.getProductById(productid).get();
		if(updateProduct != null) {
			Product newProduct = new Product();
			newProduct.setProductId(productid);
			newProduct.setPrice_per_unit(product.getPrice_per_unit());
			newProduct.setProductDescription(product.getProductDescription());
			newProduct.setProductImg(product.getProductImg());
			newProduct.setProductName(product.getProductName());
			newProduct.setProductQty(product.getProductQty());
			productService.update(newProduct);
		}
	}
	
	
	@DeleteMapping("/delete/{productid}")
	public void deleteProduct(@PathVariable("productid") Long productid) {
		Product productRemoved = productService.getProductById(productid).get();
		
		if(productRemoved != null) {
			productService.deleteProduct(productid);
		}
	}
	
	
	
	
}
