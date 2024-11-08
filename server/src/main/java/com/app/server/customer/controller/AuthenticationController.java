package com.app.server.customer.controller;

import com.app.server.customer.dto.SignInRequestDto;
import com.app.server.customer.dto.SignInResponseDto;
import com.app.server.customer.dto.SignUpRequestDto;
import com.app.server.customer.service.AuthenticationService;
import com.app.server.exception.CustomCustomerException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

  private final AuthenticationService customerService;

  public AuthenticationController(AuthenticationService customerService) {
    this.customerService = customerService;
  }

  @PostMapping("/signup")
  public ResponseEntity<String> signUp(@Valid @RequestBody SignUpRequestDto signUpRequestDto) throws Exception {
    return new ResponseEntity<>(customerService.signup(signUpRequestDto), HttpStatus.CREATED);
  }

  @PostMapping("/signin")
  public ResponseEntity<SignInResponseDto> signIn(@Valid @RequestBody SignInRequestDto signInRequestDto) throws CustomCustomerException {
    return new ResponseEntity<>(customerService.signIn(signInRequestDto),HttpStatus.CREATED);
  }




}
