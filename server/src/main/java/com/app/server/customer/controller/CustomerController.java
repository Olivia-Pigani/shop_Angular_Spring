package com.app.server.customer.controller;

import com.app.server.customer.dto.CustomerRequestDto;
import com.app.server.customer.dto.CustomerResponseDto;
import com.app.server.customer.service.CustomerService;
import com.app.server.exception.CustomCustomerException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/customers")
public class CustomerController {

  private final CustomerService customerService;

  public CustomerController(CustomerService customerService) {
    this.customerService = customerService;
  }

  @PreAuthorize("hasRole('ROLE_CUSTOMER')")
  @GetMapping("/{customerId}")
  public ResponseEntity<CustomerResponseDto> getCustomerPersonalInfos(@PathVariable Long customerId, @RequestHeader(name="Authorization") String userToken) throws CustomCustomerException {
    return new ResponseEntity<>(customerService.getCustomerPersonalInfos(customerId,userToken), HttpStatus.OK);
  }

  @PreAuthorize("hasRole('ROLE_CUSTOMER')")
  @PutMapping("/{customerId}")
  public ResponseEntity<CustomerResponseDto> updateCustomerPersonalInfos(@PathVariable Long customerId, @RequestHeader(name="Authorization") String userToken, @RequestBody @Valid CustomerRequestDto customerRequestDto) throws CustomCustomerException {
    return new ResponseEntity<>(customerService.updateCustomerPersonalInfos(customerId,userToken,customerRequestDto), HttpStatus.ACCEPTED);
  }


}
