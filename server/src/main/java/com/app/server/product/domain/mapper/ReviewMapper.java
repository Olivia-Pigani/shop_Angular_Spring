package com.app.server.product.domain.mapper;

import com.app.server.product.domain.dto.ProductResponseDto;
import com.app.server.product.domain.dto.ReviewResponseDto;
import com.app.server.product.domain.entity.Product;
import com.app.server.product.domain.entity.Review;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewMapper {

  public static ReviewResponseDto toReviewResponseDto(Review review) {
    return new ReviewResponseDto(
      review.getId(),
      review.getTitle(),
      review.getDescription(),
      review.getRating()
    );
  }

  public static List<ReviewResponseDto> toReviewResponseDtoList(List<Review> reviewList) {
    return reviewList.stream()
      .map(ReviewMapper::toReviewResponseDto)
      .toList();
  }
}
