package com.app.server.product.service;

import com.app.server.product.domain.dto.ProductRequestDto;
import com.app.server.product.domain.dto.ProductResponseDto;
import com.app.server.product.domain.dto.ReviewResponseDto;
import com.app.server.product.domain.entity.Product;
import com.app.server.product.domain.entity.Review;
import com.app.server.product.domain.mapper.ProductMapper;
import com.app.server.product.domain.mapper.ReviewMapper;
import com.app.server.product.repository.ProductRepository;
import com.app.server.product.repository.ReviewRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.lang.String.format;

@Service
public class ProductService {

  private final ProductRepository productRepository;

  private final ReviewRepository reviewRepository;

  public ProductService(ProductRepository productRepository, ReviewRepository reviewRepository) {
    this.productRepository = productRepository;
    this.reviewRepository = reviewRepository;
  }

  public ProductResponseDto saveProduct(ProductRequestDto productRequestDto) {
    Product newProduct = productRepository.save(ProductMapper.toProduct(productRequestDto));

    return ProductMapper.toProductResponseDto(newProduct);
  }

  public List<ProductResponseDto> getAllProducts() {
    return ProductMapper.toProductResponseDtoList(productRepository.findAll());
  }

  public List<ProductResponseDto> getAllProductsByCategory(String categoryName) {
    return ProductMapper.toProductResponseDtoList(productRepository.findProductsByCategory_NameIgnoreCase(categoryName));
  }

  public ProductResponseDto findProductById(Long productId) {
    return productRepository.findById(productId)
      .map(ProductMapper::toProductResponseDto)
      .orElseThrow(() -> new EntityNotFoundException(format("no product was found with the id %d", productId)));
  }

  public ProductResponseDto updateProductById(Long productId, ProductRequestDto productRequestDto) {
    Optional<Product> productOpt = productRepository.findById(productId);

    if (productOpt.isEmpty()) {
      throw new EntityNotFoundException(format("no product was found with the id %d", productId));
    } else {

      Product product = productOpt.get();
      product.setName(productRequestDto.name());
      product.setDescription(productRequestDto.description());
      product.setPrice(productRequestDto.price());
      product.setImage(productRequestDto.image());
      product.setAvailableQuantity(productRequestDto.availableQuantity());

      productRepository.save(product);

      return ProductMapper.toProductResponseDto(product);
    }
  }

  public String deleteProductById(Long productId) {

    Optional<Product> product = productRepository.findById(productId);

    if (product.isPresent()) {
      productRepository.deleteById(productId);
      return "the product was successfully erased";
    } else {
      throw new EntityNotFoundException(format("no product was found with the id %d", productId));
    }
  }

  public List<ReviewResponseDto> getAllReviewByProductId(Long productId) {

    Optional<Product> productOpt = productRepository.findById(productId);

    if (productOpt.isPresent()) {
      Product product = productOpt.get();
      List<Review> reviewList = reviewRepository.findAllByProductIs(product);
      return ReviewMapper.toReviewResponseDtoList(reviewList);
    } else {
      throw new EntityNotFoundException(format("no product was found with the id %d", productId));
    }
  }


}
