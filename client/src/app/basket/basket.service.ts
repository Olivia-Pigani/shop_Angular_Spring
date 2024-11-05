import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { BasketItem } from './basket-item';
import { Product } from '../products/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
public basketItemList: WritableSignal<BasketItem[]> = signal([]);

public addToBasket(product:Product, quantity:number):void{
  this.basketItemList.update(items=>[...items, {product,quantity}])
}
}
