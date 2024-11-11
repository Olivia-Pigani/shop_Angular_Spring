import { Component, Input, OnInit, Signal, inject } from '@angular/core';
import { Order } from '../order';
import { OrderResponse } from '../order-response';
import { CustomerService } from '../../customer/customer.service';
import { AddressService } from '../../customer/address.service';
import { Customer } from '../../customer/customer';
import { Address } from '../../customer/address';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../products/product.service';
import { Observable, forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css',
})
export class OrderCardComponent {
  @Input() order!: OrderResponse;
  private customerService: CustomerService = inject(CustomerService);
  public customer: Signal<Customer | undefined> = toSignal(
    this.customerService.customerDetails$
  );
}
