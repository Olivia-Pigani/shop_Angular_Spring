package com.app.server.order.repository;

import com.app.server.order.domain.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

  List<Order> findOrdersByCustomer_Id(Long userId);

}
