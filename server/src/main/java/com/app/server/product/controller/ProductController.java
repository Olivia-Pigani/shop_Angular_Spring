package com.app.server.product.controller;


import com.app.server.product.domain.dto.ProductRequestDto;
import com.app.server.product.domain.dto.ProductResponseDto;
import com.app.server.product.domain.dto.ReviewResponseDto;
import com.app.server.product.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

  private final ProductService productService;

  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PostMapping
  public ResponseEntity<ProductResponseDto> saveProduct(@RequestBody ProductRequestDto productRequestDto) {
    return new ResponseEntity<>(productService.saveProduct(productRequestDto), HttpStatus.CREATED);
  }


  @GetMapping
  public ResponseEntity<List<ProductResponseDto>> getAllProducts() {
    return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
  }

  @GetMapping("/{productId}")
  public ResponseEntity<ProductResponseDto> findProductById(@PathVariable Long productId) {
    return new ResponseEntity<>(productService.findProductById(productId), HttpStatus.OK);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PutMapping("/{productId}")
  public ResponseEntity<ProductResponseDto> updateProductById(@RequestBody ProductRequestDto productRequestDto, @PathVariable Long productId) {
    return new ResponseEntity<>(productService.updateProductById(productId, productRequestDto), HttpStatus.ACCEPTED);
  }

  @GetMapping("/{productId}/reviews")
  public ResponseEntity<List<ReviewResponseDto>> getAllReviewByProductId(@PathVariable Long productId) {
    return new ResponseEntity<>(productService.getAllReviewByProductId(productId), HttpStatus.OK);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @DeleteMapping("/{productId}")
  public ResponseEntity<String> deleteProductById(@PathVariable Long productId) {
    return new ResponseEntity<>(productService.deleteProductById(productId), HttpStatus.ACCEPTED);
  }


}
