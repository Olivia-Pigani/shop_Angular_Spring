package com.app.server.customer.domain.entity;

import com.app.server.order.domain.entity.Order;
import com.app.server.product.domain.entity.Review;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String pwd;

    private LocalDate birthDate;

    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "id_adress", nullable = false)
    private Adress adress;

    @OneToMany(mappedBy = "customer",
            fetch = FetchType.LAZY)
    private List<Review> reviewList;

    @OneToMany(mappedBy = "customer",
    fetch = FetchType.LAZY)
    private List<Order> orderList;
}
