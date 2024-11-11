package com.app.server.order.domain.dto;

import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

@Builder
public record OrderResponseDto(

  Long orderId,

  Long userId,

  String reference,

  LocalDate orderDate,

  double taxAmount,

  double deliveryPrice,

  double totalAmount,

  List<OrderLineResponseDto> orderLineResponseDtoList

) {
}
