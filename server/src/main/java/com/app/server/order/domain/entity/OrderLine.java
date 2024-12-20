package com.app.server.order.domain.entity;

import com.app.server.product.domain.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Table(name = "orderline")
public class OrderLine {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private double quantity;

  @ManyToOne
  @JoinColumn(name = "id_order")
  private Order order;

  @ManyToOne
  @JoinColumn(name = "id_product")
  private Product product;

}
