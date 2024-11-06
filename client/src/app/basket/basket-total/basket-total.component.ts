import { Component, Signal, inject } from '@angular/core';
import { BasketService } from '../basket.service';
import { CommonModule } from '@angular/common';
import { BasketItem } from '../basket-item';

@Component({
  selector: 'app-basket-total',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basket-total.component.html',
  styleUrl: './basket-total.component.css'
})
export class BasketTotalComponent {
private basketService: BasketService = inject(BasketService);
public basketItemList:Signal<BasketItem[]> = this.basketService.basketItemList.asReadonly();
public subTotal:Signal<number> = this.basketService.subTotal;
public tax:Signal<number> = this.basketService.TAX;
public deliveryFees:Signal<number> = this.basketService.deliveryFees;
public totalPrice:Signal<number> = this.basketService.totalPrice;
}
