import { Component, Input } from '@angular/core';
import { Order } from '../order';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css'
})
export class OrderCardComponent {
@Input() order!: Order;
}
