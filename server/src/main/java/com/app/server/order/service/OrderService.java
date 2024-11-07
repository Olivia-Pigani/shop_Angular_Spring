package com.app.server.order.service;

import com.app.server.customer.domain.entity.Customer;
import com.app.server.customer.repository.CustomerRepository;
import com.app.server.order.domain.dto.OrderRequestDto;
import com.app.server.order.domain.dto.OrderResponseDto;
import com.app.server.order.domain.entity.Order;
import com.app.server.order.domain.mapper.OrderMapper;
import com.app.server.order.repository.OrderRepository;
import com.app.server.security.JwtService;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class OrderService {

  private final OrderRepository orderRepository;
  private final OrderMapper orderMapper;
  private final CustomerRepository customerRepository;
  private final JwtService jwtService;

  public OrderService(OrderRepository orderRepository, OrderMapper orderMapper, CustomerRepository customerRepository, JwtService jwtService) {
    this.orderRepository = orderRepository;
    this.orderMapper = orderMapper;
    this.customerRepository = customerRepository;
    this.jwtService = jwtService;
  }

  public OrderResponseDto makeAOrder(String userToken, OrderRequestDto orderRequestDto) {

    String userEmail = jwtService.extractUsername(jwtService.bearerRemover(userToken));
    Optional<Customer> customer = customerRepository.findByEmail(userEmail);
    Long customerId = null;

    if (customer.isPresent()){
      customerId = customer.get().getId();


      Order order = orderRepository.save(orderMapper.toOrder(customerId, orderRequestDto));
      return orderMapper.toOrderResponseDto(order);
    }

    throw new EntityNotFoundException("the user was not found with the email : " + userEmail);
  }

  public List<OrderResponseDto> getAllCustomerOrders(String userToken) {
    String userEmail = jwtService.extractUsername(jwtService.bearerRemover(userToken));
    Optional<Customer> customer = customerRepository.findByEmail(userEmail);
    Long customerId = null;

    if (customer.isPresent()) {
      customerId = customer.get().getId();

      List<Order> allCustomerOrders = orderRepository.findOrdersByCustomer_Id(customerId);

      return orderMapper.toOrderResponseDtoList(allCustomerOrders);
    }

    throw new EntityNotFoundException("the user was not found with the email : " + userEmail);

  }
}
