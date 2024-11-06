import { Component, Input, OnInit, effect, inject } from '@angular/core';
import { BasketItem } from '../basket-item';
import { BasketService } from '../basket.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basket-item',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './basket-item.component.html',
  styleUrl: './basket-item.component.css'
})
export class BasketItemComponent{
private basketService:BasketService = inject(BasketService);
@Input() basketItem!:BasketItem;
@Input() index!:number;

public removeItem():void{
this.basketService.removeToBasket(this.index)
}
}
