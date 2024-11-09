package com.app.server.customer.dto;

import lombok.Builder;

import java.util.Set;

@Builder
public record AddressResponseDto(

  Set<Long> customerIdSet,

  String street,

  String houseNumber,

  String city,

  String country

) {
}
