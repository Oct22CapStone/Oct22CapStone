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

import com.mtumer.entity.Product;
import com.mtumer.services.ProductService;

@RestController
@RequestMapping("/product")
public class ProductController {

	@Autowired
	ProductService productService;

	@GetMapping
	public ResponseEntity<List<Product>> getAllProduct() {
		List<Product> productList = productService.getAllProduct();
		return new ResponseEntity<List<Product>>(productList, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Product> getById(@PathVariable("id") Long productId) {
		Optional<Product> product = productService.getProductById(productId);
		if (!product.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return new ResponseEntity<>(product.get(), HttpStatus.OK);
	}

	@PostMapping("/save_product")
	public ResponseEntity<Product> createProduct(@RequestBody Product product) {
		Product savedProduct = productService.createProduct(product);
		return new ResponseEntity<Product>(savedProduct, HttpStatus.CREATED);
	}

	@PutMapping("/update/{productid}")
	public ResponseEntity<Product> updateProduct(@PathVariable("productid") Long productId,
			@RequestBody Product product) {
		Optional<Product> updateProduct = productService.getProductById(productId);
		if (!updateProduct.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		Product newProduct = new Product();
		newProduct.setProductId(productId);
		newProduct.setPricePerUnit(product.getPricePerUnit());
		newProduct.setProductDescription(product.getProductDescription());
		newProduct.setProductImg(product.getProductImg());
		newProduct.setProductName(product.getProductName());
		newProduct.setProductQty(product.getProductQty());
		productService.update(newProduct);
		return new ResponseEntity<>(newProduct, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Product> deleteProduct(@PathVariable("id") Long productId) {
		Optional<Product> productRemoved = productService.getProductById(productId);
		if (!productRemoved.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		productService.deleteProduct(productId);
		return ResponseEntity.ok().build();
	}

}
