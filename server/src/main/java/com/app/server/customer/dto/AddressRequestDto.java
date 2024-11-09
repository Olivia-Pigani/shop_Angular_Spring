package com.app.server.customer.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AddressRequestDto(

  @NotBlank(message = "the street is mandatory")
  String street,

  @NotBlank(message = "the house number is mandatory")
  String houseNumber,

  @NotBlank(message = "the city is mandatory")
  String city,

  @NotBlank(message = "the country is mandatory")
  String country

) {
}
