//package com.app.server.security;
//
//import com.app.server.customer.domain.entity.Customer;
//import com.app.server.customer.repository.CustomerRepository;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//public class CustomUserDetailsService implements UserDetailsService {
//
//  private final CustomerRepository customerRepository;
//
//  public CustomUserDetailsService(CustomerRepository customerRepository) {
//    this.customerRepository = customerRepository;
//  }
//
//  @Override
//  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//    Customer customer = customerRepository.findByEmail(email).orElseThrow(
//      () -> new UsernameNotFoundException("there is no user with the email " + email));
//
//    List<GrantedAuthority> authorityList = customer.getAuthorities().stream()
//      .map(authority -> new SimpleGrantedAuthority(authority.getAuthority())).collect(Collectors.toList());
//
//    return new User(customer.getEmail(), customer.getPassword(), authorityList);
//  }
//}
