import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError, catchError, map, mergeMap, tap, shareReplay} from 'rxjs';
import { Product } from './product';
import { HttpErrorService } from '../utils/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl: string = 'http://localhost:8586/api/v1/products'
  private httpErrorService:HttpErrorService = inject(HttpErrorService);
  private http: HttpClient = inject(HttpClient);
  private reviewService: ReviewService = inject(ReviewService);


  readonly allProducts$: Observable<Product[]> = this.http.get<Product[]>(this.productsUrl)
  .pipe(
    tap(product=>console.log(JSON.stringify(product))),
    catchError(err => 
      this.handleError(err)
    ));
  
  public getProductById(productId: number):Observable<Product>{
    return this.http.get<Product>(`${this.productsUrl}/${productId}`)
    .pipe(
      mergeMap(product=>this.getProductReviews(product)), // mergeMap allow to flat the result
      catchError(err=>this.handleError(err))
    )
    ;
  }

  private getProductReviews(product: Product):Observable<Product>{
    return this.http.get<Review[]>(`${this.productsUrl}/${product.id}/reviews`)
    .pipe(
      map(reviews => ({...product,reviews} as Product))
    ) 
  }

  private handleError(err: HttpErrorResponse):Observable<never>{
  const formattedMsg = this.httpErrorService.formatError(err);
  return throwError(()=>formattedMsg); 
  // throw formattedMsg
  }
}
