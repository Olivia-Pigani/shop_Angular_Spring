import { Component, Signal, WritableSignal, inject, signal } from '@angular/core';
import { OrderCardComponent } from "../order-card/order-card.component";
import { CommonModule } from '@angular/common';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { OrderResponse } from '../order-response';
import { Customer } from '../../customer/customer';
import { CustomerService } from '../../customer/customer.service';
import { AddressService } from '../../customer/address.service';
import {toSignal} from '@angular/core/rxjs-interop';
import { Address } from '../../customer/address';
import { ProductService } from '../../products/product.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [OrderCardComponent, CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
private orderService:OrderService = inject(OrderService);
public orderList: Signal<OrderResponse[]> = this.orderService.orderList.asReadonly();

}
