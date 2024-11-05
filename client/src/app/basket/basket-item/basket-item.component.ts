import { Component, Input } from '@angular/core';
import { BasketItem } from '../basket-item';

@Component({
  selector: 'app-basket-item',
  standalone: true,
  imports: [],
  templateUrl: './basket-item.component.html',
  styleUrl: './basket-item.component.css'
})
export class BasketItemComponent {
@Input() basketItem!:BasketItem;
}
