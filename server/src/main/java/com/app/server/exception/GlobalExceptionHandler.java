package com.app.server.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(CustomCustomerException.class)
  public ResponseEntity<Object> handleCustomCustomerException(CustomCustomerException customCustomerException) {
    return ResponseEntity.status(customCustomerException.getError().getCode())
      .body(customCustomerException.getMessage());
  }
}
