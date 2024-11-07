package com.app.server.exception;

import lombok.Getter;

@Getter
public class CustomProductException extends Exception {

  @Getter
  public enum ProductError {
    PRODUCT_NOT_FOUND("the product was not found", 404);

    private final String message;
    private final int code;

    ProductError(String message, int code) {
      this.message = message;
      this.code = code;
    }
  }

  private ProductError error;
  private String message;

  public CustomProductException(ProductError error, String message) {
    this.error = error;
    this.message = message;
  }

}
