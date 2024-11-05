import { Component } from '@angular/core';
import { BasketItemComponent } from "../basket-item/basket-item.component";

@Component({
  selector: 'app-basket-list',
  standalone: true,
  imports: [BasketItemComponent],
  templateUrl: './basket-list.component.html',
  styleUrl: './basket-list.component.css'
})
export class BasketListComponent {

}
