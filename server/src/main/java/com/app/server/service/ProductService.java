package com.app.server.service;

import com.app.server.domain.dto.ProductResponseDto;
import com.app.server.mapper.ProductMapper;
import com.app.server.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductResponseDto> getAllProducts() {
        return ProductMapper.productResponseDtoList(productRepository.findAll());
    }
}
