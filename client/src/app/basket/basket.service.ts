import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { BasketItem } from './basket-item';
import { Product } from '../products/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private readonly MAX_ALLOWED_QUANTITY: number = 5;
  public readonly TAX: Signal<number> = signal(5);
  public basketItemList: WritableSignal<BasketItem[]> = signal([]);
  public temporaryBasketItemList: string = JSON.stringify(
    this.basketItemList()
  );
  public totalBasketItemQuantity: Signal<number> = computed(() => {
    return this.basketItemList().reduce((total: number, item) => {
      const quantity = Number(item.quantity); // because item quantity was stocked in localStorage so that is a string
      return total + quantity;
    }, 0);
  });

  subTotal: Signal<number> = computed(() =>
    this.basketItemList().reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    )
  );

  deliveryFees: Signal<number> = computed(() => (this.subTotal() > 35 ? 0 : 4));

  totalPrice: Signal<number> = computed(
    () => this.subTotal() + this.TAX() + this.deliveryFees()
  );

  constructor() {
    this.loadBasketFromLocalStorage();

    // we put temporary basket item in local storage before the customer make the checkout
    effect(() => {
      const jsonBasketItemList = JSON.stringify(this.basketItemList());
      localStorage.setItem('basketItemList', jsonBasketItemList);
    });
  }

  public addToBasket(product: Product, quantity: number): void {
    // if the product is already in the basket, just increase the quantity

    const existingProduct = this.basketItemList().find(
      (productInBasket) => productInBasket.product.id === product.id
    );

    if (existingProduct) {
      this.basketItemList.update((items) =>
        items.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: this.quantityManager(item.quantity, quantity),
              }
            : item
        )
      );
    } else {
      this.basketItemList.update((items) => [...items, { product, quantity }]);
    }
  }

  public removeToBasket(itemIndex: number) {
    this.basketItemList.update((items) =>
      items.filter((_, index) => index !== itemIndex)
    );
  }

  public updateItemQuantity(basketItem: BasketItem, quantity: number): void {
    this.basketItemList.update((items) =>
      items.map((item) =>
        item.product.id === basketItem.product.id ? { ...item, quantity } : item
      )
    );
  }

  private loadBasketFromLocalStorage(): void {
    const storedBasket = localStorage.getItem('basketItemList');
    if (storedBasket) {
      this.basketItemList.set(JSON.parse(storedBasket));
    }
  }

  private quantityManager(
    actualQuantity: number,
    quantityToAdd: number
  ): number {
    return actualQuantity + quantityToAdd >= this.MAX_ALLOWED_QUANTITY
      ? this.MAX_ALLOWED_QUANTITY
      : actualQuantity + quantityToAdd;
  }
}
