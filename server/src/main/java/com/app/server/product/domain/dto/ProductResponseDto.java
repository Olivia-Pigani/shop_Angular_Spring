package com.app.server.product.domain.dto;

public record ProductResponseDto(

        Long id,

        String name,

        String description,

        String image,

        double availableQuantity,

        double price
) {
}
