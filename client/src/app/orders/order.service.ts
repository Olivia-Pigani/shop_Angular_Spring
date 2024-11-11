import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  EffectRef,
  Injectable,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpErrorService } from '../utils/http-error.service';
import { Order } from './order';
import { BasketItem } from '../basket/basket-item';
import { Orderline } from './orderline';
import { BasketService } from '../basket/basket.service';
import { OrderResponse } from './order-response';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http: HttpClient = inject(HttpClient);
  private httpErrorService: HttpErrorService = inject(HttpErrorService);
  private basketService: BasketService = inject(BasketService);
  private ordersUrl: string = 'http://localhost:8586/api/v1/orders';
  public orderList: WritableSignal<OrderResponse[]> = signal([]);
  public basketItemList: WritableSignal<BasketItem[]> =
    this.basketService.basketItemList;

  constructor() {
    this.allCustomerOrders$.subscribe((data) => {
      this.orderList.set(data);
    });
  }

  customerOrderListEffect: EffectRef = effect(() => {
    console.log(this.orderList());
  });

  public readonly allCustomerOrders$ = this.http
    .get<OrderResponse[]>(this.ordersUrl, { headers: this.header })
    .pipe(catchError((err) => this.handleError(err)));

  public makeAnOrder(
    basketItemList: BasketItem[],
    tax: number,
    deliveryPrice: number
  ): void {
    const order: Order = this.prepareOrder(basketItemList, tax, deliveryPrice);

    this.http
      .post<OrderResponse>(this.ordersUrl, order, { headers: this.header })
      .pipe(catchError((err) => this.handleError(err)))
      .subscribe((data) => this.orderList.update((items) => [...items, data]));

    //we reset the amount of items in basket when the order is a success
    this.basketItemList.set([]);
  }

  public prepareOrder(
    basketItemList: BasketItem[],
    tax: number,
    deliveryPrice: number
  ) {
    const totalAmount: number = this.basketService.totalPrice();

    const orderLineList: Orderline[] = basketItemList.map((item) => ({
      productId: Number(item.product.id),
      quantity: Number(item.quantity),
    }));
    const newOrder: Order = {
      totalAmount: totalAmount,
      tax: tax,
      deliveryPrice: deliveryPrice,
      orderLineRequestDtoList: orderLineList,
    };
    console.log('neworder : ', newOrder);
    return newOrder;
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const formattedMsg = this.httpErrorService.formatError(err);
    return throwError(() => formattedMsg);
  }

  private get header(): HttpHeaders {
    const token: string | null = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
  }
}
