package com.app.server.product.service;

import com.app.server.domain.entity.Category;
import com.app.server.product.domain.dto.ProductRequestDto;
import com.app.server.product.domain.dto.ProductResponseDto;
import com.app.server.product.domain.entity.Product;
import com.app.server.product.domain.mapper.ProductMapper;
import com.app.server.product.repository.ProductRepository;
import jakarta.persistence.Column;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.lang.String.format;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductResponseDto saveProduct(ProductRequestDto productRequestDto) {
        Product newProduct = productRepository.save(ProductMapper.toProduct(productRequestDto));

        return ProductMapper.toProductResponseDto(newProduct);
    }

    public List<ProductResponseDto> getAllProducts() {
        return ProductMapper.toProductResponseDtoList(productRepository.findAll());
    }

    public ProductResponseDto findProductById(Long productId) {
        return productRepository.findById(productId)
                .map(ProductMapper::toProductResponseDto)
                .orElseThrow(() -> new EntityNotFoundException(format("no product was found with the id %d", productId)));
    }

    public ProductResponseDto updateProductById(Long productId, ProductRequestDto productRequestDto) {
        Optional<Product> productOpt = productRepository.findById(productId);

        if (productOpt.isEmpty()){
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

       if (product.isPresent()){
           productRepository.deleteById(productId);
           return "the product was successfully erased";
       } else {
           throw new EntityNotFoundException(format("no product was found with the id %d", productId));       }
    }
}
