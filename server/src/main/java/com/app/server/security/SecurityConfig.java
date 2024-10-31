package com.app.server.security;

import com.app.server.security.filter.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  private final AuthenticationProvider authenticationProvider;
  private final JwtAuthenticationFilter jwtAuthenticationFilter;
  private final static String[] WHITE_LIST = {"/api/v1/**"};

  public SecurityConfig(AuthenticationProvider authenticationProvider, JwtAuthenticationFilter jwtAuthenticationFilter) {
    this.authenticationProvider = authenticationProvider;
    this.jwtAuthenticationFilter = jwtAuthenticationFilter;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    http
      .authorizeHttpRequests(
        authorize -> {
          authorize
            .requestMatchers(WHITE_LIST).permitAll()
            .anyRequest().authenticated();
        })

      .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

      .csrf(AbstractHttpConfigurer::disable)

      .authenticationProvider(authenticationProvider)

      .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

}
