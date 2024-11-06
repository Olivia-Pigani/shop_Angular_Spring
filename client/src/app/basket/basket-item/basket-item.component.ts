import { Component, Input, effect, inject } from '@angular/core';
import { BasketItem } from '../basket-item';
import { BasketService } from '../basket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basket-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basket-item.component.html',
  styleUrl: './basket-item.component.css'
})
export class BasketItemComponent {
private basketService:BasketService = inject(BasketService);
@Input() basketItem!:BasketItem;
@Input() index!:number;

public removeItem():void{
this.basketService.removeToBasket(this.index)
}
}
