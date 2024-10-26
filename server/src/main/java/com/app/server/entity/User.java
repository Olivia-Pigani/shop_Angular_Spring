package com.app.server.entity;

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
@Table(name = "\"user\"")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String LastName;

    private String email;

    private String pwd;

    private LocalDate birthDate;

    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "id_adress", nullable = false)
    private Adress adress;

    @OneToMany(mappedBy = "user",
            fetch = FetchType.LAZY)
    private List<Review> reviewList;

    @OneToMany(mappedBy = "user",
    fetch = FetchType.LAZY)
    private List<Order> orderList;
}
