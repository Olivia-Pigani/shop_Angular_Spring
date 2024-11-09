package com.app.server.customer.repository;

import com.app.server.customer.domain.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {

  Optional<Address> findAddressByCustomerList_Id(Long customerId);

}
