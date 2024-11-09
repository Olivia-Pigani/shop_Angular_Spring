package com.app.server.customer.service;

import com.app.server.customer.domain.entity.Customer;
import com.app.server.customer.domain.mapper.CustomerMapper;
import com.app.server.customer.dto.CustomerRequestDto;
import com.app.server.customer.dto.CustomerResponseDto;
import com.app.server.customer.repository.CustomerRepository;
import com.app.server.exception.CustomCustomerException;
import com.app.server.security.JwtService;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.app.server.exception.CustomCustomerException.CustomerError.CUSTOMER_NOT_FOUND;
import static com.app.server.exception.CustomCustomerException.CustomerError.CUSTOMER_PROHIBITED_REQUEST;

@Service
public class CustomerService {

  private final CustomerRepository customerRepository;
  private final JwtService jwtService;

  public CustomerService(CustomerRepository customerRepository, JwtService jwtService) {
    this.customerRepository = customerRepository;
    this.jwtService = jwtService;
  }


  public CustomerResponseDto getCustomerPersonalInfos(Long customerId,String userToken) throws CustomCustomerException {
    Long idFromClaims = Long.valueOf(jwtService.getUserIdFromClaims(userToken));

    if (!idFromClaims.equals(customerId)){
      throw new CustomCustomerException(CUSTOMER_PROHIBITED_REQUEST,String.format("you are not the owner of those informations"));
    }
      Optional<Customer> customerOpt = customerRepository.findById(idFromClaims);

    if (customerOpt.isPresent()){
      Customer customer = customerOpt.get();
      return CustomerMapper.toCustomerResponseDto(customer);
    }

    throw new CustomCustomerException(CUSTOMER_NOT_FOUND,String.format("no user was found with id %d", customerId));
  }

  public CustomerResponseDto updateCustomerPersonalInfos(Long customerId, String userToken, CustomerRequestDto customerRequestDto) throws CustomCustomerException {
    Long idFromClaims = Long.valueOf(jwtService.getUserIdFromClaims(userToken));

    if (!idFromClaims.equals(customerId)){
      throw new CustomCustomerException(CUSTOMER_PROHIBITED_REQUEST,String.format("you are not the owner of those informations"));
    }
    Optional<Customer> customerOpt = customerRepository.findById(idFromClaims);

    if (customerOpt.isPresent()){

      Customer customer = customerOpt.get();

      customer.setFirstName(customerRequestDto.firstName());
      customer.setLastName(customerRequestDto.lastName());
      customer.setEmail(customerRequestDto.email());
      customer.setPhoneNumber(customerRequestDto.phoneNumber());
      customer.setBirthDate(customerRequestDto.birthDate());

      return CustomerMapper.toCustomerResponseDto(customerRepository.save(customer));

    }


    throw new CustomCustomerException(CUSTOMER_NOT_FOUND,String.format("no user was found with id %d", customerId));

  }
}
