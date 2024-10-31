package com.app.server.customer.repository;

import com.app.server.customer.domain.entity.Role;
import com.app.server.customer.enumeration.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

  Role findByName(RoleEnum roleName);

}
