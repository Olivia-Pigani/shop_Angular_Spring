package com.app.server.customer.controller;

import com.app.server.customer.dto.AddressRequestDto;
import com.app.server.customer.dto.AddressResponseDto;
import com.app.server.customer.service.AddressService;
import com.app.server.exception.CustomAddressException;
import com.app.server.exception.CustomCustomerException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/addresses")
public class AddressController {

  private final AddressService addressService;

  public AddressController(AddressService addressService) {
    this.addressService = addressService;
  }

  @PreAuthorize("hasRole('ROLE_CUSTOMER')")
  @PostMapping("/customers/{customerId}")
  public ResponseEntity<AddressResponseDto> saveCustomerAddress(@RequestBody @Valid AddressRequestDto addressRequestDto, @PathVariable Long customerId, @RequestHeader(name="Authorization") String userToken) throws CustomCustomerException {
  return new ResponseEntity<>(addressService.saveCustomerAddress(addressRequestDto,customerId, userToken), HttpStatus.CREATED);
  }

  @PreAuthorize("hasRole('ROLE_CUSTOMER')")
  @GetMapping("/customers/{customerId}")
  public ResponseEntity<AddressResponseDto> getCustomerAddress( @PathVariable Long customerId, @RequestHeader(name="Authorization") String userToken) throws CustomCustomerException {
    return new ResponseEntity<>(addressService.getCustomerAddress(customerId, userToken), HttpStatus.OK);
  }

  @PreAuthorize("hasRole('ROLE_CUSTOMER')")
  @PutMapping("/customers/{customerId}")
  public ResponseEntity<AddressResponseDto> updateCustomerAddress(@RequestBody @Valid AddressRequestDto addressRequestDto, @PathVariable Long customerId, @RequestHeader(name="Authorization") String userToken) throws CustomCustomerException, CustomAddressException {
    return new ResponseEntity<>(addressService.updateCustomerAddress(addressRequestDto,customerId, userToken), HttpStatus.OK);
  }
}
