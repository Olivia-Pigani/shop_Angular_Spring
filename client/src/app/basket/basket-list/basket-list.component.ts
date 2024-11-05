import { Component, WritableSignal, effect, inject } from '@angular/core';
import { BasketItemComponent } from "../basket-item/basket-item.component";
import { BasketItem } from '../basket-item';
import { BasketService } from '../basket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basket-list',
  standalone: true,
  imports: [BasketItemComponent, CommonModule],
  templateUrl: './basket-list.component.html',
  styleUrl: './basket-list.component.css'
})
export class BasketListComponent {
private basketService: BasketService = inject(BasketService);  
public pageTitle:string = 'My basket';  
public basketItemList:WritableSignal<BasketItem[]> = this.basketService.basketItemList;

private insideBasket = effect(()=>console.log(this.basketItemList()));

}
