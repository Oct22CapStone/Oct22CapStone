/** 
 * Install Brew: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
 * Info : brew info rabbitmq
 * Start node in foreground: CONF_ENV_FILE="/usr/local/etc/rabbitmq/rabbitmq-env.conf" /usr/local/opt/rabbitmq/sbin/rabbitmq-server
 * Start node in background: brew services start rabbitmq
 * stop server: brew services stop rabbitmq
 * or CLI tools directly: /opt/homebrew/opt/rabbitmq/sbin/rabbitmqctl shutdown

Compile both with RabbitMQ java client on classpath: 
>>>> javac -cp amqp-client-5.7.1.jar Sender.java Receiver.java

To run them, you'll need rabbitmq-client.jar and its dependencies on the classpath. In a terminal, run the consumer (receiver):
>>>> java -cp .:amqp-client-5.7.1.jar:slf4j-api-1.7.26.jar:slf4j-simple-1.7.26.jar Recv

then, run the publisher (sender):
>>>> java -cp .:amqp-client-5.7.1.jar:slf4j-api-1.7.26.jar:slf4j-simple-1.7.26.jar Send

 */


package com.mtumer.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mtumer.entity.Product;
import com.mtumer.services.ProductService;
//import com.mtumer.services.RabbitSender;
import com.mtumer.services.RabbitSender;

@RestController
@CrossOrigin(origins = {"https://vehiclevault.azurewebsites.net", "http://localhost:3000"})
@RequestMapping("/product")
public class ProductController {
	
//	@Autowired
//	RabbitSender sender;

	@Autowired
	ProductService productService;
	
	@Autowired
	RabbitSender sender;

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
		if (savedProduct.getProductQty() <= 3) {
			sender.send(savedProduct);
	
		}
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
		newProduct.setProductQty(product.getProductQty());
		newProduct.setShowProduct(product.isShowProduct()); // added
		productService.update(newProduct);
		if(newProduct.getProductQty() <= 3) {
			Product p = new Product();
			p.setProductId(productId);
			p.setProductName(newProduct.getProductName());
			p.setProductQty(newProduct.getProductQty());
			sender.send(p);
			/*producer(p.getProductName(), p.getProductQty());*/
		}
		return new ResponseEntity<>(newProduct, HttpStatus.OK);
	}
	@GetMapping("/api")
	public String producer(@RequestParam("productName") String productName, @RequestParam("productQty") Integer productQty) {
		return "Product name: " + productName + " is currently at stock of: " + productQty + " please take necessary actions.";
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
