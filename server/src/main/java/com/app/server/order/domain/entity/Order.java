package com.app.server.order.domain.entity;

import com.app.server.customer.domain.entity.Customer;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "orders")
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private LocalDate orderDate;

  @Column(nullable = false, unique = true)
  private String reference;

  @Column(nullable = false)
  private double totalAmount;

  @Column(nullable = false)
  double tax;

  //delivery can be free
  @Column(nullable = false)
  double deliveryPrice = 0;

  @ManyToOne
  @JoinColumn(name = "id_customer", nullable = false)
  private Customer customer;

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
  private List<OrderLine> orderLineList;
}
