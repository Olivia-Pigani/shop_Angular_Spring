package com.app.server.mapper;

import com.app.server.domain.dto.ProductResponseDto;
import com.app.server.domain.entity.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductMapper {

    public static ProductResponseDto toProductResponseDto(Product product) {
        return new ProductResponseDto(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getImage(),
                product.getAvailableQuantity(),
                product.getPrice(),
                product.getCategory().getId(),
                product.getCategory().getName()
        );
    }

    public static List<ProductResponseDto> productResponseDtoList(List<Product> productList){
        return productList.stream()
                .map(ProductMapper::toProductResponseDto)
                .toList();
    }
}
