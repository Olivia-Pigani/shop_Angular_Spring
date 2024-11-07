package com.app.server.order.domain.mapper;

import com.app.server.order.domain.dto.OrderLineRequestDto;
import com.app.server.order.domain.dto.OrderLineResponseDto;
import com.app.server.order.domain.entity.Order;
import com.app.server.order.domain.entity.OrderLine;
import com.app.server.product.domain.entity.Product;
import com.app.server.product.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class OrderLineMapper {

  private final ProductRepository productRepository;

  public OrderLineMapper(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  public OrderLine toOrderLine(OrderLineRequestDto orderLineRequestDto, Order order) {

    Optional<Product> productOpt = productRepository.findById(orderLineRequestDto.productId());

    if (productOpt.isPresent()) {

      Product product = productOpt.get();

      return OrderLine.builder()
        .order(order)
        .product(product)
        .quantity(orderLineRequestDto.quantity())
        .build();

    }
    throw new EntityNotFoundException("the product was not found");
  }

  public OrderLineResponseDto toOrderLineResponseDto(OrderLine orderLine) {

    return OrderLineResponseDto.builder()
      .productId(orderLine.getProduct().getId())
      .quantity(orderLine.getQuantity())
      .build();

  }

  public List<OrderLine> toOrderLineList(List<OrderLineRequestDto> orderLineRequestDtoList, Order order) {
    return orderLineRequestDtoList.stream()
      .map(orderLineRequestDto -> toOrderLine(orderLineRequestDto, order))
      .toList();
  }

  public List<OrderLineResponseDto> toOrderLineResponseDtoList(List<OrderLine> orderLineList) {
    return orderLineList.stream()
      .map(this::toOrderLineResponseDto)
      .toList();
  }
}
