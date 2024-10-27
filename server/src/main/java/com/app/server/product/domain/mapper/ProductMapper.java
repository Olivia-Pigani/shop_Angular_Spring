package com.app.server.product.domain.mapper;

import com.app.server.product.domain.dto.ProductRequestDto;
import com.app.server.product.domain.dto.ProductResponseDto;
import com.app.server.product.domain.entity.Product;
import com.app.server.domain.entity.Category;
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
                product.getPrice()
        );
    }

    public static List<ProductResponseDto> toProductResponseDtoList(List<Product> productList) {
        return productList.stream()
                .map(ProductMapper::toProductResponseDto)
                .toList();
    }

    public static Product toProduct(ProductRequestDto productRequestDto) {
        return Product.builder()
                .name(productRequestDto.name())
                .description(productRequestDto.description())
                .image(productRequestDto.image())
                .availableQuantity(productRequestDto.availableQuantity())
                .price(productRequestDto.price())
                .category(Category.builder()
                        .id(productRequestDto.categoryId())
                        .build()
                )
                .build();

    }

    public static List<Product> toProductList(List<ProductRequestDto> productRequestDtoList) {
        return productRequestDtoList.stream()
                .map(ProductMapper::toProduct)
                .toList();
    }

}
