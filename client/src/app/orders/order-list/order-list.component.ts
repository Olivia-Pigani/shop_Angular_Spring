import { Component } from '@angular/core';
import { OrderCardComponent } from "../order-card/order-card.component";

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [OrderCardComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {

}
