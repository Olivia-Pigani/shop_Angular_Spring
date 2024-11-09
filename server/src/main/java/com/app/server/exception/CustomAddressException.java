package com.app.server.exception;

import lombok.Getter;

@Getter
public class CustomAddressException extends Exception{

  @Getter
  public enum AddressError {
    ADDRESS_NOT_FOUND("the address was not found", 404);

    private final String message;
    private final int code;

    AddressError(String message, int code) {
      this.message = message;
      this.code = code;
    }
  }

  private AddressError error;
  private String message;

  public CustomAddressException(AddressError error, String message) {
    this.error = error;
    this.message = message;
  }
}
