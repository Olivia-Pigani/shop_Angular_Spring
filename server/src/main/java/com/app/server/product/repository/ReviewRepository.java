package com.app.server.product.repository;

import com.app.server.product.domain.entity.Product;
import com.app.server.product.domain.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

  List<Review> findAllByProductIs(Product product);
}
