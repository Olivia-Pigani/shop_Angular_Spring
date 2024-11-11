import { Component, Input, Signal, computed, inject } from '@angular/core';
import { BasketItem } from '../basket-item';
import { BasketService } from '../basket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-basket-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './basket-item.component.html',
  styleUrl: './basket-item.component.css',
})
export class BasketItemComponent {
  private basketService: BasketService = inject(BasketService);
  @Input() basketItem!: BasketItem;
  @Input() index!: number;

  totalItemPrice: Signal<number> = computed(
    () => this.basketItem.product.price * this.basketItem.quantity
  );

  public onQuantitySelected(quantity: number): void {
    this.basketService.updateItemQuantity(this.basketItem, quantity);
  }

  public removeItem(): void {
    this.basketService.removeToBasket(this.index);
  }
}
