package com.app.server.customer.dto;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record CustomerResponseDto(

  String firstName,

  String lastName,

  LocalDate birthDate,

  String phoneNumber,

  String email

) {


}
