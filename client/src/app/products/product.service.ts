import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl: string = 'http://localhost:8586/api/v1/products'


  private http: HttpClient = inject(HttpClient)

  public getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.productsUrl);
  }

  public getProductById(productId: number):Observable<Product>{
    return this.http.get<Product>(`${this.productsUrl}/${productId}`);
  }

}
