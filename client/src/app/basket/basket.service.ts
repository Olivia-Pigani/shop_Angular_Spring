import { Injectable, OnInit, WritableSignal, effect, inject, signal } from '@angular/core';
import { BasketItem } from './basket-item';
import { Product } from '../products/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService{
public basketItemList: WritableSignal<BasketItem[]> = signal([]);
public temporaryBasketItemList:string = JSON.stringify(this.basketItemList())

constructor(){

this.loadBasketFromLocalStorage()

// we put temporary basket item in local storage before the customer make the checkout
effect(()=>{
  const jsonBasketItemList = JSON.stringify(this.basketItemList());
  localStorage.setItem("basketItemList", jsonBasketItemList);
});
}

public addToBasket(product:Product, quantity:number):void{
  this.basketItemList.update(items=>[...items, {product,quantity}]);
}

private loadBasketFromLocalStorage(): void {
  const storedBasket = localStorage.getItem("basketItemList");
  if (storedBasket) {
      this.basketItemList.set(JSON.parse(storedBasket));
  }
}
}
