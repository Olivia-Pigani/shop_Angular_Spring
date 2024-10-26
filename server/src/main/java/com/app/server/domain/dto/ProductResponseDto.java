package com.app.server.domain.dto;

public record ProductResponseDto(

        Long id,

        String name,

        String description,

        String image,

        double availableQuantity,

        double price,

        Long categoryId,

        String categoryName
) {
}
