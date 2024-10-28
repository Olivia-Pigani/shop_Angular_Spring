import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError, catchError} from 'rxjs';
import { Product } from './product';
import { HttpErrorService } from '../utils/http-error.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl: string = 'http://localhost:8586/api/v1/products'
  private httpErrorService:HttpErrorService = inject(HttpErrorService);
  private http: HttpClient = inject(HttpClient)

  public getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.productsUrl)
    .pipe(
      catchError(err => 
        this.handleError(err)
      ));
  };

  public getProductById(productId: number):Observable<Product>{
    return this.http.get<Product>(`${this.productsUrl}/${productId}`)
    .pipe(
      catchError(err=>this.handleError(err))
    )
    ;
  }

  private handleError(err: HttpErrorResponse):Observable<never>{
  const formattedMsg = this.httpErrorService.formatError(err);
  return throwError(()=>formattedMsg); 
  // throw formattedMsg
  }
}
