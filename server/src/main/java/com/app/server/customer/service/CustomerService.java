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

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class CustomerService {

  private final PasswordEncoder passwordEncoder;
  private final CustomerRepository customerRepository;
  private final AuthenticationManager authenticationManager;
  private final RoleRepository roleRepository;
  private JwtService jwtService;
  private static final String ADMIN_EMAIL = "admin@email.com";

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

      //the first user will be the unique Admin, then users will be of type Customer.
      String email = signUpRequestDto.email();
      Role role = email.equals(ADMIN_EMAIL) ? roleRepository.findByName(RoleEnum.ROLE_ADMIN) : roleRepository.findByName(RoleEnum.ROLE_CUSTOMER);

      Customer newCustomer = Customer.builder()
        .firstName(signUpRequestDto.firstName())
        .lastName(signUpRequestDto.lastName())
        .phoneNumber(signUpRequestDto.phoneNumber())
        .birthDate(signUpRequestDto.birthDate())
        .email(signUpRequestDto.email())
        .role(role)
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

    Map<String,Object> extraClaims = new HashMap<>();
    extraClaims.put("userId",customer.getId());
    extraClaims.put("role",customer.getRole());

    String jwtToken = jwtService.generateToken(extraClaims,customer);

    return new SignInResponseDto(jwtToken, jwtService.getExpirationTime());
  }
}
