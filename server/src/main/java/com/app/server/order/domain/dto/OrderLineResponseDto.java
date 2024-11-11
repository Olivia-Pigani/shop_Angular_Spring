package com.app.server.order.domain.dto;

import lombok.Builder;

@Builder
public record OrderLineResponseDto(

  Long productId,

  String productName,

  double productUnitPrice,

  double quantity

) {
}
