package com.app.server.order.controller;

import com.app.server.exception.CustomCustomerException;
import com.app.server.order.domain.dto.OrderRequestDto;
import com.app.server.order.domain.dto.OrderResponseDto;
import com.app.server.order.service.OrderService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

  private final OrderService orderService;

  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @PreAuthorize("hasRole('ROLE_CUSTOMER')")
  @PostMapping
  public ResponseEntity<OrderResponseDto> makeAOrder(@RequestHeader(name="Authorization") String userToken, @RequestBody @Valid OrderRequestDto orderRequestDto) throws CustomCustomerException {
    return new ResponseEntity<>(orderService.makeAOrder(userToken,orderRequestDto), HttpStatus.CREATED);
  }

  @PreAuthorize("hasRole('ROLE_CUSTOMER')")
  @GetMapping
  public ResponseEntity<List<OrderResponseDto>> getAllCustomerOrders(@RequestHeader(name="Authorization") String userToken) throws CustomCustomerException {
    return new ResponseEntity<>(orderService.getAllCustomerOrders(userToken), HttpStatus.OK);
  }
}
