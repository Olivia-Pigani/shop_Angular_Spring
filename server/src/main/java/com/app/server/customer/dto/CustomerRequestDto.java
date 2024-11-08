package com.app.server.customer.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record CustomerRequestDto(

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
  String email

) {
}
