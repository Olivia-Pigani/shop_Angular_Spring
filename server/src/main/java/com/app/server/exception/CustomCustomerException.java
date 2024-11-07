package com.app.server.exception;

import lombok.Getter;

@Getter
public class CustomCustomerException extends Exception{

  @Getter
  public enum CustomerError{
    CUSTOMER_NOT_FOUND("the customer was not found", 404),
    CUSTOMER_ALREADY_EXISTS("the customer is already in the database", 409);

    private final String message;
    private final int code;

    CustomerError(String message, int code) {
      this.message = message;
      this.code = code;
    }
  }

  private CustomerError error;
  private String message;

  public CustomCustomerException( CustomerError error, String message){
    this.error = error;
    this.message = message;
  }
}
