package com.app.server.order.domain.dto;

import jakarta.validation.constraints.NotNull;

public record OrderLineRequestDto(

  @NotNull(message = "the product id must be specified")
  Long productId,

  @NotNull(message = "the quantity must be specified")
  double quantity

) {
}
