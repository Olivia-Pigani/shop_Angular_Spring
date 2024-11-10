import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { EffectRef, Injectable, WritableSignal, effect, inject, signal } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpErrorService } from '../utils/http-error.service';
import { Order } from './order';
import { BasketItem } from '../basket/basket-item';
import { Orderline } from './orderline';
import { BasketService } from '../basket/basket.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http: HttpClient = inject(HttpClient);
  private httpErrorService: HttpErrorService = inject(HttpErrorService);
  private basketService: BasketService = inject(BasketService);
  private ordersUrl: string = 'http://localhost:8586/api/v1/orders';
  public orderList: WritableSignal<Order[]> = signal([]);
  public basketItemList:WritableSignal<BasketItem[]> = this.basketService.basketItemList;

  constructor(){
    this.allCustomerOrders$.subscribe(
      (data)=>{
        this.orderList.set(data);
      }
    )
  }

  customerOrderListEffect: EffectRef = effect(()=>{
    console.log(this.orderList())
  })

  public readonly allCustomerOrders$ = this.http.get<Order[]>(this.ordersUrl, {headers:this.header})
  .pipe(
    catchError(err => 
      this.handleError(err)
    ));

  public makeAnOrder(basketItemList: BasketItem[]): void{
    const order: Order = this.prepareOrder(basketItemList);

    this.http
      .post<Order>(this.ordersUrl, order, { headers: this.header })
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((order) => {
          console.log('tap order :' + JSON.stringify(order))
          console.log(this.ordersUrl)
          console.log(this.header)
        })
      )
      .subscribe((data) =>
       this.orderList.update((items) =>
        [...items, data])
        );

        //we reset the amount of items in basket when the order is a success 
        this.basketItemList.set([]);
  }

  public prepareOrder(basketItemList: BasketItem[]) {
    const totalAmount: number = this.basketService.totalPrice();

    const orderLineList: Orderline[] = basketItemList.map((item) => ({
      productId: Number(item.product.id),
      quantity: Number(item.quantity),
    }));
    const newOrder: Order = {
      totalAmount: totalAmount,
      orderLineRequestDtoList : orderLineList,
    };
    console.log("neworder : ", newOrder)
    return newOrder;
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const formattedMsg = this.httpErrorService.formatError(err);
    return throwError(() => formattedMsg);
  }


  private get header(): HttpHeaders{
    const token:string | null= localStorage.getItem("token"); 
    return new HttpHeaders({
     'Authorization': 'Bearer '+ token
    })
   }
}
