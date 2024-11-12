import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError, catchError, map, mergeMap } from 'rxjs';
import { Product } from './product';
import { HttpErrorService } from '../utils/http-error.service';
import { Review } from '../reviews/review';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl: string = 'http://localhost:8482/api/v1/products';
  private httpErrorService: HttpErrorService = inject(HttpErrorService);
  private http: HttpClient = inject(HttpClient);

  readonly allProducts$: Observable<Product[]> = this.http
    .get<Product[]>(this.productsUrl)
    .pipe(catchError((err) => this.handleError(err)));

  public getProductByCategoryName(categoryName: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.productsUrl}/categories/${categoryName}`
    );
  }

  public getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${productId}`).pipe(
      mergeMap((product) => this.getProductReviews(product)), // mergeMap allow to flat the result
      catchError((err) => this.handleError(err))
    );
  }

  private getProductReviews(product: Product): Observable<Product> {
    return this.http
      .get<Review[]>(`${this.productsUrl}/${product.id}/reviews`)
      .pipe(map((reviews) => ({ ...product, reviews } as Product)));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const formattedMsg = this.httpErrorService.formatError(err);
    return throwError(() => formattedMsg);
    // throw formattedMsg
  }
}
