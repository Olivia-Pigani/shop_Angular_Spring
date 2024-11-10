import { Component, WritableSignal, inject, signal } from '@angular/core';
import { OrderCardComponent } from "../order-card/order-card.component";
import { CommonModule } from '@angular/common';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [OrderCardComponent, CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
private orderService:OrderService = inject(OrderService);
public orderList: WritableSignal<Order[]> = this.orderService.orderList;


}
