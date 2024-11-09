package com.app.server.customer.service;

import com.app.server.customer.domain.entity.Address;
import com.app.server.customer.domain.entity.Customer;
import com.app.server.customer.domain.mapper.AddressMapper;
import com.app.server.customer.dto.AddressRequestDto;
import com.app.server.customer.dto.AddressResponseDto;
import com.app.server.customer.repository.AddressRepository;
import com.app.server.customer.repository.CustomerRepository;
import com.app.server.exception.CustomAddressException;
import com.app.server.exception.CustomCustomerException;
import com.app.server.security.JwtService;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.app.server.exception.CustomAddressException.AddressError.ADDRESS_NOT_FOUND;
import static com.app.server.exception.CustomCustomerException.CustomerError.CUSTOMER_PROHIBITED_REQUEST;

@Service
public class AddressService {

  private final AddressRepository addressRepository;
  private final CustomerRepository customerRepository;
  private final JwtService jwtService;

  public AddressService(AddressRepository addressRepository, CustomerRepository customerRepository, JwtService jwtService) {
    this.addressRepository = addressRepository;
    this.customerRepository = customerRepository;
    this.jwtService = jwtService;
  }

  public AddressResponseDto saveCustomerAddress(AddressRequestDto addressRequestDto, Long customerId, String userToken) throws CustomCustomerException {
    Long idFromClaims = Long.valueOf(jwtService.getUserIdFromClaims(userToken));

    if (!idFromClaims.equals(customerId)) {
      throw new CustomCustomerException(CUSTOMER_PROHIBITED_REQUEST, String.format("you are not the owner of those informations"));
    }

    Customer customer = customerRepository.findById(customerId).get();
    Address address = addressRepository.save(AddressMapper.toAddress(customer, addressRequestDto));
    customer.setAddress(address);
    customerRepository.save(customer);

    return AddressMapper.toAddressResponseDto(address);
  }

  public AddressResponseDto getCustomerAddress(Long customerId, String userToken) throws CustomCustomerException {
    Long idFromClaims = Long.valueOf(jwtService.getUserIdFromClaims(userToken));

    if (!idFromClaims.equals(customerId)) {
      throw new CustomCustomerException(CUSTOMER_PROHIBITED_REQUEST, String.format("you are not the owner of those informations"));
    }

    Optional<Address> addressOpt = addressRepository.findAddressByCustomerList_Id(customerId);
    Address address = addressOpt.get();
    return AddressMapper.toAddressResponseDto(address);
  }

  public AddressResponseDto updateCustomerAddress(AddressRequestDto addressRequestDto, Long customerId, String userToken) throws CustomCustomerException, CustomAddressException {
    Long idFromClaims = Long.valueOf(jwtService.getUserIdFromClaims(userToken));

    if (!idFromClaims.equals(customerId)) {
      throw new CustomCustomerException(CUSTOMER_PROHIBITED_REQUEST, String.format("you are not the owner of those informations"));
    }

    Optional<Address> addressOpt = addressRepository.findAddressByCustomerList_Id(customerId);

    if (addressOpt.isEmpty()) {
      throw new CustomAddressException(ADDRESS_NOT_FOUND, String.format("the address related to the customer with id %d do not exists", customerId));
    }

    Address address = addressOpt.get();

    address.setCity(addressRequestDto.city());
    address.setCountry(addressRequestDto.country());
    address.setHouseNumber(addressRequestDto.houseNumber());
    address.setStreet(addressRequestDto.street());

    return AddressMapper.toAddressResponseDto(addressRepository.save(address));

  }
}
