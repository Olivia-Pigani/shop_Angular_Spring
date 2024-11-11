package com.app.server.order.service;

import com.app.server.exception.CustomCustomerException;
import com.app.server.order.domain.dto.OrderRequestDto;
import com.app.server.order.domain.dto.OrderResponseDto;
import com.app.server.order.domain.entity.Order;
import com.app.server.order.domain.entity.OrderLine;
import com.app.server.order.domain.mapper.OrderMapper;
import com.app.server.order.repository.OrderRepository;
import com.app.server.product.domain.entity.Product;
import com.app.server.product.repository.ProductRepository;
import com.app.server.security.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.app.server.exception.CustomCustomerException.CustomerError.CUSTOMER_NOT_FOUND;

@Slf4j
@Service
public class OrderService {

  private final OrderRepository orderRepository;
  private final ProductRepository productRepository;
  private final OrderMapper orderMapper;
  private final JwtService jwtService;

  public OrderService(OrderRepository orderRepository, ProductRepository productRepository, OrderMapper orderMapper, JwtService jwtService) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
    this.orderMapper = orderMapper;
    this.jwtService = jwtService;
  }

  public OrderResponseDto makeAOrder(String userToken, OrderRequestDto orderRequestDto) throws CustomCustomerException {

    Long customerId = Long.valueOf(jwtService.getUserIdFromClaims(userToken));

    if (customerId != null) {

      Order order = orderMapper.toOrder(customerId, orderRequestDto);

      //product stock management
      for (OrderLine orderline : order.getOrderLineList()
      ) {
        Product product = orderline.getProduct();
        product.setAvailableQuantity(product.getAvailableQuantity() - orderline.getQuantity());
        productRepository.save(product);
      }

      orderRepository.save(order);

      return orderMapper.toOrderResponseDto(order);
    }

    throw new CustomCustomerException(CUSTOMER_NOT_FOUND, String.format("no user was found with email %s", customerId));
  }

  public List<OrderResponseDto> getAllCustomerOrders(String userToken) throws CustomCustomerException {

    Long customerId = Long.valueOf(jwtService.getUserIdFromClaims(userToken));

    if (customerId != null) {
      List<Order> allCustomerOrders = orderRepository.findOrdersByCustomer_Id(customerId);
      return orderMapper.toOrderResponseDtoList(allCustomerOrders);
    }

    throw new CustomCustomerException(CUSTOMER_NOT_FOUND, String.format("no user was found with email %s", customerId));

  }

}
