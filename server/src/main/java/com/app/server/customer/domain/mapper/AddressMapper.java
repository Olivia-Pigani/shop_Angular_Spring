package com.app.server.customer.domain.mapper;

import com.app.server.customer.domain.entity.Address;
import com.app.server.customer.domain.entity.Customer;
import com.app.server.customer.dto.AddressRequestDto;
import com.app.server.customer.dto.AddressResponseDto;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AddressMapper {

  public static Address toAddress(Customer customer,AddressRequestDto addressRequestDto){

    Set<Customer> customerSet = new HashSet<>();
    customerSet.add(customer);

    return Address.builder()
      .customerList(customerSet)
      .country(addressRequestDto.country())
      .street(addressRequestDto.street())
      .city(addressRequestDto.city())
      .houseNumber(addressRequestDto.houseNumber())
      .build();
  }
  public static AddressResponseDto toAddressResponseDto(Address address){
    return AddressResponseDto.builder()
      .customerIdSet(address.getCustomerList()
        .stream()
        .map(Customer::getId)
        .collect(Collectors.toSet()))
      .country(address.getCountry())
      .street(address.getStreet())
      .houseNumber(address.getHouseNumber())
      .city(address.getCity())
      .build();
  }
}
