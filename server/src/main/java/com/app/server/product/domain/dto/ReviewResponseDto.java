package com.app.server.product.domain.dto;

public record ReviewResponseDto(
  Long id,

  String title,

  String description,

  int rating,

  String userFirstName
) {
}
