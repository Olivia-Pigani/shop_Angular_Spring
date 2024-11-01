package com.app.server.customer.service;

import com.app.server.customer.domain.entity.Customer;
import com.app.server.customer.domain.entity.Role;
import com.app.server.customer.dto.SignInRequestDto;
import com.app.server.customer.dto.SignInResponseDto;
import com.app.server.customer.dto.SignUpRequestDto;
import com.app.server.customer.enumeration.RoleEnum;
import com.app.server.customer.repository.CustomerRepository;
import com.app.server.customer.repository.RoleRepository;
import com.app.server.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {

  private final PasswordEncoder passwordEncoder;
  private final CustomerRepository customerRepository;
  private final AuthenticationManager authenticationManager;
  private final RoleRepository roleRepository;
  private JwtService jwtService;

  public CustomerService(PasswordEncoder passwordEncoder, CustomerRepository customerRepository, AuthenticationManager authenticationManager, RoleRepository roleRepository, JwtService jwtService) {
    this.passwordEncoder = passwordEncoder;
    this.customerRepository = customerRepository;
    this.authenticationManager = authenticationManager;
    this.roleRepository = roleRepository;
    this.jwtService = jwtService;
  }

  public String signup(SignUpRequestDto signUpRequestDto) {
    Optional<Customer> customer = customerRepository.findByEmail(signUpRequestDto.email());

    if (customer.isEmpty()) {

      //every new registered user will have automatically a ROLE_CUSTOMER role.
      Role userRole = roleRepository.findByName(RoleEnum.ROLE_CUSTOMER);

      Customer newCustomer = Customer.builder()
        .firstName(signUpRequestDto.firstName())
        .lastName(signUpRequestDto.lastName())
        .phoneNumber(signUpRequestDto.phoneNumber())
        .birthDate(signUpRequestDto.birthDate())
        .email(signUpRequestDto.email())
        .role(userRole)
        .password(passwordEncoder.encode(signUpRequestDto.password()))
        .build();

      customerRepository.save(newCustomer);

      return "welcome to the application " + signUpRequestDto.firstName() + " " + signUpRequestDto.lastName() + " !";
    } else {
      throw new IllegalArgumentException("the user already exist with email: " + signUpRequestDto.email());
    }
  }

  public SignInResponseDto signIn(SignInRequestDto signInRequestDto) {

    authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        signInRequestDto.email(),
        signInRequestDto.password()
      )
    );

    Customer customer = customerRepository.findByEmail(signInRequestDto.email())
      .orElseThrow();

    String jwtToken = jwtService.generateToken(customer);

    return new SignInResponseDto(jwtToken, jwtService.getExpirationTime());
  }
}
