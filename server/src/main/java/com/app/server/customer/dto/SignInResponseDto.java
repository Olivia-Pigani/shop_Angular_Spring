package com.app.server.customer.dto;

public record SignInResponseDto(

  String token,

  long expireIn

) {
}
