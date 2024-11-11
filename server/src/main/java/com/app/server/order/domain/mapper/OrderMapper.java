package com.app.server.order.domain.mapper;

import com.app.server.customer.domain.entity.Customer;
import com.app.server.order.domain.dto.OrderLineResponseDto;
import com.app.server.order.domain.dto.OrderRequestDto;
import com.app.server.order.domain.dto.OrderResponseDto;
import com.app.server.order.domain.entity.Order;
import com.app.server.order.domain.entity.OrderLine;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class OrderMapper {

  private final OrderLineMapper orderLineMapper;

  public OrderMapper(OrderLineMapper orderLineMapper) {
    this.orderLineMapper = orderLineMapper;
  }

  public Order toOrder(Long customerId, OrderRequestDto orderRequestDto) {

    Order order = Order.builder()
      .orderDate(LocalDate.now())
      .reference(UUID.randomUUID().toString())
      .totalAmount(orderRequestDto.totalAmount())
      .tax(orderRequestDto.tax())
      .deliveryPrice(orderRequestDto.deliveryPrice())
      .customer(Customer.builder().id(customerId).build())
      .build();

    List<OrderLine> orderLineList = orderLineMapper.toOrderLineList(orderRequestDto.orderLineRequestDtoList(), order);

    order.setOrderLineList(orderLineList);

    return order;

  }

  public OrderResponseDto toOrderResponseDto(Order order) {
    List<OrderLineResponseDto> orderLineResponseDtoList = orderLineMapper.toOrderLineResponseDtoList(order.getOrderLineList());
    return OrderResponseDto.builder()
      .orderId(order.getId())
      .userId(order.getCustomer().getId())
      .reference(order.getReference())
      .orderDate(order.getOrderDate())
      .taxAmount(order.getTax())
      .deliveryPrice(order.getDeliveryPrice())
      .totalAmount(order.getTotalAmount())
      .orderLineResponseDtoList(orderLineResponseDtoList)
      .build();
  }

  public List<OrderResponseDto> toOrderResponseDtoList(List<Order> orderList) {
    return orderList.stream()
      .map(this::toOrderResponseDto)
      .toList();
  }

}
