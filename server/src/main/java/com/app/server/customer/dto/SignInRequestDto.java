package com.app.server.customer.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record SignInRequestDto(

  @Email(message = "invalid email format")
  @NotBlank(message = "email is mandatory")
  String email,

  @NotBlank(message = "password is mandatory")
  String password

) {
}
