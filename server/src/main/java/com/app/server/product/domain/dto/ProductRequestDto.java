package com.app.server.product.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record ProductRequestDto(

        @NotBlank(message = "please put a name")
        String name,

        @NotBlank(message = "please put a description")
        String description,

        @NotBlank(message = "please put an image")
        String image,

        @Size(min = 1, max = 1000)
        double availableQuantity,

        @NotBlank(message = "please put a price")
        @Positive(message = "price cannot be negative")
        double price,

        @NotBlank(message = "please tell us what's the category id")
        Long categoryId

) {
}
