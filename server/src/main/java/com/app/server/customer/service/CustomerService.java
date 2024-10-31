package com.app.server.customer.service;

import com.app.server.customer.domain.entity.Customer;
import com.app.server.customer.dto.SignUpRequestDto;
import com.app.server.customer.repository.CustomerRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {

  private final PasswordEncoder passwordEncoder;
  private final CustomerRepository customerRepository;
  private final AuthenticationManager authenticationManager;

  public CustomerService(PasswordEncoder passwordEncoder, CustomerRepository customerRepository, AuthenticationManager authenticationManager) {
    this.passwordEncoder = passwordEncoder;
    this.customerRepository = customerRepository;
    this.authenticationManager = authenticationManager;
  }

  public Customer signup(SignUpRequestDto signUpRequestDto) {
    Optional<Customer> customer = customerRepository.findByEmail(signUpRequestDto.email());

    if (customer.isEmpty()) {
      Customer newCustomer = Customer.builder()
        .firstName(signUpRequestDto.firstName())
        .lastName(signUpRequestDto.lastName())
        .phoneNumber(signUpRequestDto.phoneNumber())
        .birthDate(signUpRequestDto.birthDate())
        .email(signUpRequestDto.email())
        .password(passwordEncoder.encode(signUpRequestDto.password()))
        .build();

      return customerRepository.save(newCustomer);
    } else {
      throw new IllegalArgumentException("the user already exist with email: " + signUpRequestDto.email());
    }
  }
}
