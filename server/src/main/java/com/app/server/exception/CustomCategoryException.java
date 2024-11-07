package com.app.server.exception;

import lombok.Getter;

@Getter
public class CustomCategoryException extends Exception {

  @Getter
  public enum CategoryError {
    CATEGORY_NOT_FOUND("the category was not found", 404);

    private final String message;
    private final int code;

    CategoryError(String message, int code) {
      this.message = message;
      this.code = code;
    }
  }

  private CategoryError error;
  private String message;

  public CustomCategoryException(CategoryError error, String message) {
    this.error = error;
    this.message = message;
  }

}
