package com.app.server.customer.repository;

import com.app.server.customer.domain.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

  Optional<Customer> findByEmail(String email);

}
