package com.app.server.product.domain.entity;

import com.app.server.domain.entity.Category;
import com.app.server.domain.entity.OrderLine;
import com.app.server.domain.entity.Review;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    private String description;

    private String image;

    private double availableQuantity;

    private double price;

    @OneToMany(mappedBy = "product",
    fetch = FetchType.LAZY,
    cascade = CascadeType.ALL,
    orphanRemoval = true)
    private List<Review> reviewList;

    @ManyToOne
    @JoinColumn(name = "id_category")
    private Category category;

    @OneToMany(mappedBy = "product",
    fetch = FetchType.LAZY)
    private List<OrderLine> orderLineList;

}
