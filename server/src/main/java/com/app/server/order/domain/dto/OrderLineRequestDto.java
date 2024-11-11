package com.app.server.order.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record OrderLineRequestDto(

  @NotNull(message = "the product id must be specified")
  Long productId,

  @NotBlank(message = "the product must have a name")
  String productName,

  @NotNull(message = "you must specified a the product unit price")
  double productUnitPrice,

  @NotNull(message = "the quantity must be specified")
  double quantity

) {
}
