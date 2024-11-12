import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private reviewsUrl: string = 'http://localhost:8482/api/v1/reviews';

  getProductReviewsUrl(productId: number): string {
    return this.reviewsUrl + '?productId=^' + productId + '$';
  }
}
