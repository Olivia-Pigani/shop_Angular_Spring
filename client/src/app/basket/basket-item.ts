import { Product } from '../products/product';

export interface BasketItem {
  product: Product;
  quantity: number;
}
