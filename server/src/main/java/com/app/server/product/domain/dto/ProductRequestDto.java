package com.app.server.product.domain.dto;

import jakarta.validation.constraints.*;

public record ProductRequestDto(

        @NotBlank(message = "please put a name")
        String name,

        @NotBlank(message = "please put a description")
        String description,

        @NotBlank(message = "please put an image")
        String image,

        @Min(1)
        @Max(1000)
        double availableQuantity,

        @Positive(message = "price cannot be negative")
        double price,

        @NotNull(message = "please tell us what's the category id")
        Long categoryId

) {
}
