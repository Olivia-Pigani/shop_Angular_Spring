package com.app.server.customer.domain.entity;

import com.app.server.order.domain.entity.Order;
import com.app.server.product.domain.entity.Review;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "customer")
public class Customer implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String firstName;

  private String lastName;

  private LocalDate birthDate;

  private String phoneNumber;

  @Column(unique = true, nullable = false)
  private String email;

  private String password;

  @CreationTimestamp
  @Column(updatable = false, name = "created_at")
  private LocalDate createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private LocalDate updatedAt;

  @ManyToOne
  @JoinColumn(name = "id_role")
  private Role role;

  //private boolean isEnabled;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    List<GrantedAuthority> authorities = new ArrayList<>();

    authorities.add(new SimpleGrantedAuthority(role.getName().toString()));

    return authorities;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

//  @Override
//  public boolean isEnabled() {
//    return isEnabled;
//  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @ManyToOne
  @JoinColumn(name = "id_adress")
  private Adress adress;

  @OneToMany(mappedBy = "customer",
    fetch = FetchType.LAZY)
  private List<Review> reviewList;

  @OneToMany(mappedBy = "customer",
    fetch = FetchType.LAZY)
  private List<Order> orderList;

}
