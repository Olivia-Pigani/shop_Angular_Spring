import { Component, Input, inject } from '@angular/core';
import { BasketItem } from '../basket-item';
import { BasketService } from '../basket.service';

@Component({
  selector: 'app-basket-item',
  standalone: true,
  imports: [],
  templateUrl: './basket-item.component.html',
  styleUrl: './basket-item.component.css'
})
export class BasketItemComponent {
private basketService:BasketService = inject(BasketService);
@Input() basketItem!:BasketItem;
@Input() index!:number;

public removeItem():void{
  console.log(this.index)
this.basketService.removeToBasket(this.index)
}
}
