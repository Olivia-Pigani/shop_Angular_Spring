package com.app.server.order.domain.dto;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record OrderRequestDto(

  @NotNull(message = "you must specified a total amount")
  double totalAmount,

  @NotNull(message = "you must specified tax amount")
  double tax,

  @NotNull(message = "you must specified tax amount")
  double deliveryPrice,

  @NotNull
  List<OrderLineRequestDto> orderLineRequestDtoList

) {
}
