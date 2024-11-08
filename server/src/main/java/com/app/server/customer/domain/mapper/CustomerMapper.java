package com.app.server.customer.domain.mapper;

import com.app.server.customer.domain.entity.Customer;
import com.app.server.customer.dto.CustomerResponseDto;
import org.springframework.stereotype.Service;

@Service
public class CustomerMapper {

  public static CustomerResponseDto toCustomerResponseDto(Customer customer){
    return CustomerResponseDto.builder()
      .firstName(customer.getFirstName())
      .lastName(customer.getLastName())
      .email(customer.getEmail())
      .phoneNumber(customer.getPhoneNumber())
      .birthDate(customer.getBirthDate())
      .build();
  }

}
