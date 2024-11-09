package com.app.server.customer.dto;

import com.app.server.customer.domain.entity.Customer;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Builder;

import java.time.LocalDate;
import java.util.Set;

@Builder
public record CustomerResponseDto(

  String firstName,

  String lastName,

  LocalDate birthDate,

  String phoneNumber,

  String email

) {


}
