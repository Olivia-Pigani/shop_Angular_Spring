package com.app.server.product.domain.entity;

import com.app.server.customer.domain.entity.Customer;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "review")
public class Review {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;

  private String description;

  private int rating;

  @ManyToOne
  @JoinColumn(name = "id_customer", nullable = false)
  private Customer customer;

  @ManyToOne
  @JoinColumn(name = "id_product", nullable = false)
  private Product product;
}
