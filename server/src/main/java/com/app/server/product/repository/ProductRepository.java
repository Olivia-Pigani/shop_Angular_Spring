package com.app.server.product.repository;

import com.app.server.product.domain.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

  List<Product> findProductsByCategory_NameIgnoreCase(String categoryName);

}
