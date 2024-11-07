package com.app.server.product.service;

import com.app.server.exception.CustomCategoryException;
import com.app.server.exception.CustomProductException;
import com.app.server.product.domain.dto.ProductRequestDto;
import com.app.server.product.domain.dto.ProductResponseDto;
import com.app.server.product.domain.dto.ReviewResponseDto;
import com.app.server.product.domain.entity.Category;
import com.app.server.product.domain.entity.Product;
import com.app.server.product.domain.entity.Review;
import com.app.server.product.domain.mapper.ProductMapper;
import com.app.server.product.domain.mapper.ReviewMapper;
import com.app.server.product.repository.CategoryRepository;
import com.app.server.product.repository.ProductRepository;
import com.app.server.product.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.app.server.exception.CustomCategoryException.CategoryError.CATEGORY_NOT_FOUND;
import static com.app.server.exception.CustomProductException.ProductError.PRODUCT_NOT_FOUND;

@Service
public class ProductService {

  private final ProductRepository productRepository;

  private final ReviewRepository reviewRepository;

  private final CategoryRepository categoryRepository;

  public ProductService(ProductRepository productRepository, ReviewRepository reviewRepository, CategoryRepository categoryRepository) {
    this.productRepository = productRepository;
    this.reviewRepository = reviewRepository;
    this.categoryRepository = categoryRepository;
  }

  public ProductResponseDto saveProduct(ProductRequestDto productRequestDto) throws CustomCategoryException {

    Optional<Category> categoryOpt = categoryRepository.findById(productRequestDto.categoryId());

    if (categoryOpt.isEmpty()){
      throw new CustomCategoryException(CATEGORY_NOT_FOUND, String.format("the category %d do not exist in the database",productRequestDto.categoryId()));
    }

    Product newProduct = productRepository.save(ProductMapper.toProduct(productRequestDto));

    return ProductMapper.toProductResponseDto(newProduct);
  }

  public List<ProductResponseDto> getAllProducts() {
    return ProductMapper.toProductResponseDtoList(productRepository.findAll());
  }

  public List<ProductResponseDto> getAllProductsByCategory(String categoryName) {
    return ProductMapper.toProductResponseDtoList(productRepository.findProductsByCategory_NameIgnoreCase(categoryName));
  }

  public ProductResponseDto findProductById(Long productId) throws CustomProductException {
    return productRepository.findById(productId)
      .map(ProductMapper::toProductResponseDto)
      .orElseThrow(() -> new CustomProductException(PRODUCT_NOT_FOUND, String.format("no product was found with the id %d", productId)));
  }

  public ProductResponseDto updateProductById(Long productId, ProductRequestDto productRequestDto) throws CustomProductException {
    Optional<Product> productOpt = productRepository.findById(productId);

    if (productOpt.isEmpty()) {
      throw new CustomProductException(PRODUCT_NOT_FOUND, String.format("no product was found with the id %d", productId));
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

  public String deleteProductById(Long productId) throws CustomProductException {

    Optional<Product> product = productRepository.findById(productId);

    if (product.isPresent()) {
      productRepository.deleteById(productId);
      return "the product was successfully erased";
    } else {
      throw new CustomProductException(PRODUCT_NOT_FOUND, String.format("no product was found with the id %d", productId));
    }
  }

  public List<ReviewResponseDto> getAllReviewByProductId(Long productId) throws CustomProductException {

    Optional<Product> productOpt = productRepository.findById(productId);

    if (productOpt.isPresent()) {
      Product product = productOpt.get();
      List<Review> reviewList = reviewRepository.findAllByProductIs(product);
      return ReviewMapper.toReviewResponseDtoList(reviewList);
    } else {
      throw new CustomProductException(PRODUCT_NOT_FOUND, String.format("no product was found with the id %d", productId));
    }
  }


}
