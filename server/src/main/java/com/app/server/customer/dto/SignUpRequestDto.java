package com.app.server.customer.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record SignUpRequestDto(

  @NotBlank(message = "first name field must be filled")
  String firstName,

  @NotBlank(message = "first name field must be filled")
  String lastName,

  @Past
  @NotNull(message = "birthdate is mandatory")
  LocalDate birthDate,

  @NotBlank(message = "telephone number is mandatory")
  @Size(min = 10, max = 10)
  String phoneNumber,

  @Email(message = "invalid email format")
  @NotBlank(message = "email is mandatory")
  String email,

  @NotBlank(message = "password is mandatory")
  @Size(min = 6, max = 20, message = "Password must be between 6 and 20 characters")
  String password
) {
}
