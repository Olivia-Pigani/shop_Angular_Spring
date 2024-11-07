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

  @ExceptionHandler(CustomProductException.class)
  public ResponseEntity<Object> handleCustomCProductException(CustomProductException customProductException) {
    return ResponseEntity.status(customProductException.getError().getCode())
      .body(customProductException.getMessage());
  }

  @ExceptionHandler(CustomCategoryException.class)
  public ResponseEntity<Object> handleCustomCProductException(CustomCategoryException customCategoryException) {
    return ResponseEntity.status(customCategoryException.getError().getCode())
      .body(customCategoryException.getMessage());
  }


}
