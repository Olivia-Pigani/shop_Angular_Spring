package com.app.server.customer.domain.entity;

import com.app.server.customer.enumeration.RoleEnum;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "roles")
public class Role {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "the role must be specified")
  @Enumerated(EnumType.STRING)
  private RoleEnum name;

  @OneToMany(mappedBy = "role")
  @JsonIgnore
  private Set<Customer> customerSet;

}
